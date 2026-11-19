import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { callModelWithTools, type CrewTool } from "../model.server";

/**
 * The crew's tool loop against a fake Anthropic API (src/lib/model.server.ts): what it sends, and
 * how it handles each turn's tool uses.
 */

const api = vi.hoisted(() => ({
  /** Each request, copied as it was sent. */
  sent: [] as Array<Record<string, unknown>>,
  /** The replies, in order. */
  replies: [] as unknown[],
}));

vi.mock("@anthropic-ai/sdk", () => {
  const reply = (params: Record<string, unknown>) => {
    api.sent.push(structuredClone(params));
    return api.replies.shift();
  };
  class APIError extends Error {}
  class Anthropic {
    static APIError = APIError;
    static AuthenticationError = class extends APIError {};
    static RateLimitError = class extends APIError {};
    static APIConnectionError = class extends APIError {};
    beta = {
      messages: {
        create: async (params: Record<string, unknown>) => reply(params),
        stream: (params: Record<string, unknown>) => ({ finalMessage: async () => reply(params) }),
      },
    };
  }
  return { default: Anthropic };
});

const usage = { input_tokens: 10, output_tokens: 5 };

function toolTurn(...uses: Array<{ id: string; name: string; input: unknown }>) {
  return {
    stop_reason: "tool_use",
    usage,
    content: [{ type: "text", text: "Working." }, ...uses.map((u) => ({ type: "tool_use", ...u }))],
  };
}

const replyTurn = {
  stop_reason: "end_turn",
  usage,
  content: [{ type: "text", text: "SPOKEN:\nDone.\n\nBRIEF:\nAll done." }],
};

const messages = [
  { role: "system" as const, content: "You are the Engineer." },
  { role: "user" as const, content: "## Your task\n\nadd wolves" },
];

/** The tool results the request after `turn` sent back. */
function resultsAfter(turn: number) {
  const sent = api.sent[turn + 1]!["messages"] as Array<{ role: string; content: unknown }>;
  return sent[sent.length - 1]!.content as Array<{
    tool_use_id: string;
    is_error?: boolean;
    content: Array<{ type: string; text?: string }>;
  }>;
}

describe("the crew's tool loop", () => {
  const used: Array<[string, unknown]> = [];
  const tool = (name: string, extra: Partial<CrewTool> = {}): CrewTool => ({
    name,
    description: `The ${name} tool.`,
    inputSchema: { type: "object", properties: {} },
    use: async (input) => {
      used.push([name, input]);
      return { parts: [{ text: `${name} worked` }] };
    },
    ...extra,
  });

  beforeEach(() => {
    vi.stubEnv("BRIDGE_CREW_MODEL_PROVIDER", "anthropic");
    api.sent.length = 0;
    api.replies.length = 0;
    used.length = 0;
  });
  afterEach(() => vi.unstubAllEnvs());

  it("declares Anthropic's text editor and our tools, with a task budget, and streams long turns", async () => {
    api.replies.push(
      toolTurn({
        id: "a",
        name: "str_replace_based_edit_tool",
        input: { command: "view", path: "/" },
      }),
      replyTurn,
    );
    const raw = await callModelWithTools(
      messages,
      {
        tools: [
          { name: "str_replace_based_edit_tool", editor: true, use: tool("editor").use },
          tool("try_game"),
        ],
        turns: 10,
        budget: 200_000,
        fixture: [],
      },
      "crew",
      { maxTokens: 32000 },
    );
    expect(raw).toContain("All done.");
    expect(used).toEqual([["editor", { command: "view", path: "/" }]]);
    const first = api.sent[0]!;
    expect(first["tools"]).toEqual([
      { type: "text_editor_20250728", name: "str_replace_based_edit_tool", max_characters: 40_000 },
      {
        name: "try_game",
        description: "The try_game tool.",
        input_schema: { type: "object", properties: {} },
        eager_input_streaming: true,
      },
    ]);
    expect(first["betas"]).toContain("task-budgets-2026-03-13");
    expect(first["output_config"]).toMatchObject({
      task_budget: { type: "tokens", total: 200_000 },
    });
    expect(first["tool_choice"]).toBeUndefined();
  });

  it("refuses a tool past its uses, and after the last turn asks for the reply", async () => {
    api.replies.push(
      toolTurn({ id: "a", name: "try_game", input: {} }),
      toolTurn({ id: "b", name: "try_game", input: {} }, { id: "c", name: "nothing", input: {} }),
      replyTurn,
    );
    await callModelWithTools(messages, {
      tools: [tool("try_game", { uses: 1 })],
      turns: 2,
      fixture: [],
    });
    expect(used).toEqual([["try_game", {}]]);
    const second = resultsAfter(1);
    expect(second[0]).toMatchObject({ tool_use_id: "b", is_error: true });
    expect(second[0]!.content[0]!.text).toContain("most uses of try_game");
    expect(second[1]!.content[0]!.text).toContain("There's no tool called nothing");
    expect(second[1]!.content.at(-1)!.text).toContain("That was your last turn of tools");
    expect(api.sent[2]!["tool_choice"]).toEqual({ type: "none" });
  });

  it("runs a cut-off turn's finished tool uses, and says the unfinished one didn't run", async () => {
    api.replies.push(
      {
        ...toolTurn(
          { id: "a", name: "str_replace_based_edit_tool", input: { command: "view", path: "/" } },
          {
            id: "b",
            name: "str_replace_based_edit_tool",
            input: { command: "create", path: "/js/w" },
          },
        ),
        stop_reason: "max_tokens",
      },
      replyTurn,
    );
    await callModelWithTools(messages, {
      tools: [{ name: "str_replace_based_edit_tool", editor: true, use: tool("editor").use }],
      turns: 10,
      fixture: [],
    });
    expect(used).toEqual([["editor", { command: "view", path: "/" }]]);
    const results = resultsAfter(0);
    expect(results[0]!.is_error).toBeUndefined();
    expect(results[1]).toMatchObject({ tool_use_id: "b", is_error: true });
    expect(results[1]!.content[0]!.text).toContain("cut off");
  });
});
