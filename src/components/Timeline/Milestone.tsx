import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useReady } from '../../context/ready';

/**
 * A single timeline milestone that reveals itself as it scrolls into view —
 * the "story unfolds" effect. Two variants:
 *  - canvas: desktop, absolutely positioned image + year/title/subtitle block
 *    (the image is observed since it carries the real scroll position).
 *  - list: mobile, a stacked <li> that fades + rises as a whole.
 * Transform + opacity only; gated on `ready`; reduced-motion → instant.
 */

export type MilestoneData = {
    year: string;
    title: string;
    subtitle?: string;
    image: string;
    imageMb: string;
};

const REVEAL =
    'transition-[opacity,transform] duration-[700ms] ease-brand will-change-[opacity,transform]';

export function CanvasMilestone({
    data,
    imgPos,
    textPos,
}: {
    data: MilestoneData;
    imgPos: string;
    textPos: string;
}) {
    const { ref, isVisible } = useScrollReveal<HTMLImageElement>();
    const show = useReady() && isVisible;

    return (
        <>
            <img
                ref={ref}
                src={data.image}
                alt={`TAKYfood ${data.year}`}
                className={`absolute ${imgPos} ${REVEAL} ${
                    show ? 'translate-y-0 opacity-100' : 'translate-y-[36px] opacity-0'
                }`}
            />
            <div
                className={`absolute ${textPos} ${REVEAL} delay-[140ms] ${
                    show ? 'translate-y-0 opacity-100' : 'translate-y-[24px] opacity-0'
                }`}
            >
                <p className="font-stamp text-[44px] leading-[44px] text-taiky-orange">
                    {data.year}
                </p>
                <p className="mt-[10px] font-sans font-bold text-[18px] leading-[24px] text-taiky-brown">
                    {data.title}
                </p>
                {data.subtitle && (
                    <p className="mt-[6px] font-sans text-[14px] leading-[20px] text-taiky-lightbrown">
                        {data.subtitle}
                    </p>
                )}
            </div>
        </>
    );
}

export function MobileMilestone({ data }: { data: MilestoneData }) {
    const { ref, isVisible } = useScrollReveal<HTMLLIElement>();
    const show = useReady() && isVisible;

    return (
        <li
            ref={ref}
            className={`flex flex-col items-center gap-[12px] text-center ${REVEAL} ${
                show ? 'translate-y-0 opacity-100' : 'translate-y-[32px] opacity-0'
            }`}
        >
            <img
                src={data.imageMb}
                alt={`TAKYfood ${data.year}`}
                loading="lazy"
                className="w-full max-w-[320px] h-auto rounded-[12px]"
            />
            <p className="font-stamp text-[40px] leading-[40px] text-taiky-orange">{data.year}</p>
            <p className="font-sans font-bold text-[16px] leading-[22px] text-taiky-brown">
                {data.title}
            </p>
            {data.subtitle && (
                <p className="font-sans text-[13px] leading-[19px] text-taiky-lightbrown">
                    {data.subtitle}
                </p>
            )}
        </li>
    );
}
