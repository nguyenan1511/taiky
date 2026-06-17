import { useEffect, useState } from 'react';

/**
 * Returns `true` once the window is scrolled past `threshold` px.
 * rAF-throttled and registered as a passive listener so it never
 * blocks or thrashes during scroll; cleans up on unmount.
 */
export function useScrolled(threshold = 12): boolean {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            setScrolled(window.scrollY > threshold);
        };

        const onScroll = () => {
            if (frame) return; // coalesce bursts into one rAF callback
            frame = requestAnimationFrame(update);
        };

        update(); // sync initial state (e.g. reloading mid-page)
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [threshold]);

    return scrolled;
}
