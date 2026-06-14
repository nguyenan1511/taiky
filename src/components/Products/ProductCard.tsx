export type Product = {
    img: string;
    /** Supports `\n` for a two-line product name (rendered via whitespace-pre-line). */
    title: string;
    desc: string;
};

type ProductCardProps = Product & {
    /** Link target for the CTA. Defaults to "#". */
    href?: string;
    /** CTA label. Defaults to "Xem chi tiết". */
    ctaLabel?: string;
    /** Extra classes for the outer card (e.g. width when used outside the carousel). */
    className?: string;
};

/**
 * Presentational product card: image + title + description + CTA.
 * Fills its container width (`w-full`) so the parent owns layout/sizing —
 * the Products carousel sets a fixed slide width, but it can be dropped into
 * any grid/flex container elsewhere.
 */
export default function ProductCard({
    img,
    title,
    desc,
    href = '#',
    ctaLabel = 'Xem chi tiết',
    className = '',
}: ProductCardProps) {
    return (
        <article
            className={`flex w-full flex-col items-center gap-[16px] text-center ${className}`}
        >
            <div className="h-[301px] w-full overflow-hidden">
                <img
                    src={img}
                    alt={title.replace(/\n/g, ' ')}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                />
            </div>

            <p className="whitespace-pre-line font-bold text-[20px] leading-6 text-taiky-brown">
                {title}
            </p>

            <p className="font-normal text-[12px] leading-4 text-taiky-darkbrown">{desc}</p>

            <a
                href={href}
                className="font-bold text-[20px] leading-6 text-taiky-yellow transition-opacity hover:underline hover:opacity-80"
            >
                {ctaLabel}
            </a>
        </article>
    );
}
