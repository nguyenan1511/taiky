import { useState } from 'react';
import Container from '../Container';
import ProductItem from '../ProductItem';
import ProductCardSkeleton from '../ProductItem/Skeleton';
import Pagination from '../Pagination';
import ListState from '../ListState';
import RevealStagger from '../RevealStagger';
import { useCategories, useProducts, usePage } from '../../lib/api/queries';
import { t, toProductCard } from '../../lib/api/helpers';
import { PAGE, pageSection } from '../../lib/api/pages';

/**
 * "DANH MỤC SẢN PHẨM" — product catalog: category tabs (from `GET /categories`),
 * a product grid filtered by the active category (`GET /products?categories=`)
 * and server-driven pagination.
 */

const PER_PAGE = 8;

const imgDecor = '/images/decor-timeline-1.png';
const imgSketch = '/images/decor-bottom-catalog.jpg';

export default function ProductCatalog() {
    // empty category id = "all categories"
    const [activeCategory, setActiveCategory] = useState('');
    const [page, setPage] = useState(1);
    const [ddOpen, setDdOpen] = useState(false);

    const { data: categoriesData } = useCategories();
    const categories = categoriesData?.data ?? [];
    const activeLabel = activeCategory
        ? t(categories.find((c) => c.id === activeCategory)?.name)
        : 'Tất cả';

    // PRODUCT page CMS section 3: heading.
    const { data: cmsPage } = usePage(PAGE.PRODUCT);
    const heading = pageSection(cmsPage?.data, '3')?.title || 'DANH MỤC SẢN PHẨM';

    const { data, isLoading, isError, refetch } = useProducts({
        categories: activeCategory || undefined,
        page,
        limit: PER_PAGE,
    });
    const products = data?.data ?? [];
    const pageCount = data?.pagination.pageCount ?? 1;

    const selectCategory = (id: string) => {
        setActiveCategory(id);
        setPage(1);
        setDdOpen(false);
    };

    const tabClass = (active: boolean) =>
        `-mb-[1px] border-b-2 pb-[14px] text-[16px] font-bold uppercase tracking-[0.04em] transition-colors ${
            active
                ? 'border-taiky-orange text-taiky-orange'
                : 'border-transparent text-taiky-brown hover:text-taiky-orange'
        }`;

    return (
        <section className="relative w-full  bg-taiky-bg z-10">
            <div className="absolute top-0 left-0 z-1 mix-blend-color-burn">
                <img src={imgDecor} alt="bg-banner" />
            </div>
            <div className="absolute bottom-0 right-0 translate-x-[20%] translate-y-[50%] z-1">
                <img src={imgSketch} alt="bg-banner" />
            </div>
            <Container className="flex flex-col items-center gap-[24px] lg:gap-[32px] pb-[48px] lg:pb-[60px] pt-[10px] relative z-10 max-w-[1288px]">
                <h2 className="font-stamp font-normal tracking-brand text-[28px] leading-[32px] lg:text-[44px] lg:leading-[48px] text-taiky-orange uppercase text-center">
                    {heading}
                </h2>

                {/* Mobile / tablet: category dropdown */}
                <div className="relative w-full max-w-[320px] lg:hidden">
                    <button
                        type="button"
                        onClick={() => setDdOpen((o) => !o)}
                        aria-expanded={ddOpen}
                        className="flex w-full items-center justify-between border-b border-taiky-lightbrown/40 pb-[10px] font-bold text-[18px] uppercase text-taiky-brown"
                    >
                        {activeLabel}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            className={`text-taiky-orange transition-transform ${ddOpen ? 'rotate-180' : ''}`}
                        >
                            <path
                                d="M6 9l6 6 6-6"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    {ddOpen && (
                        <ul className="absolute left-0 right-0 z-20 mt-[6px] max-h-[280px] overflow-auto rounded-[8px] bg-taiky-bg shadow-card-hover">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => selectCategory('')}
                                    className={`block w-full px-[16px] py-[10px] text-left text-[15px] font-bold uppercase transition-colors ${
                                        activeCategory === ''
                                            ? 'text-taiky-orange'
                                            : 'text-taiky-brown hover:text-taiky-orange'
                                    }`}
                                >
                                    Tất cả
                                </button>
                            </li>
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <button
                                        type="button"
                                        onClick={() => selectCategory(category.id)}
                                        className={`block w-full px-[16px] py-[10px] text-left text-[15px] font-bold uppercase transition-colors ${
                                            category.id === activeCategory
                                                ? 'text-taiky-orange'
                                                : 'text-taiky-brown hover:text-taiky-orange'
                                        }`}
                                    >
                                        {t(category.name)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Desktop: category tabs */}
                <div className="hidden lg:flex w-fit items-center justify-center gap-[48px] border-b border-taiky-lightbrown/40">
                    <button
                        type="button"
                        onClick={() => selectCategory('')}
                        className={tabClass(activeCategory === '')}
                    >
                        Tất cả
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => selectCategory(category.id)}
                            className={tabClass(category.id === activeCategory)}
                        >
                            {t(category.name)}
                        </button>
                    ))}
                </div>

                {/* Product grid */}
                {isLoading ? (
                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[24px] gap-y-[40px]">
                        {Array.from({ length: PER_PAGE }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        <ListState
                            error={isError}
                            empty={products.length === 0}
                            onRetry={() => refetch()}
                            emptyText="Chưa có sản phẩm cho thương hiệu này."
                        />
                        {products.length > 0 && (
                            <RevealStagger className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[24px] gap-y-[40px]">
                                {products.map((p) => {
                                    const card = toProductCard(p);
                                    return <ProductItem key={card.id} {...card} />;
                                })}
                            </RevealStagger>
                        )}
                    </>
                )}

                <Pagination
                    className="mt-[8px]"
                    page={page}
                    pageCount={pageCount}
                    onPageChange={setPage}
                />
            </Container>
        </section>
    );
}
