import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../../components/Container';
import ProductItem from '../../components/ProductItem';
import Reveal from '../../components/Reveal';
import RevealStagger from '../../components/RevealStagger';
import ListState from '../../components/ListState';
import Skeleton from '../../components/Skeleton';
import { useProductDetail, useProducts } from '../../lib/api/queries';
import { img, t, toProductCard } from '../../lib/api/helpers';
import { useReady } from '../../context/ready';
import { useDocumentMeta } from '../../hooks/usePageMeta';

/**
 * Product detail page (`/products/:slug`) — image gallery + info (specs, shop
 * links), a nutrition table beside the HTML description, and a "SẢN PHẨM LIÊN
 * QUAN" related grid.
 */

const PROSE =
    'text-left [&_p]:mb-[14px] [&_p]:text-[14px] [&_p]:leading-[24px] [&_p]:text-taiky-darkbrown ' +
    '[&_h2]:mt-[20px] [&_h2]:mb-[10px] [&_h2]:font-bold [&_h2]:text-[18px] [&_h2]:text-taiky-brown ' +
    '[&_h3]:mt-[16px] [&_h3]:mb-[8px] [&_h3]:font-bold [&_h3]:text-taiky-brown ' +
    '[&_b]:text-taiky-brown [&_strong]:text-taiky-brown ' +
    '[&_ul]:my-[10px] [&_ul]:list-disc [&_ul]:pl-[22px] [&_li]:mb-[6px] [&_li]:text-taiky-darkbrown ' +
    '[&_img]:my-[16px] [&_img]:mx-auto [&_img]:rounded-[8px]';

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
        </svg>
    );
}

function TiktokIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.5 3c.4 2.3 1.8 3.9 4 4.2v3c-1.5.1-2.9-.3-4.2-1.1v5.8a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.1a2.7 2.7 0 1 0 1.9 2.6V3h3.1Z" />
        </svg>
    );
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
    return (
        <svg
            width="24"
            height="24"
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

export default function ProductDetail() {
    const ready = useReady();
    const { slug = '' } = useParams();
    const [active, setActive] = useState(0);
    // Direction of the last gallery change, so the new image slides in from
    // the side the user navigated toward (next ⇒ +1, prev ⇒ -1).
    const [dir, setDir] = useState<1 | -1>(1);

    const { data, isLoading, isError, refetch } = useProductDetail(slug);
    const product = data?.data;

    useDocumentMeta(
        {
            title: t(product?.metaTitle) || t(product?.name) || 'TAKYfood',
            description: t(product?.metaDescription) || t(product?.description),
            image: img(product?.metaImage) || img(product?.image),
        },
        Boolean(product)
    );

    // Related products (exclude the current one).
    const { data: relatedData } = useProducts({ limit: 8 });
    const related = (relatedData?.data ?? [])
        .filter((p) => p.id !== product?.id)
        .map(toProductCard)
        .slice(0, 4);

    if (isLoading) {
        return (
            <main className="relative pt-[100px] lg:pt-[140px]">
                <Container className="grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
                    <Skeleton className="aspect-square w-full rounded-[12px]" />
                    <div className="flex flex-col gap-[16px]">
                        <Skeleton className="h-[36px] w-[80%] rounded-[8px]" />
                        <Skeleton className="h-[16px] w-full rounded-[6px]" />
                        <Skeleton className="h-[16px] w-[90%] rounded-[6px]" />
                        <Skeleton className="mt-[20px] h-[48px] w-full rounded-[6px]" />
                    </div>
                </Container>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="relative pt-[120px] lg:pt-[160px] min-h-[60vh]">
                <Container>
                    <ListState
                        error={isError}
                        empty={!isError}
                        onRetry={() => refetch()}
                        emptyText="Không tìm thấy sản phẩm."
                    />
                </Container>
            </main>
        );
    }

    const gallery = [img(product.image), ...(product.galleries ?? [])].filter(Boolean);
    const mainImage = gallery[active] ?? gallery[0] ?? img(product.image);
    const step = (delta: 1 | -1) => {
        if (!gallery.length) return;
        setDir(delta);
        setActive((i) => (i + delta + gallery.length) % gallery.length);
    };
    const goTo = (i: number) => {
        setDir(i >= active ? 1 : -1);
        setActive(i);
    };

    const specs = [
        { label: 'Quy cách', value: product.specification },
        { label: 'Trọng lượng', value: product.weight },
        { label: 'Hạn sử dụng', value: product.expiry },
    ].filter((s) => s.value);

    return (
        <main className="relative bg-taiky-bg">
            {/* Top: gallery + info */}
            <section className="relative w-full pt-[96px] lg:pt-[140px]">
                <Container className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[56px] pb-[40px] lg:pb-[60px]">
                    {/* Gallery */}
                    <div className={ready ? 'animate-hero-rise' : 'opacity-0'}>
                        <div className="relative flex items-center gap-[8px] lg:gap-[16px]">
                            {gallery.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => step(-1)}
                                    aria-label="Ảnh trước"
                                    className="shrink-0 flex h-[44px] w-[44px] items-center justify-center rounded-full text-taiky-orange transition-transform duration-300 ease-brand hover:scale-110 hover:bg-taiky-orange/10 active:scale-90"
                                >
                                    <Chevron dir="left" />
                                </button>
                            )}
                            <div className="flex-1 overflow-hidden rounded-[12px]">
                                <img
                                    key={active}
                                    src={mainImage}
                                    alt={t(product.name)}
                                    className={`aspect-square w-full object-contain ${
                                        dir === 1
                                            ? 'animate-img-swap-next'
                                            : 'animate-img-swap-prev'
                                    }`}
                                />
                            </div>
                            {gallery.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => step(1)}
                                    aria-label="Ảnh sau"
                                    className="shrink-0 flex h-[44px] w-[44px] items-center justify-center rounded-full text-taiky-orange transition-transform duration-300 ease-brand hover:scale-110 hover:bg-taiky-orange/10 active:scale-90"
                                >
                                    <Chevron dir="right" />
                                </button>
                            )}
                        </div>

                        {gallery.length > 1 && (
                            <div className="mt-[16px] flex flex-wrap gap-[12px] pl-[32px] lg:pl-[40px]">
                                {gallery.map((src, i) => (
                                    <button
                                        key={src}
                                        type="button"
                                        onClick={() => goTo(i)}
                                        aria-label={`Ảnh ${i + 1}`}
                                        className={`h-[64px] w-[64px] overflow-hidden rounded-[8px] ring-2 ring-offset-2 ring-offset-taiky-bg transition-all duration-300 ease-brand ${
                                            i === active
                                                ? 'scale-105 ring-taiky-orange'
                                                : 'ring-transparent opacity-60 hover:scale-105 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={src}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div
                        className={`flex flex-col ${ready ? 'animate-hero-rise' : 'opacity-0'}`}
                        style={ready ? { animationDelay: '0.12s' } : undefined}
                    >
                        <h1 className="font-stamp font-normal tracking-brand text-[28px] leading-[34px] lg:text-[40px] lg:leading-[46px] text-taiky-orange uppercase">
                            {t(product.name)}
                        </h1>
                        <p className="mt-[16px] text-[15px] leading-[24px] text-taiky-darkbrown">
                            {t(product.description)}
                        </p>

                        {specs.length > 0 && (
                            <dl className="mt-[24px] flex flex-col gap-[12px] text-[15px]">
                                {specs.map((s) => (
                                    <div key={s.label} className="flex gap-[8px]">
                                        <dt className="font-bold text-taiky-brown">{s.label}:</dt>
                                        <dd className="font-bold text-taiky-orange">{s.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}

                        <div className="mt-[28px] grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                            <a
                                href={product.linkShoppe || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-[10px] bg-taiky-orange px-[24px] py-[14px] text-[15px] font-bold uppercase tracking-[0.04em] text-white"
                            >
                                Shopee <ShopeeIcon />
                            </a>
                            <a
                                href={product.linkTiktok || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-[10px] bg-taiky-orange px-[24px] py-[14px] text-[15px] font-bold uppercase tracking-[0.04em] text-white"
                            >
                                TiktokShop <TiktokIcon />
                            </a>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Nutrition + description */}
            <section className="relative w-full bg-taiky-cream">
                <Container className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[32px] lg:gap-[48px] py-[40px] lg:py-[60px]">
                    {product.nutrition?.ingredients?.length ? (
                        <Reveal>
                            <div className="bg-taiky-orange text-white rounded-[8px] px-[28px] py-[28px]">
                                <h3 className="font-bold text-[22px] leading-[28px]">
                                    {product.nutrition.title}
                                </h3>
                                <div className="mt-[16px]">
                                    {product.nutrition.ingredients.map((row) => (
                                        <div
                                            key={row.label}
                                            className="flex items-center justify-between border-b border-white/25 py-[14px] text-[15px]"
                                        >
                                            <span>{row.label}</span>
                                            <span className="font-bold">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ) : (
                        <div />
                    )}

                    <Reveal>
                        <h2 className="font-stamp font-normal tracking-brand text-[24px] leading-[30px] lg:text-[30px] lg:leading-[36px] text-taiky-orange uppercase">
                            Mô tả sản phẩm
                        </h2>
                        {product.content && t(product.content) ? (
                            <div
                                className={`mt-[16px] ${PROSE}`}
                                dangerouslySetInnerHTML={{ __html: t(product.content) }}
                            />
                        ) : (
                            <p className="mt-[16px] text-[14px] leading-[24px] text-taiky-darkbrown">
                                {t(product.description)}
                            </p>
                        )}
                    </Reveal>
                </Container>
            </section>

            {/* Related products */}
            {related.length > 0 && (
                <section className="relative w-full overflow-hidden bg-taiky-bg">
                    <Container className="flex flex-col items-center gap-[20px] py-[40px] lg:py-[60px]">
                        <Reveal className="flex flex-col items-center gap-[16px] lg:gap-[20px] text-center">
                            <h2 className="font-stamp font-normal tracking-brand text-[28px] leading-[34px] lg:text-[44px] lg:leading-[48px] text-taiky-orange uppercase">
                                Sản phẩm liên quan
                            </h2>
                            <p className="max-w-[900px] text-[15px] leading-[24px] lg:text-[20px] lg:leading-[32px] text-taiky-lightbrown uppercase font-bold">
                                Khám phá{' '}
                                <span className="font-bold text-taiky-brown">
                                    nguồn nguyên liệu tự nhiên
                                </span>{' '}
                                được tuyển chọn,
                                <br />
                                giúp bạn dễ dàng chế biến nên những{' '}
                                <span className="font-bold text-taiky-brown">
                                    món ngon đầy cảm hứng
                                </span>{' '}
                                mỗi ngày.
                            </p>
                        </Reveal>
                        <RevealStagger className="mt-[12px] grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                            {related.map((card) => (
                                <ProductItem key={card.id} {...card} />
                            ))}
                        </RevealStagger>
                        <Link
                            to="/products"
                            className="mt-[20px] inline-flex items-center justify-center btn-cta bg-taiky-yellow px-[40px] py-[12px] text-[14px] font-bold uppercase tracking-[0.04em] text-taiky-brown"
                        >
                            Xem thêm
                        </Link>
                    </Container>
                </section>
            )}
        </main>
    );
}
