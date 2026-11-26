import { createContext, useCallback, useContext } from "react";
import {
  type Locale,
  type MessageKey,
  type Vars,
  getLocale,
  translate,
} from "../../../shared/i18n";

// The UI's language. The setting (Settings → General → Language) decides it;
// "system" follows the computer's. Everything asks useT() for its text, so
// changing the language re-renders what says something.
//
// Text outside a component (a toast in an event handler, a helper that
// formats a sentence) uses t() from here: it reads the same language.
//
// LocaleProvider (locale-provider.tsx) keeps it all in step. It's a separate
// file so this one, which has no components, doesn't break fast refresh.

/** Text in the language on screen. */
export type T = (key: MessageKey, vars?: Vars) => string;

/** The language on screen, once LocaleProvider is around the UI. */
export const LocaleContext = createContext<Locale>(
  window.streamy.initialLocale,
);

/** The language on screen (for formatting numbers and dates too). */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** `const t = useT()`: the component's text, in the language on screen. */
export function useT(): T {
  const locale = useLocale();
  return useCallback<T>((key, vars) => translate(locale, key, vars), [locale]);
}

/**
 * For code that isn't a component: toasts and other one-off messages. Always
 * the language on screen (LocaleProvider keeps it up to date).
 */
export function t(key: MessageKey, vars?: Vars): string {
  return translate(getLocale(), key, vars);
}
