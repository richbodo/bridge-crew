import { useMemo, type CSSProperties } from "react";

import {
  COMMON,
  SIZE,
  SPRITES,
  frameOf,
  pathsOf,
  poseOf,
  type AvatarKey,
  type Pose,
} from "@/lib/avatars";
import type { AgentStatus } from "@/lib/crew";
import { cn } from "@/lib/utils";

/** How long a pose takes to show both its frames. */
const BEAT: Record<Pose, string> = {
  idle: "0s",
  working: "0.9s",
  hailing: "1.2s",
  speaking: "0.5s",
};

interface Props {
  avatar: AvatarKey;
  /** The station's colour: the uniform, and a tint behind the portrait. */
  accent: string;
  status: AgentStatus;
  className?: string;
}

/**
 * A crew member's pixel portrait, in the pose for its state (src/lib/avatars.ts). The card says
 * the state in words, so screen readers skip the picture. With reduced motion, a pose holds its
 * first frame.
 */
export function CrewAvatar({ avatar, accent, status, className }: Props) {
  const pose = poseOf(status);
  const frames = useMemo(() => {
    const sprite = SPRITES[avatar];
    const shown = pose === "idle" ? [0 as const] : [0 as const, 1 as const];
    return shown.map((frame) => pathsOf(frameOf(sprite, pose, frame)));
  }, [avatar, pose]);
  const colors: Record<string, string> = {
    ...COMMON,
    ...SPRITES[avatar].colors,
    u: accent,
    U: `color-mix(in oklab, ${accent} 72%, black)`,
  };

  return (
    <span
      aria-hidden
      data-avatar={avatar}
      data-pose={pose}
      className={cn("inline-block size-8 shrink-0 overflow-hidden rounded-[4px]", className)}
      style={
        {
          backgroundColor: `color-mix(in oklab, ${accent} 20%, oklch(0.32 0.02 255))`,
          "--avatar-beat": BEAT[pose],
        } as CSSProperties
      }
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full" shapeRendering="crispEdges">
        {frames.map((paths, i) => (
          <g key={i} className={frames.length > 1 ? `crew-avatar-${i ? "b" : "a"}` : undefined}>
            {paths.map(({ letter, d }) => (
              <path key={letter} d={d} style={{ fill: colors[letter] }} />
            ))}
          </g>
        ))}
      </svg>
    </span>
  );
}
