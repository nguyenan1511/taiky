import { getLang } from '../../context/language';
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

/**
 * Find a section block by its `section` id (e.g. "1" = the banner), resolved for
 * the active language and falling back to Vietnamese when EN content is absent.
 */
export function pageSection(page: ApiPage | undefined, id: string): PageSection | undefined {
    const lang = getLang();
    const sections = page?.contents?.[lang] ?? page?.contents?.vi;
    return sections?.find((s) => s.section === id);
}
