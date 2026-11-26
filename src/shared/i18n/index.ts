// The app's own text, in every language it speaks. One dictionary per
// language, one key per message; src/shared/i18n/messages/ has them, split by
// where they're used (the UI, the main process, the engine).
//
// Who uses it:
//   renderer  useT() / t() from @/lib/i18n (React re-renders on a change)
//   main      setLocale() at start and whenever Settings change, then t()
//   engine    the same; its locale comes in EngineConfig from main
//
// Adding text: use a key, never a sentence. A key has a prefix for its area
// ("settings.", "player.", "main.", "engine.", …), lowercase words after it,
// and {placeholders} in braces.

import * as app from "./messages/app";
import * as common from "./messages/common";
import * as engine from "./messages/engine";
import * as general from "./messages/general";
import * as main from "./messages/main";
import * as player from "./messages/player";
import * as settings from "./messages/settings";
import type { Dictionary, Entry, Locale, Vars } from "./types";

export {
  LOCALES,
  type Dictionary,
  type Entry,
  type Locale,
  type Plural,
  type Translate,
  type Vars,
} from "./types";
export { resolveLocale } from "./resolve";

/** Every message Streamy has, in English. */
const en = {
  ...common.en,
  ...general.en,
  ...settings.en,
  ...app.en,
  ...player.en,
  ...main.en,
  ...engine.en,
} as const;

/** Every key there is. t() only takes one of these, so typos don't compile. */
export type MessageKey = keyof typeof en;

/**
 * The same messages in Simplified Chinese. Typed as Record<MessageKey, …>: a
 * missing or misspelt key is a compile error (i18n.test.ts checks the
 * dictionaries too, e.g. that the {placeholders} match).
 */
const zhCN: Record<MessageKey, Entry> = {
  ...common.zh,
  ...general.zh,
  ...settings.zh,
  ...app.zh,
  ...player.zh,
  ...main.zh,
  ...engine.zh,
};

export const dictionaries: Readonly<Record<Locale, Dictionary>> = {
  en,
  "zh-CN": zhCN,
};

/**
 * The language for text that isn't in a React component (main, engine, toasts).
 */
let current: Locale = "en";

export function setLocale(locale: Locale): void {
  current = locale;
}

export function getLocale(): Locale {
  return current;
}

/**
 * One message in a given language: its text with {placeholders} filled in,
 * and one/other picked by `vars.count`. A key with no message falls back to
 * English, then to the key itself (and says so once in the console).
 *
 * The language may be any locale the UI formats with ("en-US", "zh-TW"): the
 * nearest dictionary Streamy has is used, so a test can ask for "de-DE"
 * without a German dictionary.
 */
export function translate(
  locale: string,
  key: string,
  vars: Vars = {},
): string {
  const entry = dictionary(locale)[key] ?? dictionaries.en[key];
  if (entry === undefined) {
    missing(key);
    return key;
  }
  const text =
    typeof entry === "string"
      ? entry
      : vars.count === 1
        ? entry.one
        : entry.other;
  return fill(text, vars);
}

/** The dictionary for a locale: zh-CN for anything Chinese, English for the rest. */
function dictionary(locale: string): Dictionary {
  if (locale in dictionaries) return dictionaries[locale as Locale];
  return locale.toLowerCase().startsWith("zh")
    ? dictionaries["zh-CN"]
    : dictionaries.en;
}

/** translate() for the language set with setLocale() (English until then). */
export function t(key: MessageKey, vars?: Vars): string {
  return translate(current, key, vars);
}

/** {name} → the value; a placeholder without a value stays visible. */
function fill(text: string, vars: Vars): string {
  return text.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = vars[name];
    return value === undefined ? match : String(value);
  });
}

const reported = new Set<string>();

function missing(key: string): void {
  if (reported.has(key)) return;
  reported.add(key);
  console.warn(`i18n: no message for "${key}"`);
}
