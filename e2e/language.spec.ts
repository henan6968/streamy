import { readFileSync } from "node:fs";
import type { ApiError } from "../src/shared/engine-api";
import { expect, test } from "./fixtures";
import type { StreamyApp } from "./support/app";

// The language setting (Settings → General): the whole app speaks it at once,
// it survives a restart, and the engine answers in it too. The test starts in
// whatever language the computer has ("System" is the default), so it finds
// things by the names that language uses.

/** settings.json's language, as main saved it. */
function savedLanguage(app: StreamyApp): unknown {
  try {
    const settings: unknown = JSON.parse(
      readFileSync(app.workspace.settingsFile, "utf8"),
    );
    return (settings as { language?: unknown }).language;
  } catch {
    return undefined; // Not written yet.
  }
}

/** Whether some of `text` is written in Chinese (any CJK character). */
const CJK = /[\u4e00-\u9fff]/;

test("switches the whole interface to Chinese, and keeps it", async ({
  launch,
}) => {
  const app = await launch();
  const page = app.page;

  // The names to look for, in the language the app opened in.
  const chinese = await page.evaluate(() =>
    document.documentElement.lang.startsWith("zh"),
  );
  const settings = chinese ? "设置" : "Settings";
  const general = chinese ? "常规" : "General";

  await page
    .getByRole("banner")
    .getByRole("button", { name: settings, exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog
    .getByRole("navigation")
    .getByRole("button", { name: general, exact: true })
    .click();

  // Each language is named in itself, so this works from either one.
  await dialog.getByRole("radio", { name: "English" }).click();
  await expect(
    dialog.getByRole("heading", { name: "Settings", exact: true }),
  ).toBeVisible();
  await expect(dialog.getByText("Language", { exact: true })).toBeVisible();
  await expect.poll(() => savedLanguage(app)).toBe("en");

  // The engine follows the UI's language.
  const english = await app.api<ApiError>("/v1/torrents", { method: "POST" });
  expect(english.status).toBe(400);
  expect(english.body.error.message).not.toMatch(CJK);

  // Settings → General → 简体中文: the dialog turns Chinese without a reload.
  await dialog.getByRole("radio", { name: "简体中文" }).click();
  await expect(
    dialog.getByRole("heading", { name: "设置", exact: true }),
  ).toBeVisible();
  await expect(dialog.getByText("语言", { exact: true })).toBeVisible();
  await expect(
    dialog.getByRole("switch", { name: "登录时启动" }),
  ).toBeVisible();
  await expect.poll(() => savedLanguage(app)).toBe("zh-CN");

  // The engine too, this time in Chinese.
  const chineseAnswer = await app.api<ApiError>("/v1/torrents", {
    method: "POST",
  });
  expect(chineseAnswer.status).toBe(400);
  expect(chineseAnswer.body.error.message).toMatch(CJK);

  // And so does the rest of the window.
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("banner").getByRole("button", { name: "设置", exact: true }),
  ).toBeVisible();

  // A new launch opens in Chinese from the start (main tells the window
  // which language to paint in).
  await app.close();
  const relaunched = await launch();
  await expect(
    relaunched.page
      .getByRole("banner")
      .getByRole("button", { name: "设置", exact: true }),
  ).toBeVisible();
  await expect(
    relaunched.page.getByRole("button", { name: "Settings", exact: true }),
  ).toHaveCount(0);
});
