import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';

/** Old site URLs Google still indexes — 301 them so SEO equity moves to the new routes. */
const LEGACY_REDIRECTS: Record<string, string> = {
    '/vn/trang-chu.html': '/',
};

function redirectLocation(url: string | undefined): string | undefined {
    if (!url) return undefined;
    const q = url.indexOf('?');
    const pathname = q === -1 ? url : url.slice(0, q);
    const dest = LEGACY_REDIRECTS[pathname];
    if (!dest) return undefined;
    return dest + (q === -1 ? '' : url.slice(q));
}

function applyLegacyRedirects(server: ViteDevServer | PreviewServer) {
    server.middlewares.use((req, res, next) => {
        // Connect's IncomingMessage may omit `url` in TS when @types/node is absent.
        const location = redirectLocation((req as { url?: string }).url);
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
