import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll hook. Returns a `ref` to attach to an element and a
 * `isVisible` flag that flips true the first time the element scrolls into
 * view (via IntersectionObserver).
 *
 * Accessibility: when the user prefers reduced motion, content is revealed
 * immediately so nothing is ever hidden behind an animation.
 */
type Options = {
    /** Fraction of the element that must be visible to trigger (0–1). */
    threshold?: number;
    /** Margin around the viewport when computing intersection. */
    rootMargin?: string;
    /** Reveal once and stop observing (default), or re-hide when out of view. */
    once?: boolean;
};

// threshold 0 + a bottom margin = "trigger as the element rises into view",
// which works for sections of ANY height. (An area-fraction threshold can never
// be met by a section taller than the viewport / that fraction, leaving tall
// API-content sections stuck hidden.)
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
    threshold = 0,
    rootMargin = '0px 0px -12% 0px',
    once = true,
}: Options = {}) {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Respect reduced-motion: show content right away, skip observing.
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced || typeof IntersectionObserver === 'undefined') {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, isVisible };
}
