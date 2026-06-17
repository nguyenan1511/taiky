import type { ApiPage, PageSection } from './types';

/**
 * Page codes for `GET /pages/:code` (CMS banner + section content).
 * Use these constants instead of raw strings so call sites stay consistent.
 */
export const PAGE = {
    HOME: 'HOME',
    ABOUT_US: 'ABOUT-US',
    PRODUCT: 'PRODUCT',
    FOOD: 'FOOD',
    NEWS: 'NEWS',
    DISTRIBUTION: 'DISTRIBUTION',
} as const;

export type PageCode = (typeof PAGE)[keyof typeof PAGE];

/** Find a section block by its `section` id (e.g. "1" = the banner). */
export function pageSection(page: ApiPage | undefined, id: string): PageSection | undefined {
    return page?.contents?.vi?.find((s) => s.section === id);
}
