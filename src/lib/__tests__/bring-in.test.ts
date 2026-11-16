import { describe, expect, it } from "vitest";

import { bringIn } from "../bring-in";
import { THREE_VERSION } from "../shelf";

describe("bringIn", () => {
  it("takes off the folder's own name, and leaves out what isn't part of a game", () => {
    const game = bringIn({
      "rocket-lab/index.html": '<script src="js/a.js"></script>',
      "rocket-lab/js/a.js": "go();",
      "rocket-lab/.git/config": "[core]",
      "rocket-lab/README.md": "# Rocket lab",
      "rocket-lab/trailer.mp4": "data:video/mp4;base64,AAAA",
    });
    expect(Object.keys(game.files).sort()).toEqual(["README.md", "index.html", "js/a.js"]);
    expect(game.title).toBe("rocket lab");
    expect(game.notes).toContain("Left out: trailer.mp4.");
    expect(game.needsBigger).toBe(true);
  });

  it("takes a one-file game as it is, with its page as index.html, and keeps it Simple", () => {
    const game = bringIn({ "neon-tempo.html": "<canvas></canvas>", "README.md": "Drums" });
    expect(game.files["index.html"]).toBe("<canvas></canvas>");
    expect(game.title).toBe("neon tempo");
    expect(game.needsBigger).toBe(false);
  });

  it("says why when there's no page to start from", () => {
    expect(() => bringIn({ "game.js": "" })).toThrow(/no HTML page/);
    expect(() => bringIn({ "a.html": "", "b.html": "" })).toThrow(/2 HTML pages and no index.html/);
  });

  it("switches Three.js from the internet for the shelf's, and drops the add-ons the shelf has", () => {
    const game = bringIn({
      "index.html":
        '<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>\n<script src="js/scene.js"></script>',
      "js/scene.js": "new THREE.OrbitControls();",
    });
    expect(game.files["index.html"]).toBe(
      '<script src="studio/three.js"></script>\n\n<script src="js/scene.js"></script>',
    );
    expect(game.oldThree).toBe(128);
    expect(game.notes[0]).toBe(
      `It loaded Three.js r128 from the internet. It now uses the studio's Three.js r${THREE_VERSION}, which may look different.`,
    );
    // Three.js alone makes a one-file game a Bigger one.
    expect(
      bringIn({
        "index.html":
          '<script src="https://unpkg.com/three@0.180.0/build/three.module.js"></script>',
      }).needsBigger,
    ).toBe(true);
  });

  it("switches Google Fonts for the shelf's, and names the ones it doesn't have", () => {
    const game = bringIn({
      "index.html":
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Audiowide&amp;family=VT323&family=Lobster:wght@400&display=swap">',
    });
    expect(game.files["index.html"]).toBe(
      '\n<link rel="stylesheet" href="studio/fonts/audiowide.css">\n<link rel="stylesheet" href="studio/fonts/vt323.css">',
    );
    expect(game.notes).toEqual([
      "Its fonts now come from the studio: Audiowide, VT323.",
      "These fonts aren't in the studio, so the browser's own stand in: Lobster.",
    ]);
  });

  it("names anything else it asks the internet for", () => {
    const game = bringIn({
      "index.html": '<script src="https://cdn.example.com/howler.js"></script>',
    });
    expect(game.notes).toEqual([
      "It asks the internet for https://cdn.example.com/howler.js, which the studio blocks.",
    ]);
  });
});
