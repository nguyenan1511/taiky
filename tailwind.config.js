/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Arsenal', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
                // Stamp display font — dùng cho heading lớn phong cách thương hiệu.
                // NOTE: names with spaces / leading digits MUST be quoted, else the
                // unquoted font-family is invalid CSS and silently ignored.
                stamp: ['"1FTV VIP Imagine Serif Stamp Rough"', '"Arial Black"', 'sans-serif'],
                // Bold-italic section headings (GÓC BẾP, CAM KẾT, ...)
                impact: ['"Arial Black"', 'Impact', 'sans-serif'],
                // UTM Colossalis — serif display font
                colossalis: ['"UTM Colossalis"', 'serif'],
            },
            letterSpacing: {
                brand: '0.02em',
            },
            // Branded motion — one ease, two warm shadows. Reused by every card
            // so hover interactions feel cohesive across the site.
            transitionTimingFunction: {
                brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
            boxShadow: {
                card: '0 4px 14px rgba(104, 75, 43, 0.08)',
                'card-hover': '0 18px 38px -10px rgba(231, 119, 7, 0.32)',
            },
            // Loading-state motion: a warm sheen sweeping across skeleton blocks
            // (same sheen language as the card hover), plus a soft fade/rise for
            // content arriving once an API request resolves.
            keyframes: {
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                },
                'fade-rise': {
                    '0%': { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                // Hero banner: text block enters from the left, image block from
                // the right — the two halves settle into place on load.
                'enter-left': {
                    '0%': { opacity: '0', transform: 'translateX(-48px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'enter-right': {
                    '0%': { opacity: '0', transform: 'translateX(48px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                // Banner hero: text rises in (staggered) + image fades while
                // easing out of a slight zoom.
                'hero-rise': {
                    '0%': { opacity: '0', transform: 'translateY(24px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'hero-zoom': {
                    '0%': { opacity: '0', transform: 'scale(1.08)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                // Preloader logo motion (staged):
                //  1. emblem rises + un-clips from the bottom (ink-fill feel)
                //  2. wordmark wipes in left→right
                //  3. emblem breathes softly while loading continues
                //  + a warm line sweeping beneath, and a sheen crossing the mark.
                'reveal-up': {
                    '0%': {
                        opacity: '0',
                        clipPath: 'inset(100% 0 0 0)',
                        transform: 'translateY(18px) scale(0.92)',
                    },
                    '100%': {
                        opacity: '1',
                        clipPath: 'inset(0 0 0 0)',
                        transform: 'translateY(0) scale(1)',
                    },
                },
                'reveal-right': {
                    '0%': { opacity: '0', clipPath: 'inset(0 100% 0 0)' },
                    '100%': { opacity: '1', clipPath: 'inset(0 0 0 0)' },
                },
                'pulse-soft': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                },
                'logo-sheen': {
                    '0%': { transform: 'translateX(-150%) skewX(-18deg)' },
                    '100%': { transform: 'translateX(260%) skewX(-18deg)' },
                },
                'loader-sweep': {
                    '0%': { transform: 'translateX(-110%)' },
                    '100%': { transform: 'translateX(320%)' },
                },
            },
            animation: {
                shimmer: 'shimmer 1.6s infinite',
                'fade-rise': 'fade-rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
                'enter-left': 'enter-left 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
                'enter-right': 'enter-right 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both',
                'hero-rise': 'hero-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
                'hero-zoom': 'hero-zoom 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
                // Logo: reveal (once) → breathe (after, looping)
                'logo-emblem': 'reveal-up 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
                'logo-wordmark': 'reveal-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both',
                'logo-breathe': 'pulse-soft 2.6s ease-in-out 1.4s infinite',
                'logo-sheen': 'logo-sheen 2.8s ease-in-out 1.6s infinite',
                'loader-sweep': 'loader-sweep 1.2s ease-in-out infinite',
            },
            maxWidth: {
                // Site content max width (Figma 1440px artboard)
                container: '1440px',
            },
            colors: {
                taiky: {
                    bg: '#F3E9DC', // page / section background
                    cream: '#EDE0CF',
                    brown: '#684b2b',
                    lightbrown: '#b19172',
                    orange: '#e77707',
                    yellow: '#eebe37',
                    darkbrown: '#331f05',
                    footerbg: '#e77707', // footer background (matches Figma orange)
                    overlay: 'rgba(0,0,0,0.2)',
                },
            },
        },
    },
    plugins: [],
};
