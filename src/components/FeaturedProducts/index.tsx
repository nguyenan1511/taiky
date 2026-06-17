import Container from '../Container';
import ProductItem from '../ProductItem';
import ProductCardSkeleton from '../ProductItem/Skeleton';
import ListState from '../ListState';
import { useFeaturedProducts, usePage } from '../../lib/api/queries';
import { toProductCard } from '../../lib/api/helpers';
import { PAGE, pageSection } from '../../lib/api/pages';

/**
 * "SẢN PHẨM NỔI BẬT" — featured products: intro copy, a row of 4 product cards
 * and a "XEM TẤT CẢ" CTA. Cards use the shared ProductItem component, fed by
 * `GET /products?isHighlight=true`.
 */

const imgBgFeaturedProducts = '/images/bg-prod-spec.jpg';

export default function FeaturedProducts() {
    const { data, isLoading, isError, refetch } = useFeaturedProducts(4);
    const products = data?.data ?? [];

    // PRODUCT page CMS section 2: heading + intro copy.
    const { data: page } = usePage(PAGE.PRODUCT);
    const s2 = pageSection(page?.data, '2');
    const heading = s2?.title || 'SẢN PHẨM NỔI BẬT';

    return (
        <section className="relative w-full bg-taiky-bg overflow-hidden">
            <div className="absolute top-0 left-0 z-1 w-full">
                <img src={imgBgFeaturedProducts} alt="bg-banner" className="w-full" />
            </div>
            <Container className="flex flex-col items-center gap-[20px] py-[40px] lg:py-[60px] relative z-10">
                <div className="flex flex-col items-center gap-[16px] lg:gap-[20px] text-center mb-[24px] lg:mb-[40px]">
                    <h2 className="font-stamp font-normal tracking-brand text-[28px] leading-[32px] lg:text-[44px] lg:leading-[48px] text-taiky-orange uppercase">
                        {heading}
                    </h2>
                    {s2?.content ? (
                        <div
                            className="max-w-[900px] text-[15px] leading-[24px] lg:text-[20px] lg:leading-[32px] text-taiky-lightbrown uppercase font-bold [&_b]:font-bold [&_b]:text-taiky-brown"
                            dangerouslySetInnerHTML={{ __html: s2.content }}
                        />
                    ) : (
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
                    )}
                </div>

                {isLoading ? (
                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        <ListState
                            error={isError}
                            empty={products.length === 0}
                            onRetry={() => refetch()}
                        />
                        {products.length > 0 && (
                            <div className="grid w-full animate-fade-rise grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                                {products.map((p) => {
                                    const card = toProductCard(p);
                                    return <ProductItem key={card.id} {...card} />;
                                })}
                            </div>
                        )}
                    </>
                )}

                <button
                    type="button"
                    className="mt-[12px] inline-flex items-center justify-center bg-taiky-yellow px-[48px] py-[14px]"
                >
                    <span className="font-bold text-[16px] leading-6 text-taiky-brown uppercase tracking-[0.04em]">
                        Xem tất cả
                    </span>
                </button>
            </Container>
        </section>
    );
}
