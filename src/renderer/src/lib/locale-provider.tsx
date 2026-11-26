import { type ReactNode, useEffect } from "react";
import { getLocale, resolveLocale, setLocale } from "../../../shared/i18n";
import { LocaleContext } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";

/**
 * Follows the language setting. Wraps the whole UI (see App.tsx), so a change
 * in Settings shows everywhere at once.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const snapshot = useSettings();
  // Until the settings have arrived: the language main opened the window in.
  // "System" uses the computer's language as main reads it, so the UI and
  // main's own text (menu, dialogs) never disagree.
  const locale =
    snapshot === null
      ? window.streamy.initialLocale
      : resolveLocale(snapshot.settings.language, window.streamy.systemLocale);

  // Before the children render, so format.ts (numbers, dates) is in step.
  if (getLocale() !== locale) setLocale(locale);

  useEffect(() => {
    // What the browser uses for fonts and hyphenation, and what a screen
    // reader reads the page in.
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}
