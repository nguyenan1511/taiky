import { useState } from 'react';
import Container from '../Container';
import ProductItem, { type Product } from '../ProductItem';
import Pagination from '../Pagination';

/**
 * "DANH MỤC SẢN PHẨM" — product catalog: brand tabs, a product grid and
 * pagination. Cards use the shared ProductItem component with fake data.
 */

const BRANDS = ['TAKYFOOD', 'SƯ TỬ BAY', 'TAKYGION', 'LIV', 'SENTA', 'TIKTA', 'VIILAN'];

// Fake data — replace with a real per-brand product feed later.
const PRODUCTS: Product[] = [
    { name: 'Bột Chiên Tẩm Khô TakyGion', weight: 'Dạng túi 600g', image: '/images/prod-2.png' },
    { name: 'Bột Chiên Giòn TakyGion', weight: 'Dạng túi 150g', image: '/images/prod-1.png' },
    { name: 'Bột Bánh Cuốn', weight: 'Dạng túi 400g', image: '/images/prod-3.png' },
    { name: 'Bột Bánh Xèo Vàng', weight: 'Dạng túi 400g', image: '/images/prod-4.jpg' },
    { name: 'Bột Bánh Xèo Xanh', weight: 'Dạng túi 400g', image: '/images/prod-1.png' },
    { name: 'Bột Chiên Giòn Đỏ', weight: 'Dạng túi 1kg', image: '/images/prod-2.png' },
    { name: 'Bột Béo Đỏ', weight: 'Dạng túi 150g', image: '/images/prod-3.png' },
    { name: 'Bột Bánh Da Lợn', weight: 'Dạng túi 600g', image: '/images/prod-4.jpg' },
];

const imgDecor = '/images/decor-timeline-1.png';
const imgSketch = '/images/decor-bottom-catalog.jpg';

export default function ProductCatalog() {
    const [activeBrand, setActiveBrand] = useState(BRANDS[0]);

    return (
        <section className="relative w-full  bg-taiky-bg z-10">
            <div className="absolute top-0 left-0 z-1 mix-blend-color-burn">
                <img src={imgDecor} alt="bg-banner" />
            </div>
            <div className="absolute bottom-0 right-0 translate-x-[20%] translate-y-[50%] z-1">
                <img src={imgSketch} alt="bg-banner" />
            </div>
            <Container className="flex flex-col items-center gap-[32px] pb-[60px] pt-[10px] relative z-10 max-w-[1288px]">
                <h2 className="font-stamp font-normal tracking-brand text-[44px] leading-[48px] text-taiky-orange uppercase text-center">
                    DANH MỤC SẢN PHẨM
                </h2>

                {/* Brand tabs */}
                <div className="flex w-fit items-center justify-center gap-[48px] border-b border-taiky-lightbrown/40">
                    {BRANDS.map((brand) => {
                        const active = brand === activeBrand;
                        return (
                            <button
                                key={brand}
                                type="button"
                                onClick={() => setActiveBrand(brand)}
                                className={`-mb-[1px] border-b-2 pb-[14px] text-[16px] font-bold uppercase tracking-[0.04em] transition-colors ${
                                    active
                                        ? 'border-taiky-orange text-taiky-orange'
                                        : 'border-transparent text-taiky-brown hover:text-taiky-orange'
                                }`}
                            >
                                {brand}
                            </button>
                        );
                    })}
                </div>

                {/* Product grid */}
                <div className="grid w-full grid-cols-4 gap-x-[24px] gap-y-[40px]">
                    {PRODUCTS.map((product, i) => (
                        <ProductItem key={`${product.name}-${i}`} {...product} />
                    ))}
                </div>

                <Pagination className="mt-[8px]" />
            </Container>
        </section>
    );
}
