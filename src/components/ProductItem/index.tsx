import { Link } from 'react-router-dom';

export type Product = {
    name: string;
    weight: string;
    image: string;
    shopeeUrl?: string;
    tiktokUrl?: string;
    /** Detail-page link (`/products/:slug`). */
    url?: string;
};

/** Shopee "bag" mark. */
function ShopeeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M8 7a4 4 0 1 1 8 0M4.5 8h15l-1 12.5a1.5 1.5 0 0 1-1.5 1.4H7a1.5 1.5 0 0 1-1.5-1.4L4.5 8Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 12.5c-1.4 0-2 .8-2 1.6 0 1.9 3.4 1.2 3.4 3 0 .9-.8 1.6-2 1.6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

/** TikTok note mark. */
function TiktokIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.5 3c.4 2.3 1.8 3.9 4 4.2v3c-1.5.1-2.9-.3-4.2-1.1v5.8a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.1a2.7 2.7 0 1 0 1.9 2.6V3h3.1Z" />
        </svg>
    );
}

export default function ProductItem({
    name,
    weight,
    image,
    shopeeUrl,
    tiktokUrl,
    url = '#',
}: Product) {
    return (
        <article className="group flex flex-col rounded-[16px] border border-taiky-lightbrown/30 bg-[#F3E9DC] p-[20px] shadow-card transition-[box-shadow,border-color] duration-[450ms] ease-brand hover:border-taiky-orange/50 hover:shadow-card-hover">
            {/* Social links */}
            <div className="flex items-center gap-[12px]">
                <a
                    href={shopeeUrl ?? '#'}
                    aria-label={`Mua ${name} trên Shopee`}
                    className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-taiky-orange text-white transition hover:opacity-90"
                >
                    <ShopeeIcon />
                </a>
                <a
                    href={tiktokUrl ?? '#'}
                    aria-label={`Mua ${name} trên TikTok Shop`}
                    className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-taiky-orange text-white transition hover:opacity-90"
                >
                    <TiktokIcon />
                </a>
            </div>

            {/* Product image */}
            <Link to={url} className="flex flex-1 items-center justify-center py-[24px]">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="h-[300px] w-auto object-contain"
                />
            </Link>

            {/* Name + weight */}
            <Link to={url}>
                <h3 className="text-center font-bold text-[20px] leading-[26px] text-taiky-brown transition-colors duration-[450ms] ease-brand group-hover:text-taiky-orange">
                    {name}
                </h3>
            </Link>
            <p className="mt-[10px] text-center text-[15px] leading-[20px] tracking-[0.04em] text-taiky-lightbrown uppercase">
                {weight}
            </p>
        </article>
    );
}
