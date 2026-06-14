import { useState } from 'react';

/**
 * Orange pagination — prev / page numbers (with ellipsis) / next.
 * Uncontrolled: tracks its own active page. Shared across listing sections.
 */

export type PaginationProps = {
    pages?: string[];
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

export default function Pagination({
    pages = ['1', '2', '…', '10'],
    className = '',
}: PaginationProps) {
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

            {pages.map((page, i) =>
                page === '…' ? (
                    <span key={`ellipsis-${i}`} className="px-[4px] text-[16px] text-taiky-orange">
                        …
                    </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        onClick={() => setActive(page)}
                        aria-current={page === active ? 'page' : undefined}
                        className={`flex h-[40px] min-w-[40px] items-center justify-center rounded-[6px] px-[8px] text-[16px] font-bold transition ${
                            page === active
                                ? 'border border-taiky-orange text-taiky-orange'
                                : 'text-taiky-orange hover:opacity-80'
                        }`}
                    >
                        {page}
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
