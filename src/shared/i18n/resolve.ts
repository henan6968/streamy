// Which language a `language` setting value means. Kept apart from the
// dictionaries so the preload script (which has no room for them) can use it.

import type { Locale } from "./types";

/**
 * The language for a `language` setting value. "system" follows the
 * computer's own language (as the OS reports it, e.g. "zh-CN"), and anything
 * that isn't a language Streamy speaks becomes English.
 */
export function resolveLocale(
  language: string,
  systemLocale: string | null | undefined,
): Locale {
  if (language === "en" || language === "zh-CN") return language;
  return systemLocale?.toLowerCase().startsWith("zh") ? "zh-CN" : "en";
}
