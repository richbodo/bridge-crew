import type { TemplateKey } from "./templates";

/** Single source of truth for the users guide: the markdown file on GitHub. */
export const USERS_GUIDE_URL =
  "https://github.com/richbodo/bridge-crew/blob/main/docs/users_guide.md";

/** Each kind of room's part of the guide, which its Guide link opens at. */
export const GUIDE_PART: Record<TemplateKey, string> = {
  "game-studio": "#part-1-the-game-studio",
  deliberation: "#part-2-deliberation-rooms",
};
