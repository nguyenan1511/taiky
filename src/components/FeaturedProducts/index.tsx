import Container from '../Container';
import ProductItem, { type Product } from '../ProductItem';

/**
 * "SẢN PHẨM NỔI BẬT" — featured products: intro copy, a row of 4 product cards
 * and a "XEM TẤT CẢ" CTA. Cards use the shared ProductItem component.
 */

// Fake data — replace with real product feed later.
const FEATURED: Product[] = [
    { name: 'Bột Chiên Giòn TakyGion', weight: 'Dạng túi 150g', image: '/images/prod-1.png' },
    { name: 'Bột Chiên Tẩm Khô TakyGion', weight: 'Dạng túi 600g', image: '/images/prod-2.png' },
    { name: 'Bột Nếp', weight: 'Dạng túi 600g', image: '/images/prod-3.png' },
    { name: 'Bột Mỳ Số 8', weight: 'Dạng túi 600g', image: '/images/prod-4.jpg' },
];

const imgBgFeaturedProducts = '/images/bg-prod-spec.jpg';

export default function FeaturedProducts() {
    return (
        <section className="relative w-full bg-taiky-bg overflow-hidden">
            <div className="absolute top-0 left-0 z-1 w-full">
                <img src={imgBgFeaturedProducts} alt="bg-banner" className="w-full" />
            </div>
            <Container className="flex flex-col items-center gap-[20px] py-[60px] relative z-10">
                <div className="flex flex-col items-center gap-[20px] text-center mb-[40px]">
                    <h2 className="font-stamp font-normal tracking-brand text-[44px] leading-[48px] text-taiky-orange uppercase">
                        SẢN PHẨM NỔI BẬT
                    </h2>
                    <p className="max-w-[900px] text-[20px] leading-[32px] text-taiky-lightbrown uppercase font-bold">
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
                </div>

                <div className="grid w-full grid-cols-4 gap-[24px]">
                    {FEATURED.map((product) => (
                        <ProductItem key={product.name} {...product} />
                    ))}
                </div>

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
