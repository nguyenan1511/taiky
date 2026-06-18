import { useEffect } from 'react';
import type { ApiPage } from '../lib/api/types';

/**
 * Drives the document <head> for SEO from a page's CMS meta
 * (`metaTitle` / `metaDescription` / `metaImage`): sets the title, description,
 * and Open Graph / Twitter tags. Existing tags are updated in place; missing
 * ones are created. No-ops until the page data is available.
 */

const DEFAULT_TITLE = 'TAKYfood';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

export function usePageMeta(page?: ApiPage) {
    useEffect(() => {
        if (!page) return;

        const title = page.metaTitle?.vi || DEFAULT_TITLE;
        const description = page.metaDescription?.vi || '';
        const image = page.metaImage?.vi || '';
        const url = window.location.href;

        document.title = title;
        upsertMeta('name', 'description', description);

        upsertMeta('property', 'og:type', 'website');
        upsertMeta('property', 'og:url', url);
        upsertMeta('property', 'og:title', title);
        upsertMeta('property', 'og:description', description);

        upsertMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
        upsertMeta('name', 'twitter:title', title);
        upsertMeta('name', 'twitter:description', description);

        if (image) {
            upsertMeta('property', 'og:image', image);
            upsertMeta('name', 'twitter:image', image);
        }
    }, [page]);
}
