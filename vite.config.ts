import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';

/** Old site URLs Google still indexes — 301 them so SEO equity moves to the new routes. */
const LEGACY_REDIRECTS: Record<string, string> = {
    '/vn/trang-chu.html': '/',
};

/** Connect's IncomingMessage may not expose `url` in TS without @types/node. */
function redirectLocation(req: { url?: string }): string | undefined {
    if (!req.url) return undefined;
    const q = req.url.indexOf('?');
    const pathname = q === -1 ? req.url : req.url.slice(0, q);
    const dest = LEGACY_REDIRECTS[pathname];
    if (!dest) return undefined;
    return dest + (q === -1 ? '' : req.url.slice(q));
}

function applyLegacyRedirects(server: ViteDevServer | PreviewServer) {
    server.middlewares.use((req, res, next) => {
        const location = redirectLocation(req);
        if (!location) {
            next();
            return;
        }
        res.statusCode = 301;
        res.setHeader('Location', location);
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
