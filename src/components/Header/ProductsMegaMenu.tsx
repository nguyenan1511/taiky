import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories, useProducts } from '../../lib/api/queries';
import { t, toProductCard } from '../../lib/api/helpers';

/**
 * Product thumbnail with a graceful fallback: when the URL is missing or fails
 * to load, show a branded placeholder (faded logo on cream) instead of the
 * browser's broken-image icon.
 */
function Thumb({ src, alt }: { src: string; alt: string }) {
    const [broken, setBroken] = useState(false);

    if (!src || broken) {
        return (
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[8px] bg-taiky-cream">
                <img
                    src="/images/logo-sub.svg"
                    alt=""
                    aria-hidden
                    className="h-[30px] w-[30px] object-contain opacity-40"
                />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setBroken(true)}
            className="h-[52px] w-[52px] shrink-0 rounded-[8px] object-contain"
        />
    );
}

/**
 * Mega menu shown on hover of the "Sản phẩm" nav link: a category list on the
 * left; hovering a category reveals its products on the right. Data comes from
 * `GET /categories` and `GET /products?categories=<id>` (the server owns the
 * product→category mapping, so we let it filter).
 */
export default function ProductsMegaMenu({ onNavigate }: { onNavigate: () => void }) {
    const { data: categoriesData } = useCategories();
    const categories = categoriesData?.data ?? [];

    // Hovered category drives the right panel; default to the first category.
    const [hovered, setHovered] = useState<string | null>(null);
    const activeId = hovered ?? categories[0]?.id ?? '';

    const { data: productsData, isLoading } = useProducts({
        categories: activeId || undefined,
        limit: 9,
    });
    const products = productsData?.data ?? [];

    return (
        <div className="grid grid-cols-[minmax(200px,240px)_1fr] gap-[28px]">
            {/* Categories */}
            <ul className="flex flex-col gap-[2px] border-r border-taiky-lightbrown/20 pr-[16px]">
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link
                            to="/products"
                            onMouseEnter={() => setHovered(category.id)}
                            onClick={onNavigate}
                            className={`flex items-center justify-between gap-[8px] rounded-[8px] px-[12px] py-[10px] text-[15px] font-bold uppercase tracking-[0.02em] transition-colors ${
                                category.id === activeId
                                    ? 'bg-taiky-cream text-taiky-orange'
                                    : 'text-taiky-brown hover:text-taiky-orange'
                            }`}
                        >
                            {t(category.name)}
                            <span aria-hidden>›</span>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Products in the active category */}
            <div className="min-h-[168px]">
                {isLoading ? (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-[16px]">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-[68px] animate-pulse rounded-[10px] bg-taiky-cream/60"
                            />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-[15px] font-bold text-taiky-lightbrown">
                        Chưa có sản phẩm.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-[16px] gap-y-[8px]">
                        {products.map((p) => {
                            const card = toProductCard(p);
                            return (
                                <Link
                                    key={card.id}
                                    to={card.url}
                                    onClick={onNavigate}
                                    className="group flex items-center gap-[12px] rounded-[10px] p-[8px] transition-colors hover:bg-taiky-cream"
                                >
                                    <Thumb src={card.image} alt={card.name} />
                                    <span className="line-clamp-2 text-[14px] font-bold leading-[18px] text-taiky-brown transition-colors group-hover:text-taiky-orange">
                                        {card.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
