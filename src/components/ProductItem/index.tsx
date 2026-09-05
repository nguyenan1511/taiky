import { Link } from 'react-router-dom';
import { useUi } from '../../content/ui';

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
        <svg
            width="18"
            height="21"
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.3146 15.1064C12.508 13.5262 11.4904 12.5187 8.8035 11.6609C7.50168 11.2169 6.88861 10.6349 6.90291 9.83515C6.95757 8.94709 7.78425 8.30038 8.88087 8.27936C9.74449 8.28867 10.5868 8.5487 11.3054 9.02782C11.4029 9.08837 11.4711 9.07828 11.5266 8.99418C11.6023 8.87308 11.7915 8.57958 11.8545 8.47278C11.8974 8.4055 11.9058 8.31636 11.7974 8.23731C11.6418 8.1221 11.2053 7.8883 10.9707 7.78991C10.3025 7.5071 9.58461 7.36016 8.85901 7.35765C7.25275 7.36438 5.98877 8.37943 5.88197 9.73424C5.81357 10.7131 6.29853 11.5056 7.33685 12.1117C7.55803 12.2395 8.74968 12.7138 9.22399 12.8618C10.7159 13.326 11.4904 14.1586 11.3079 15.1299C11.1422 16.0104 10.2155 16.5797 8.93806 16.5966C7.92637 16.5579 7.01476 16.145 6.30834 15.5958L6.18977 15.5033C6.10231 15.436 6.00644 15.4402 5.94841 15.5285C5.90636 15.5933 5.6322 15.9885 5.56324 16.092C5.49849 16.1828 5.53381 16.2333 5.60109 16.2888C5.89543 16.5352 6.28816 16.8043 6.55475 16.9405C7.29317 17.3168 8.10551 17.5256 8.93385 17.5519C9.53022 17.5803 10.1256 17.4787 10.6789 17.2542C11.5997 16.8631 12.1951 16.0819 12.3146 15.1064ZM9.00029 1.1782C7.26116 1.1782 5.84329 2.81809 5.77685 4.87006H12.2229C12.1548 2.81725 10.7377 1.17736 9.00029 1.17736M15.6028 20.1816L15.5355 20.1825L2.26159 20.1808C1.35839 20.1471 0.694864 19.4155 0.604039 18.5064L0.59563 18.3424L0.00106336 5.2855C-0.00283379 5.23305 0.00400654 5.18035 0.0211664 5.13063C0.0383262 5.08091 0.0654451 5.03521 0.100865 4.99633C0.136286 4.95745 0.179263 4.92619 0.227171 4.90448C0.27508 4.88277 0.326912 4.87106 0.3795 4.87006H4.56333C4.66509 2.15961 6.61193 0 9.00029 0C11.3886 0 13.3338 2.16045 13.4364 4.86922H17.6144C17.6667 4.86938 17.7184 4.88016 17.7665 4.9009C17.8145 4.92164 17.8579 4.95191 17.8939 4.98988C17.9299 5.02786 17.9578 5.07274 17.976 5.12182C17.9941 5.17089 18.0021 5.22315 17.9995 5.27541L17.3494 18.3845L17.3436 18.4946C17.2645 19.4147 16.5203 20.1572 15.6028 20.1816Z"
                fill="white"
            />
        </svg>
    );
}

/** TikTok note mark. */
function TiktokIcon() {
    return (
        <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.4872 3.13333C12.7463 2.26614 12.3379 1.15267 12.338 0H8.98788V13.7778C8.96258 14.5235 8.6556 15.2301 8.13171 15.7483C7.60782 16.2666 6.90798 16.556 6.17985 16.5556C4.64031 16.5556 3.36097 15.2667 3.36097 13.6667C3.36097 11.7556 5.16071 10.3222 7.01467 10.9111V7.4C3.27424 6.88889 0 9.86667 0 13.6667C0 17.3667 2.99235 20 6.16901 20C9.57334 20 12.338 17.1667 12.338 13.6667V6.67778C13.6965 7.67761 15.3275 8.21405 17 8.21111V4.77778C17 4.77778 14.9617 4.87778 13.4872 3.13333Z"
                fill="white"
            />
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
    const ui = useUi().productItem;
    return (
        <article className="group flex flex-col rounded-[16px] border border-taiky-lightbrown/30 bg-[#F3E9DC] p-[20px] shadow-card transition-[box-shadow,border-color] duration-[450ms] ease-brand hover:border-taiky-orange/50 hover:shadow-card-hover">
            {/* Social links */}
            <div className="flex items-center gap-[12px]">
                <a
                    href={shopeeUrl ?? '#'}
                    aria-label={ui.buyShopee.replace('{name}', name)}
                    className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-taiky-orange text-white transition hover:opacity-90"
                >
                    <ShopeeIcon />
                </a>
                <a
                    href={tiktokUrl ?? '#'}
                    aria-label={ui.buyTiktok.replace('{name}', name)}
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
                <h3 className="text-center font-bold min-h-[52px] text-[20px] leading-[26px] text-taiky-brown transition-colors duration-[450ms] ease-brand group-hover:text-taiky-orange">
                    {name}
                </h3>
            </Link>
            <p className="mt-[10px] text-center text-[15px] font-semibold min-h-[20px] leading-[20px] tracking-[0.04em] text-taiky-lightbrown uppercase">
                {weight}
            </p>
        </article>
    );
}
