/**
 * Response shapes for the TAKYfood backend (`/api/v1/frontend`).
 *
 * Text fields are localized objects. `name` carries a `non` (non-accented)
 * variant for search; display text and images may also have `en`.
 */

export type Localized = { vi: string; non?: string; en?: string | null };
export type LocalizedImage = { vi: string | null; en?: string | null };

/** Standard list envelope: `{ data, pagination, success, message }`. */
export interface ListResponse<T> {
    data: T[];
    pagination: PaginationMeta;
    success: boolean;
    message: string;
}

/** Single-object envelope (e.g. settings): `{ data, success, message }`. */
export interface ItemResponse<T> {
    data: T;
    success: boolean;
    message: string;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    pageCount: number;
}

/** category / brand / product-line / volume / flavor / news-category. */
export interface Taxonomy {
    id: string;
    name: Localized;
    active: boolean;
    sort: number;
    createdAt: string;
}

export interface ApiProduct {
    id: string;
    name: Localized;
    image: LocalizedImage;
    imageMb: LocalizedImage;
    link?: { vi?: string | null };
    sort: number;
    active: boolean;
    description: Localized;
    linkShoppe: string;
    linkTiktok: string;
    isHighlight: boolean;
    categories: Taxonomy[];
    brands: Taxonomy[];
    lines: Taxonomy[];
    volumes: Taxonomy[];
    flavors: Taxonomy[];
    createdAt: string;
}

export interface ApiNews {
    id: string;
    name: Localized;
    image: LocalizedImage;
    imageMb: LocalizedImage;
    sort: number;
    active: boolean;
    label: string;
    publishDate: string;
    description: Localized;
    categories: string[];
    createdAt: string;
    metadata?: {
        image?: { vi?: { thumbnail?: string }; en?: Record<string, string> };
        imageMb?: { vi?: { thumbnail?: string }; en?: Record<string, string> };
    };
}

export interface ApiLogo {
    id: string;
    name: Localized;
    image: LocalizedImage;
    sort: number;
    active: boolean;
    createdAt: string;
}

export interface ApiSettings {
    companyName: string;
    address: string;
    factoryAddress: string;
    phone: string;
    email: string;
    license: string;
    contents: { header: string; body: string; footer: string };
    linkYoutube: string;
    imageYoutube: string | null;
    linkFacebook: string;
    imageFacebook: string | null;
    linkTiktok: string;
    imageTiktok: string | null;
}

/** Body for `POST /contacts`. */
export interface ContactPayload {
    name: string;
    phone: string;
    email: string;
    message: string;
}

/** `GET /grown-ups` — development-timeline milestone (Quá trình phát triển). */
export interface ApiGrownUp {
    id: string;
    title: Localized;
    description: Localized;
    year: Localized;
    image: LocalizedImage;
    imageMb: LocalizedImage;
    sort: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * `GET /culinary` — recipe / "Ẩm thực" item. The endpoint is in the Postman
 * collection but not yet deployed (returns 404), so fields beyond the common
 * pattern are tentative; widen this once the live shape is known.
 */
export interface ApiCulinary {
    id: string;
    name: Localized;
    image: LocalizedImage;
    imageMb?: LocalizedImage;
    description?: Localized;
    sort?: number;
    active?: boolean;
    categories?: string[];
    /** Recipe meta — exact field names TBD once the endpoint is live. */
    people?: string;
    time?: string;
    difficulty?: string;
    createdAt?: string;
}

/** One section block of a CMS page (`GET /pages/:code`). */
export interface PageSection {
    section: string;
    title?: string;
    content?: string;
    image?: string;
    imageMb?: string;
    product?: string;
    linkProduct?: string;
    link?: string;
    linkVideo?: string;
    label?: string;
    description?: string;
}

/** `GET /pages/:code` — per-page CMS content + SEO meta. */
export interface ApiPage {
    id: string;
    name: string;
    code: string;
    contents: { vi: PageSection[]; en?: PageSection[] };
    metaImage: LocalizedImage;
    metaTitle: Localized;
    metaDescription: Localized;
    createdAt: string;
    updatedAt: string;
}
