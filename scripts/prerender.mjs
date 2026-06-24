/**
 * Post-build SEO prerender.
 *
 * Runs after `vite build` (Node — i.e. server-side). For each route it fetches
 * that page's CMS meta from the API (`/pages/:code`) and writes a per-route
 * `index.html` with the title + description + Open Graph / Twitter tags baked
 * into the <head>, so crawlers (Google, social scrapers) get correct meta in
 * the initial HTML response — no JS execution required. The React app still
 * hydrates and `usePageMeta` keeps things in sync for client navigations.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { injectMeta } from './seo-meta.mjs';

const API = (process.env.VITE_API_BASE_URL || 'https://taiky-api-2026.vercel.app').replace(
    /\/$/,
    ''
);
const SITE = (process.env.SITE_URL || 'https://takyfood.com.vn').replace(/\/$/, '');
const DIST = join(process.cwd(), 'dist');

// Route → CMS page code (mirrors PATH_TO_PAGE in src/App.tsx).
const ROUTES = {
    '/': 'HOME',
    '/story': 'ABOUT-US',
    '/products': 'PRODUCT',
    '/food': 'FOOD',
    '/news': 'NEWS',
    '/distribution': 'DISTRIBUTION',
};

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

async function fetchMeta(code) {
    try {
        const res = await fetch(`${API}/api/v1/frontend/pages/${code}`);
        const json = await res.json();
        const d = json?.data;
        if (!d) return null;
        return {
            title: d.metaTitle?.vi || 'TAKYfood',
            description: d.metaDescription?.vi || '',
            image: d.metaImage?.vi || '',
        };
    } catch (err) {
        console.warn(`[prerender] meta fetch failed for ${code}: ${err.message}`);
        return null;
    }
}

for (const [route, code] of Object.entries(ROUTES)) {
    const meta = (await fetchMeta(code)) ?? { title: 'TAKYfood', description: '', image: '' };
    const url = SITE + route;
    const html = injectMeta(template, { ...meta, url });
    const outPath =
        route === '/' ? join(DIST, 'index.html') : join(DIST, route.slice(1), 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    console.log(`[prerender] ${route.padEnd(14)} → ${code.padEnd(12)} | ${meta.title}`);
}
