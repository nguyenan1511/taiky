import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import type { PreviewServer } from 'vite';
import react from '@vitejs/plugin-react';

/** Old site URLs Google still indexes — 301 them so SEO equity moves to the new routes. */
const LEGACY_REDIRECTS: Record<string, string> = {
    '/vn/trang-chu.html': '/',
};

function applyLegacyRedirects(server: ViteDevServer | PreviewServer) {
    server.middlewares.use((req, res, next) => {
        if (!req.url) {
            next();
            return;
        }
        const q = req.url.indexOf('?');
        const pathname = q === -1 ? req.url : req.url.slice(0, q);
        const dest = LEGACY_REDIRECTS[pathname];
        if (!dest) {
            next();
            return;
        }
        const search = q === -1 ? '' : req.url.slice(q);
        res.statusCode = 301;
        res.setHeader('Location', dest + search);
        res.end();
    });
}

function legacyRedirects(): Plugin {
    return {
        name: 'legacy-redirects',
        configureServer: applyLegacyRedirects,
        configurePreviewServer: applyLegacyRedirects,
    };
}

export default defineConfig({
    plugins: [react(), legacyRedirects()],
});
