import { useEffect, useState } from 'react';

/**
 * Brand loading overlay ("Warm Heritage Stamp-Press").
 *
 * Covers the page on first load / route change, then fades out and calls
 * `onDone` so gated content can run its entrance animation. It hides only once
 * ALL of these hold: fonts are ready, the minimum visible time has elapsed, and
 * the page data is ready (`dataReady`) — with a hard cap so it can never hang.
 */

const DEFAULT_MIN_VISIBLE_MS = 3000;
const FONTS_FALLBACK_MS = 6000;
const HARD_CAP_MS = 10000;
const FADE_MS = 600;

const imgEmblem = '/images/logo-sub.svg';
const imgWordmark = '/images/logo-main.svg';

type PreloaderProps = {
    onDone: () => void;
    /** Minimum visible time in ms (defaults to 3000). */
    minVisibleMs?: number;
    /** External readiness — e.g. the page's API data has finished loading. */
    dataReady?: boolean;
};

export default function Preloader({
    onDone,
    minVisibleMs = DEFAULT_MIN_VISIBLE_MS,
    dataReady = true,
}: PreloaderProps) {
    const [hiding, setHiding] = useState(false);
    const [hidden, setHidden] = useState(false);
    // Fonts loaded AND minimum visible time elapsed.
    const [baseReady, setBaseReady] = useState(false);
    // Safety valve: force-hide after the hard cap regardless of data/fonts.
    const [forced, setForced] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const start = performance.now();

        const fontsReady =
            typeof document !== 'undefined' && document.fonts
                ? document.fonts.ready
                : Promise.resolve();
        const fontsFallback = new Promise<void>((r) => window.setTimeout(r, FONTS_FALLBACK_MS));

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        Promise.race([fontsReady, fontsFallback]).then(() => {
            if (cancelled) return;
            const wait = Math.max(0, minVisibleMs - (performance.now() - start));
            window.setTimeout(() => !cancelled && setBaseReady(true), wait);
        });

        const cap = window.setTimeout(() => !cancelled && setForced(true), HARD_CAP_MS);

        return () => {
            cancelled = true;
            window.clearTimeout(cap);
            document.body.style.overflow = prevOverflow;
        };
    }, [minVisibleMs]);

    // Hide once base (fonts + min time) AND data are ready — or the cap fires.
    useEffect(() => {
        if (!((baseReady && dataReady) || forced)) return;
        document.body.style.overflow = '';
        setHiding(true);
        onDone();
        const t = window.setTimeout(() => setHidden(true), FADE_MS);
        return () => window.clearTimeout(t);
    }, [baseReady, dataReady, forced, onDone]);

    if (hidden) return null;

    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Đang tải"
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-taiky-bg transition-opacity duration-[600ms] ease-brand ${
                hiding ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
        >
            <div className="flex flex-col items-center gap-[26px]">
                {/* Logo lockup — staged reveal, then a sheen passes across it */}
                <div className="relative flex flex-col items-center gap-[22px] overflow-hidden px-[24px] py-[12px]">
                    {/* Emblem: rises + un-clips (stage 1), then breathes (stage 3) */}
                    <div className="animate-logo-breathe">
                        <img
                            src={imgEmblem}
                            alt="TAKYfood"
                            width={97}
                            height={80}
                            className="block h-[88px] w-auto animate-logo-emblem"
                        />
                    </div>

                    {/* Wordmark: wipes in left→right (stage 2) */}
                    <img
                        src={imgWordmark}
                        alt="TAKYfood"
                        width={226}
                        height={70}
                        className="block h-[40px] w-auto animate-logo-wordmark"
                    />

                    {/* Warm sheen crossing the mark once it's revealed */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-transparent via-white/55 to-transparent animate-logo-sheen"
                    />
                </div>

                {/* Warm sweeping loader line */}
                <div className="relative mt-[4px] h-[3px] w-[180px] overflow-hidden rounded-full bg-taiky-lightbrown/25">
                    <span className="absolute inset-y-0 left-0 w-[45%] rounded-full bg-taiky-orange animate-loader-sweep" />
                </div>
            </div>
        </div>
    );
}
