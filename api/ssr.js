/**
 * Runtime SEO SSR for the dynamic detail routes (`/products/:slug`,
 * `/news/:slug`).
 *
 * These routes can't be prerendered at build time (the set of slugs is open and
 * CMS content changes without a rebuild), so the build-time prerender only
 * covers the static routes. This Vercel serverless function runs PER REQUEST —
 * the "getServerSideProps" equivalent: it fetches the item's meta from the API,
 * injects the title + Open Graph / Twitter tags into the built HTML shell, and
 * returns it so crawlers and social scrapers (which don't run JS) see correct
 * meta in the initial response. The React app then hydrates as usual.
 *
 * Wired up in `vercel.json`:
 *   /products/:slug → /api/ssr?type=product&slug=:slug
 *   /news/:slug     → /api/ssr?type=news&slug=:slug
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { injectMeta } from '../scripts/seo-meta.mjs';

const API = (process.env.VITE_API_BASE_URL || 'https://taiky-api-2026.vercel.app').replace(
    /\/$/,
    ''
);
const SITE = (process.env.SITE_URL || 'https://takyfood.com.vn').replace(/\/$/, '');

// Read the built HTML shell once per cold start (included via vercel.json
// `functions.includeFiles`). The shell already carries sensible default meta.
let templateCache = null;
function getTemplate() {
    if (templateCache == null) {
        templateCache = readFileSync(join(process.cwd(), 'dist', 'index.html'), 'utf8');
    }
    return templateCache;
}

const loc = (v) => v?.vi || v?.en || '';

async function fetchItem(path) {
    const res = await fetch(`${API}${path}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
}

/** Resolve a detail item's meta, falling back to its name/description/image. */
async function resolveMeta(type, slug) {
    if (!slug) return null;
    const encoded = encodeURIComponent(slug);

    if (type === 'product') {
        const d = await fetchItem(`/api/v1/frontend/products/${encoded}`);
        if (!d) return null;
        return {
            title: loc(d.metaTitle) || loc(d.name) || 'TAKYfood',
            description: loc(d.metaDescription) || loc(d.description),
            image: loc(d.metaImage) || loc(d.image),
        };
    }

    if (type === 'news') {
        const d = await fetchItem(`/api/v1/frontend/news/${encoded}`);
        if (!d) return null;
        return {
            title: loc(d.metaTitle) || loc(d.name) || 'TAKYfood',
            description: loc(d.metaDescription) || loc(d.description),
            image:
                loc(d.metaImage) ||
                d.metadata?.image?.vi?.thumbnail ||
                loc(d.image),
        };
    }

    return null;
}

export default async function handler(req, res) {
    const { type = '', slug = '' } = req.query || {};
    const canonical =
        type === 'product'
            ? `${SITE}/products/${slug}`
            : type === 'news'
              ? `${SITE}/news/${slug}`
              : SITE;

    let html;
    try {
        html = getTemplate();
    } catch (err) {
        // Shouldn't happen (shell is bundled), but never hard-fail the page.
        console.error('[ssr] template read failed:', err?.message);
        res.status(500).send('Internal Server Error');
        return;
    }

    try {
        const meta = await resolveMeta(String(type), String(slug));
        if (meta) {
            html = injectMeta(html, { ...meta, url: canonical });
        }
    } catch (err) {
        // On any API failure, fall back to the shell's default meta — the SPA
        // still renders and `usePageMeta` corrects the head on the client.
        console.warn('[ssr] meta resolve failed:', err?.message);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Cache at the edge: serve fast, refresh in the background.
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
    res.status(200).send(html);
}
