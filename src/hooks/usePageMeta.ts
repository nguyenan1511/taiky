import { useEffect } from 'react';
import type { ApiPage } from '../lib/api/types';

/**
 * Drives the document <head> for SEO: title + description + Open Graph / Twitter
 * tags. Existing tags are updated in place; missing ones are created.
 *  - `useDocumentMeta` — generic, takes resolved title/description/image.
 *  - `usePageMeta` — convenience wrapper for a CMS page (`/pages/:code`).
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

type Meta = { title?: string; description?: string; image?: string };

export function useDocumentMeta({ title, description = '', image = '' }: Meta, enabled = true) {
    useEffect(() => {
        if (!enabled || !title) return;

        document.title = title;
        upsertMeta('name', 'description', description);

        upsertMeta('property', 'og:type', 'website');
        upsertMeta('property', 'og:url', window.location.href);
        upsertMeta('property', 'og:title', title);
        upsertMeta('property', 'og:description', description);

        upsertMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
        upsertMeta('name', 'twitter:title', title);
        upsertMeta('name', 'twitter:description', description);

        if (image) {
            upsertMeta('property', 'og:image', image);
            upsertMeta('name', 'twitter:image', image);
        }
    }, [enabled, title, description, image]);
}

export function usePageMeta(page?: ApiPage) {
    useDocumentMeta(
        {
            title: page?.metaTitle?.vi || DEFAULT_TITLE,
            description: page?.metaDescription?.vi || '',
            image: page?.metaImage?.vi || '',
        },
        Boolean(page)
    );
}
