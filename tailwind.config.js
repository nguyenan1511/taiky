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
