import type { ApiNews, ApiProduct, Localized, LocalizedImage } from './types';
import type { Product } from '../../components/ProductItem';
import type { NewsArticle } from '../../components/NewsItem';

/** Resolve a localized text field, preferring Vietnamese. */
export function t(value?: Localized | null): string {
    return value?.vi ?? value?.en ?? '';
}

/** Resolve a localized image URL, preferring Vietnamese then English. */
export function img(value?: LocalizedImage | null): string {
    return value?.vi ?? value?.en ?? '';
}

/** Map a backend product onto the shared ProductItem view-model. */
export function toProductCard(p: ApiProduct): Product & { id: string } {
    return {
        id: p.id,
        name: t(p.name),
        weight: t(p.volumes?.[0]?.name),
        image: img(p.image),
        shopeeUrl: p.linkShoppe || undefined,
        tiktokUrl: p.linkTiktok || undefined,
    };
}

/** Map a backend news item onto the shared NewsItem view-model. */
export function toNewsCard(n: ApiNews): NewsArticle & { id: string } {
    return {
        id: n.id,
        image: n.metadata?.image?.vi?.thumbnail || img(n.image),
        tag: n.label || '',
        title: t(n.name),
        date: n.publishDate || '',
    };
}
