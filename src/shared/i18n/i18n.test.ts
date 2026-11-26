import { describe, expect, it, vi } from "vitest";
import {
  dictionaries,
  getLocale,
  LOCALES,
  resolveLocale,
  setLocale,
  t,
  translate,
} from "./index";
import * as appMessages from "./messages/app";
import * as commonMessages from "./messages/common";
import * as engineMessages from "./messages/engine";
import * as generalMessages from "./messages/general";
import * as mainMessages from "./messages/main";
import * as playerMessages from "./messages/player";
import * as settingsMessages from "./messages/settings";
import type { Entry } from "./types";

/** {name} placeholders in a message (each once), in order. */
function placeholders(entry: Entry): string[] {
  const text =
    typeof entry === "string" ? entry : `${entry.one}\n${entry.other}`;
  return [
    ...new Set([...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1] ?? "")),
  ].sort();
}

describe("the dictionaries", () => {
  const english = dictionaries.en;
  const chinese = dictionaries["zh-CN"];

  it("has the same keys in every language", () => {
    expect(Object.keys(chinese).sort()).toEqual(Object.keys(english).sort());
  });

  it("has no empty messages", () => {
    for (const locale of LOCALES) {
      for (const [key, entry] of Object.entries(dictionaries[locale])) {
        const texts =
          typeof entry === "string" ? [entry] : [entry.one, entry.other];
        for (const text of texts) {
          expect(text.trim(), `${locale} ${key}`).not.toBe("");
        }
      }
    }
  });

  it("fills the same placeholders in every language", () => {
    // A missing {count} in one language would show "{count}" to some people.
    for (const [key, entry] of Object.entries(english)) {
      expect(placeholders(chinese[key] ?? ""), key).toEqual(
        placeholders(entry),
      );
    }
  });

  it("has each key in exactly one place", () => {
    // Two files defining the same key would silently pick one of the texts.
    const files = {
      "messages/app": appMessages,
      "messages/common": commonMessages,
      "messages/engine": engineMessages,
      "messages/general": generalMessages,
      "messages/main": mainMessages,
      "messages/player": playerMessages,
      "messages/settings": settingsMessages,
    };
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const [file, messages] of Object.entries(files)) {
      for (const key of Object.keys(messages.en)) {
        const first = seen.get(key);
        if (first === undefined) seen.set(key, file);
        else duplicates.push(`${key}: ${first} and ${file}`);
      }
    }
    expect(duplicates).toEqual([]);
  });

  it("writes Chinese in Chinese characters", () => {
    // Catches a key that was copied over untranslated.
    const copied = Object.entries(chinese).filter(
      ([key, entry]) =>
        typeof entry === "string" &&
        entry === (english[key] as string) &&
        entry.length > 12,
    );
    // Same in both on purpose: names and products (e.g. "AppImage", "Streamy").
    expect(copied.map(([key]) => key)).toEqual([]);
  });
});

describe("translate", () => {
  it("writes the message in the language asked for", () => {
    expect(translate("en", "common.tryAgain")).toBe("Try again");
    expect(translate("zh-CN", "common.tryAgain")).toBe("重试");
  });

  it("fills placeholders", () => {
    expect(translate("en", "common.peers", { count: 12 })).toBe("12 peers");
    expect(translate("zh-CN", "common.peers", { count: 12 })).toBe("12 个节点");
  });

  it("picks singular and plural forms in English", () => {
    expect(translate("en", "common.peers", { count: 1 })).toBe("1 peer");
    expect(translate("en", "common.peers", { count: 0 })).toBe("0 peers");
    expect(translate("en", "common.peers", { count: 2 })).toBe("2 peers");
  });

  it("uses another language's dictionary for its own locales", () => {
    // Tests format with "en-US" or "de-DE"; the nearest dictionary is used.
    expect(translate("en-US", "common.tryAgain")).toBe("Try again");
    expect(translate("zh-TW", "common.tryAgain")).toBe("重试");
  });

  it("falls back to English for a message one language lacks", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    expect(translate("zh-CN", "not.a.message")).toBe("not.a.message");
    expect(warn).toHaveBeenCalled();
  });

  it("leaves a placeholder without a value in place", () => {
    // Shows a mistake instead of hiding it.
    expect(translate("en", "common.timeLeft.minutes")).toBe("{count} min left");
  });
});

describe("the current language (main, engine and the UI's event handlers)", () => {
  it("is English until set", () => {
    setLocale("en");
    expect(getLocale()).toBe("en");
    expect(t("common.cancel")).toBe("Cancel");
  });

  it("follows setLocale", () => {
    setLocale("zh-CN");
    expect(getLocale()).toBe("zh-CN");
    expect(t("common.cancel")).toBe("取消");
    setLocale("en");
  });
});

describe("resolveLocale", () => {
  it("uses the language the user picked", () => {
    expect(resolveLocale("en", "zh-CN")).toBe("en");
    expect(resolveLocale("zh-CN", "en-US")).toBe("zh-CN");
  });

  it("follows the system language for 'system'", () => {
    expect(resolveLocale("system", "zh-CN")).toBe("zh-CN");
    expect(resolveLocale("system", "zh-TW")).toBe("zh-CN");
    expect(resolveLocale("system", "en-GB")).toBe("en");
    expect(resolveLocale("system", "de-DE")).toBe("en");
  });

  it("is English when the system language is unknown", () => {
    expect(resolveLocale("system", undefined)).toBe("en");
    expect(resolveLocale("system", null)).toBe("en");
    expect(resolveLocale("system", "")).toBe("en");
  });
});
