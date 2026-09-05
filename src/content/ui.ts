import raw from './ui.json';
import { getLang, useLanguage, type Lang } from '../context/language';

/**
 * Static UI copy that is NOT rendered from the API (headings, CTAs, fallbacks).
 * Localized by the active language, with Vietnamese as the fallback — the same
 * pattern as `policies.ts`, so translatable strings live in one JSON file.
 */
export type UiText = (typeof raw)['vi'];

const UI = raw as Record<Lang, UiText>;

/** Non-hook accessor for the active language's UI copy (vi fallback). */
export function getUi(): UiText {
    return UI[getLang()] ?? UI.vi;
}

/** Hook variant — re-renders the caller when the language changes. */
export function useUi(): UiText {
    const { lang } = useLanguage();
    return UI[lang] ?? UI.vi;
}
