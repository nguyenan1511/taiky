import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

/**
 * Active display language for API-driven content. UI labels remain Vietnamese;
 * this only drives which localized field `t()` / `img()` resolve.
 */
export type Lang = 'vi' | 'en';

/**
 * Master switch for the language feature. Off until the backend ships English
 * content — flip to `true` to re-enable the header switcher and EN support.
 */
export const LANGUAGE_ENABLED = false;

const STORAGE_KEY = 'taiky-lang';

const read = (): Lang => {
    if (!LANGUAGE_ENABLED || typeof localStorage === 'undefined') return 'vi';
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'vi';
};

/**
 * Module-level mirror of the active language so the plain (non-hook) helpers
 * `t()` / `img()` can resolve localized fields synchronously, without threading
 * a hook through every call site. Kept in sync by the provider below.
 */
let activeLang: Lang = read();
export const getLang = (): Lang => activeLang;

interface LanguageValue {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageValue>({ lang: 'vi', setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(read);

    // Keep the module mirror aligned on every render (including the first).
    activeLang = lang;

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = (next: Lang) => {
        activeLang = next;
        if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, next);
        setLangState(next);
    };

    return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
