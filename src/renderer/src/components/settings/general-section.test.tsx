import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GeneralSection } from "@/components/settings/general-section";
import { LocaleProvider } from "@/lib/locale-provider";
import { useSettings } from "@/lib/settings";
import { fakeStreamy } from "@/test/fake-streamy";

const { api } = fakeStreamy;

/** The section as the dialog shows it: following the settings as they change. */
function General() {
  const snapshot = useSettings();
  return snapshot ? <GeneralSection snapshot={snapshot} /> : null;
}

async function renderGeneral() {
  const user = userEvent.setup();
  render(
    <LocaleProvider>
      <General />
    </LocaleProvider>,
  );
  // The OS settings arrive a moment after the snapshot.
  await screen.findByRole("switch", { name: "Open at login" });
  return user;
}

describe("Settings → General → Language", () => {
  it("offers English and Simplified Chinese, with the current one picked", async () => {
    await renderGeneral();

    // The setting starts on "System": the UI is English (the test's computer
    // language), and that's the option shown as picked.
    expect(screen.getByRole("radio", { name: "System" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "English" })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: "简体中文" })).not.toBeChecked();
    expect(screen.getByText(/computer's language/)).toBeInTheDocument();
  });

  it("saves the choice", async () => {
    const user = await renderGeneral();

    await user.click(screen.getByRole("radio", { name: "简体中文" }));

    expect(api.settings.update).toHaveBeenCalledWith({ language: "zh-CN" });
    expect(screen.getByRole("radio", { name: "简体中文" })).toBeChecked();
  });

  it("turns the whole interface into the chosen language at once", async () => {
    const user = await renderGeneral();

    await user.click(screen.getByRole("radio", { name: "简体中文" }));

    // The section itself, the rows below it, and the page's language.
    expect(await screen.findByText("语言")).toBeInTheDocument();
    expect(
      screen.getByRole("switch", { name: "登录时启动" }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(document.documentElement.lang).toBe("zh-CN");
    });

    await user.click(screen.getByRole("radio", { name: "English" }));

    expect(await screen.findByText("Language")).toBeInTheDocument();
    await waitFor(() => {
      expect(document.documentElement.lang).toBe("en");
    });
  });

  it("follows the computer's language for 'System'", async () => {
    const user = await renderGeneral();
    // A Chinese computer, with the setting on "System".
    const previous = window.streamy.systemLocale;
    window.streamy.systemLocale = "zh-CN";
    try {
      await user.click(screen.getByRole("radio", { name: "System" }));

      expect(api.settings.update).toHaveBeenCalledWith({ language: "system" });
      expect(await screen.findByText("语言")).toBeInTheDocument();
    } finally {
      window.streamy.systemLocale = previous;
    }
  });
});
