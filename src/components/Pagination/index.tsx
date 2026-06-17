import { useState } from 'react';

/**
 * Orange pagination — prev / page numbers (with ellipsis) / next.
 *
 * Two modes:
 *  - Controlled: pass `page`, `pageCount` and `onPageChange` (driven by API data).
 *  - Uncontrolled (legacy): pass `pages` (or rely on the default) and it tracks
 *    its own active page locally.
 */

export type PaginationProps = {
    pages?: string[];
    page?: number;
    pageCount?: number;
    onPageChange?: (page: number) => void;
    className?: string;
};

function Chevron({ dir }: { dir: 'left' | 'right' }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
        </svg>
    );
}

/** Build a token list like [1, '…', 4, 5, 6, '…', 10] around the current page. */
function buildPageTokens(page: number, pageCount: number): (number | '…')[] {
    if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);

    const tokens: (number | '…')[] = [1];
    const start = Math.max(2, page - 1);
    const end = Math.min(pageCount - 1, page + 1);

    if (start > 2) tokens.push('…');
    for (let p = start; p <= end; p++) tokens.push(p);
    if (end < pageCount - 1) tokens.push('…');

    tokens.push(pageCount);
    return tokens;
}

const numberBtn = (active: boolean) =>
    `flex h-[40px] min-w-[40px] items-center justify-center rounded-[6px] px-[8px] text-[16px] font-bold transition ${
        active
            ? 'border border-taiky-orange text-taiky-orange'
            : 'text-taiky-orange hover:opacity-80'
    }`;

export default function Pagination({
    pages = ['1', '2', '…', '10'],
    page,
    pageCount,
    onPageChange,
    className = '',
}: PaginationProps) {
    const controlled = typeof page === 'number' && typeof pageCount === 'number';

    if (controlled) {
        if (pageCount! <= 1) return null;
        const tokens = buildPageTokens(page!, pageCount!);
        const go = (p: number) => {
            if (p >= 1 && p <= pageCount! && p !== page) onPageChange?.(p);
        };

        return (
            <nav className={`flex items-center gap-[12px] ${className}`} aria-label="Phân trang">
                <button
                    type="button"
                    aria-label="Trang trước"
                    disabled={page === 1}
                    onClick={() => go(page! - 1)}
                    className="flex h-[40px] w-[40px] items-center justify-center text-taiky-orange transition hover:opacity-80 disabled:opacity-30"
                >
                    <Chevron dir="left" />
                </button>

                {tokens.map((token, i) =>
                    token === '…' ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="px-[4px] text-[16px] text-taiky-orange"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={token}
                            type="button"
                            onClick={() => go(token)}
                            aria-current={token === page ? 'page' : undefined}
                            className={numberBtn(token === page)}
                        >
                            {token}
                        </button>
                    )
                )}

                <button
                    type="button"
                    aria-label="Trang sau"
                    disabled={page === pageCount}
                    onClick={() => go(page! + 1)}
                    className="flex h-[40px] w-[40px] items-center justify-center text-taiky-orange transition hover:opacity-80 disabled:opacity-30"
                >
                    <Chevron dir="right" />
                </button>
            </nav>
        );
    }

    return <UncontrolledPagination pages={pages} className={className} />;
}

function UncontrolledPagination({ pages, className }: { pages: string[]; className: string }) {
    const [active, setActive] = useState(pages[0]);

    return (
        <nav className={`flex items-center gap-[12px] ${className}`} aria-label="Phân trang">
            <button
                type="button"
                aria-label="Trang trước"
                className="flex h-[40px] w-[40px] items-center justify-center text-taiky-orange transition hover:opacity-80"
            >
                <Chevron dir="left" />
            </button>

            {pages.map((p, i) =>
                p === '…' ? (
                    <span key={`ellipsis-${i}`} className="px-[4px] text-[16px] text-taiky-orange">
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        type="button"
                        onClick={() => setActive(p)}
                        aria-current={p === active ? 'page' : undefined}
                        className={numberBtn(p === active)}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                type="button"
                aria-label="Trang sau"
                className="flex h-[40px] w-[40px] items-center justify-center text-taiky-orange transition hover:opacity-80"
            >
                <Chevron dir="right" />
            </button>
        </nav>
    );
}
