import type { ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useReady } from '../../context/ready';

/**
 * Scroll-reveal wrapper: fades and rises its children into place the first
 * time they enter the viewport. Animates transform + opacity only (no layout
 * shift / CLS), on the shared `ease-brand` curve.
 *
 *   <Reveal>            → wrap any section
 *   <Reveal delay={120} → stagger sibling reveals
 */
type RevealProps = {
    children: ReactNode;
    className?: string;
    /** Stagger delay in ms (dynamic value → inline transition-delay is allowed). */
    delay?: number;
};

export default function Reveal({ children, className = '', delay }: RevealProps) {
    const { ref, isVisible } = useScrollReveal();
    const ready = useReady();
    // Hold the reveal until the loading screen has lifted, so content animates
    // in after the loader rather than behind it.
    const show = ready && isVisible;

    return (
        <div
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={`transition-[opacity,transform] duration-[700ms] ease-brand will-change-[opacity,transform] ${
                show ? 'translate-y-0 opacity-100' : 'translate-y-[40px] opacity-0'
            } ${className}`}
        >
            {children}
        </div>
    );
}
