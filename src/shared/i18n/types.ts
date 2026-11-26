// What Streamy speaks. Adding a language: add it to LOCALES, add its
// dictionary in src/shared/i18n/messages/*.ts, and offer it in
// src/shared/settings.ts (LANGUAGES).

export const LOCALES = ["en", "zh-CN"] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * English needs "1 file" and "2 files". Messages that count something have
 * both forms; the one for a count of 1 is `one`, and `other` covers 0, 2, 3…
 * (like ICU's rule). Languages without plural forms use a plain string.
 */
export type Plural = { readonly one: string; readonly other: string };

/**
 * One message: a sentence with {placeholders}, or its singular/plural forms.
 * A {placeholder} without a value is left as it is, so a mistake shows up.
 */
export type Entry = string | Plural;

/** Values for a message's {placeholders}. `count` also picks one/other. */
export type Vars = Record<string, string | number>;

/** Every message in one language, by key. */
export type Dictionary = Readonly<Record<string, Entry>>;

/** Text in one language: `t("settings.language")`, `t("common.peers", { count })`. */
export type Translate = (key: string, vars?: Vars) => string;
