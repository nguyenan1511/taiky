import { useEffect, useRef, useState } from 'react';
import { LANGUAGE_ENABLED, useLanguage, type Lang } from '../../context/language';

const LANGS: Lang[] = ['vi', 'en'];
const SHORT: Record<Lang, string> = { vi: 'VI', en: 'EN' };
const LABELS: Record<Lang, string> = { vi: 'Tiếng Việt', en: 'English' };

// English is shown but not selectable until the backend ships EN content.
const isDisabled = (l: Lang) => l === 'en' && !LANGUAGE_ENABLED;

function GlobeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path
                d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

/**
 * Language switcher (VI/EN). `dropdown` for the desktop header; `inline` for the
 * mobile menu, whose container clips an absolutely-positioned dropdown.
 */
export default function LanguageSwitcher({
    variant = 'dropdown',
    className = '',
}: {
    variant?: 'dropdown' | 'inline';
    className?: string;
}) {
    const { lang, setLang } = useLanguage();

    if (variant === 'inline') {
        return (
            <div className={`flex items-center gap-[6px] ${className}`}>
                {LANGS.map((l, i) => {
                    const disabled = isDisabled(l);
                    return (
                        <span key={l} className="flex items-center gap-[6px]">
                            {i > 0 && <span className="text-taiky-lightbrown/50">|</span>}
                            <button
                                type="button"
                                disabled={disabled}
                                onClick={() => setLang(l)}
                                aria-current={l === lang ? 'true' : undefined}
                                title={disabled ? 'Sắp có' : undefined}
                                className={`text-[15px] font-bold uppercase transition-colors ${
                                    disabled
                                        ? 'cursor-not-allowed text-taiky-lightbrown/40'
                                        : l === lang
                                          ? 'text-taiky-orange'
                                          : 'text-taiky-brown hover:text-taiky-orange'
                                }`}
                            >
                                {SHORT[l]}
                            </button>
                        </span>
                    );
                })}
            </div>
        );
    }

    return <DropdownSwitcher lang={lang} setLang={setLang} className={className} />;
}

function DropdownSwitcher({
    lang,
    setLang,
    className,
}: {
    lang: Lang;
    setLang: (l: Lang) => void;
    className: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label="Chọn ngôn ngữ"
                className="flex items-center gap-[6px] text-[16px] font-bold uppercase text-taiky-brown transition-colors hover:text-taiky-orange"
            >
                <GlobeIcon />
                {SHORT[lang]}
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={`transition-transform ${open ? 'rotate-180' : ''}`}
                >
                    <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="absolute right-0 top-full z-30 mt-[10px] min-w-[150px] overflow-hidden rounded-[10px] bg-taiky-bg shadow-card-hover"
                >
                    {LANGS.map((l) => {
                        const disabled = isDisabled(l);
                        return (
                            <li key={l} role="option" aria-selected={l === lang}>
                                <button
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => {
                                        setLang(l);
                                        setOpen(false);
                                    }}
                                    className={`flex w-full items-center justify-between gap-[10px] px-[16px] py-[10px] text-left text-[15px] font-bold transition-colors ${
                                        disabled
                                            ? 'cursor-not-allowed text-taiky-lightbrown/40'
                                            : l === lang
                                              ? 'text-taiky-orange'
                                              : 'text-taiky-brown hover:text-taiky-orange'
                                    }`}
                                >
                                    {LABELS[l]}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
