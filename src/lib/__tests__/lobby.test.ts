import { describe, expect, it } from "vitest";

import { freshLines } from "../fresh";
import { defaultTitle, withRole } from "../lobby";

describe("the lobby's defaults", () => {
  it("names a room for the minute it opened, in the computer's own time", () => {
    expect(defaultTitle(new Date(2026, 10, 19, 9, 5))).toBe("Session 2026-11-19 09:05");
    expect(defaultTitle(new Date(2026, 0, 2, 23, 59))).toBe("Session 2026-01-02 23:59");
  });

  it("says a name's role, unless the name is the role", () => {
    expect(withRole("Pat", "teacher")).toBe("Pat (teacher)");
    expect(withRole("Teacher", "teacher")).toBe("Teacher");
    expect(withRole("student", "student")).toBe("student");
    expect(withRole("Student", "teacher")).toBe("Student (teacher)");
  });
});

describe("what's new in a document", () => {
  it("finds added lines, wherever they are, and not blank ones", () => {
    const before = "# Mole Quest\n\n## Story\nA mole digs for gems.";
    const after =
      "# Mole Quest\n\n## Story\nA mole digs for gems.\nThe gems power the lamp.\n\n## Art\n- A mole";
    expect([...freshLines(before, after)]).toEqual([5, 7, 8]);
  });

  it("doesn't count a line that moved, and counts a line that appears once more", () => {
    expect([...freshLines("- a\n- b", "- b\n- a")]).toEqual([]);
    expect([...freshLines("- a", "- a\n- a")]).toEqual([2]);
  });

  it("counts a changed line as new", () => {
    expect([...freshLines("Speed: 3", "Speed: 5")]).toEqual([1]);
    expect([...freshLines("", "One line.")]).toEqual([1]);
  });
});
