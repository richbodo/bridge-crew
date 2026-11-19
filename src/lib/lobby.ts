/**
 * The lobby's defaults, so a Game Studio room opens with one click: the teacher is "Teacher",
 * the student "Student", and the room is named for when it opened. Each can be changed.
 */

export const TEACHER = "Teacher";
export const STUDENT = "Student";

const two = (n: number) => String(n).padStart(2, "0");

/** "Session 2026-11-19 14:32", in the computer's own time: one a minute is unique enough. */
export function defaultTitle(now: Date): string {
  const day = `${now.getFullYear()}-${two(now.getMonth() + 1)}-${two(now.getDate())}`;
  return `Session ${day} ${two(now.getHours())}:${two(now.getMinutes())}`;
}

/** "Pat (teacher)", or just "Teacher" when the name is the role. */
export function withRole(name: string, role: "teacher" | "student"): string {
  return name.trim().toLowerCase() === role ? name : `${name} (${role})`;
}
