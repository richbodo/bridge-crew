import type { AgentKind, AgentStatus } from "./crew";

export interface FloorState {
  /** the agent currently holding the floor, if any. Humans always hold it otherwise. */
  speaking: AgentKind | null;
  statuses: Partial<Record<AgentKind, AgentStatus>>;
}

export type FloorAction =
  | { type: "summon"; agent: AgentKind }
  | { type: "progress"; agent: AgentKind }
  | { type: "raise"; agent: AgentKind }
  | { type: "grant"; agent: AgentKind }
  | { type: "finish"; agent: AgentKind }
  | { type: "dismiss"; agent: AgentKind }
  | { type: "stop"; agent: AgentKind }
  | { type: "human_speaks" };

export const emptyFloor: FloorState = { speaking: null, statuses: {} };

const ALLOWED: Record<AgentStatus, AgentStatus[]> = {
  idle: ["working", "stopped"],
  working: ["hand_raised", "idle", "stopped"],
  hand_raised: ["speaking", "idle", "stopped"],
  speaking: ["idle", "stopped"],
  stopped: ["working", "idle"],
};

export function canTransition(from: AgentStatus, to: AgentStatus): boolean {
  if (from === to) return true;
  return ALLOWED[from].includes(to);
}

function statusOf(state: FloorState, agent: AgentKind): AgentStatus {
  return state.statuses[agent] ?? "idle";
}

function set(state: FloorState, agent: AgentKind, to: AgentStatus): FloorState {
  if (!canTransition(statusOf(state, agent), to)) return state;
  const statuses = { ...state.statuses, [agent]: to };
  const speaking = to === "speaking" ? agent : state.speaking === agent ? null : state.speaking;
  return { speaking, statuses };
}

/**
 * The floor rules, as a pure reducer:
 *  - an agent only moves idle -> working -> hand_raised -> speaking -> idle
 *  - only one agent may speak at a time; a grant while someone speaks is refused
 *  - a human speaking always preempts: any speaking agent yields immediately
 */
export function floorReducer(state: FloorState, action: FloorAction): FloorState {
  switch (action.type) {
    case "summon":
      return set(state, action.agent, "working");
    case "progress":
      return statusOf(state, action.agent) === "working" ? state : state;
    case "raise":
      return set(state, action.agent, "hand_raised");
    case "grant": {
      if (statusOf(state, action.agent) !== "hand_raised") return state;
      if (state.speaking && state.speaking !== action.agent) return state;
      return set(state, action.agent, "speaking");
    }
    case "finish":
      return set(state, action.agent, "idle");
    case "dismiss":
      return set(state, action.agent, "idle");
    case "stop":
      return set(state, action.agent, "stopped");
    case "human_speaks": {
      if (!state.speaking) return state;
      return set(state, state.speaking, "idle");
    }
    default:
      return state;
  }
}
