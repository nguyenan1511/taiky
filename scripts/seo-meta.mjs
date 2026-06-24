/**
 * Shared SEO meta helpers (server-side only — Node).
 *
 * Used by both the build-time prerender (`scripts/prerender.mjs`, for the static
 * routes) and the runtime SSR function (`api/ssr.js`, for the dynamic
 * `/products/:slug` and `/news/:slug` routes). Keeping one implementation means
 * the <head> that crawlers receive is identical regardless of how it was built.
 */

export const esc = (s = '') =>
    String(s)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

/**
 * Replace (or create) the title + Open Graph / Twitter meta tags in an HTML
 * document string. Existing tags are updated in place; missing ones are
 * appended before `</head>`.
 */
export function injectMeta(html, { title, description, image, url }) {
    let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);

    const setAttr = (attr, key, content) => {
        const re = new RegExp(`(<meta\\s+${attr}="${key}"[^>]*\\scontent=")[^"]*(")`, 'i');
        if (re.test(out)) {
            out = out.replace(re, `$1${esc(content)}$2`);
        } else {
            out = out.replace(
                '</head>',
                `    <meta ${attr}="${key}" content="${esc(content)}" />\n</head>`
            );
        }
    };

    setAttr('name', 'description', description);
    setAttr('property', 'og:title', title);
    setAttr('property', 'og:description', description);
    if (url) setAttr('property', 'og:url', url);
    setAttr('name', 'twitter:title', title);
    setAttr('name', 'twitter:description', description);
    if (image) {
        setAttr('property', 'og:image', image);
        setAttr('name', 'twitter:image', image);
    }
    return out;
}
