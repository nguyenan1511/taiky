import type { ReactNode } from 'react';

type ContainerProps = {
    children: ReactNode;
    /** Extra classes — pass section-specific padding/layout here (e.g. `px-[72px] flex`). */
    className?: string;
};

/**
 * Centered content wrapper capped at the site's max width (`max-w-container`, 1440px).
 * Owns only width + centering; callers supply their own horizontal padding/layout
 * since each section uses a different gutter.
 */
export default function Container({ children, className = '' }: ContainerProps) {
    return <div className={`max-w-[1288px] mx-auto px-[20px] ${className}`}>{children}</div>;
}
