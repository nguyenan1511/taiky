import { Children, type ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useReady } from '../../context/ready';

/**
 * Scroll-reveal container that cascades its direct children in sequence as the
 * group enters the viewport. Each child is wrapped in a fade+rise that fires on
 * a staggered delay — layered under the section-level <Reveal> for a richer,
 * cohesive entrance. Transform + opacity only (no layout shift); gated on the
 * global `ready` flag and honored by `prefers-reduced-motion`.
 *
 * Drop it in place of a grid/flex container — pass the layout classes via
 * `className` and it renders them on the wrapper:
 *
 *   <RevealStagger className="grid grid-cols-3 gap-6">{items}</RevealStagger>
 */
type RevealStaggerProps = {
    children: ReactNode;
    className?: string;
    /** Per-child delay in ms. */
    step?: number;
    /** Max delay cap so long lists don't trail too far. */
    maxDelay?: number;
};

export default function RevealStagger({
    children,
    className = '',
    step = 90,
    maxDelay = 600,
}: RevealStaggerProps) {
    const { ref, isVisible } = useScrollReveal();
    const ready = useReady();
    const show = ready && isVisible;

    return (
        <div ref={ref} className={className}>
            {Children.toArray(children).map((child, i) => (
                <div
                    key={i}
                    style={{ transitionDelay: show ? `${Math.min(i * step, maxDelay)}ms` : '0ms' }}
                    className={`transition-[opacity,transform] duration-[600ms] ease-brand will-change-[opacity,transform] ${
                        show ? 'translate-y-0 opacity-100' : 'translate-y-[24px] opacity-0'
                    }`}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}
