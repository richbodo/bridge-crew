import { expect, test } from "@playwright/test";

import { openRoom, stationCard } from "./helpers";

const REPO_PACKS = [
  "bridge-crew-protocol",
  "kereru-ferry-coop",
  "nz-politics",
  "social-epidemiology",
];

// Users guide §8 — context packs.
test.describe("context packs", () => {
  test("the Context panel lists every repo pack with a doc count", async ({ page }) => {
    await openRoom(page, { title: `E2E packs ${Date.now()}` });
    await page.getByRole("button", { name: "Context" }).click();
    for (const pack of REPO_PACKS) {
      await expect(page.getByText(pack, { exact: true })).toBeVisible();
    }
    await expect(page.getByText(/\d+ docs?/).first()).toBeVisible();
  });

  test("a session pack can be created and shows up as attachable", async ({ page }) => {
    await openRoom(page, { title: `E2E session pack ${Date.now()}` });
    await page.getByRole("button", { name: "Context" }).click();

    const packName = `ferry-notes-${Date.now()}`;
    await page.getByPlaceholder("pack-name").fill(packName);
    await page.getByRole("button", { name: "Create", exact: true }).click();
    await expect(page.getByText("Pack created.")).toBeVisible();
    await expect(page.getByText(packName, { exact: true }).first()).toBeVisible();

    // Close the panel and confirm the pack is offered in a station's Reassign form.
    await page.getByRole("button", { name: "Context" }).click();
    const card = stationCard(page, "Scout");
    await card.getByRole("button", { name: "Reassign" }).click();
    await expect(card.getByRole("button", { name: new RegExp(packName) })).toBeVisible();
  });

  test("attaching a pack to a station shows a chip that survives reload", async ({ page }) => {
    await openRoom(page, { title: `E2E attach pack ${Date.now()}` });
    const card = stationCard(page, "Scout");
    await card.getByRole("button", { name: "Reassign" }).click();
    await card.getByRole("button", { name: /kereru-ferry-coop/ }).click();
    await card.getByRole("button", { name: "Save station" }).click();
    await expect(page.getByText("Station updated.")).toBeVisible();

    await expect(stationCard(page, "Scout").getByTitle("Required reading before every run")).toHaveText(
      "kereru-ferry-coop",
    );

    await page.reload();
    await expect(stationCard(page, "Scout").getByText("kereru-ferry-coop")).toBeVisible();
  });

  test("Reset to default clears attached packs", async ({ page }) => {
    await openRoom(page, { title: `E2E clear packs ${Date.now()}` });
    const card = stationCard(page, "Analyst");
    await card.getByRole("button", { name: "Reassign" }).click();
    await card.getByRole("button", { name: /nz-politics/ }).click();
    await card.getByRole("button", { name: "Save station" }).click();
    await expect(stationCard(page, "Analyst").getByText("nz-politics")).toBeVisible();

    const again = stationCard(page, "Analyst");
    await again.getByRole("button", { name: "Reassign" }).click();
    await again.getByRole("button", { name: "Reset to default" }).click();
    await again.getByRole("button", { name: "Save station" }).click();
    await expect(stationCard(page, "Analyst").getByText("nz-politics")).toHaveCount(0);
  });
});
