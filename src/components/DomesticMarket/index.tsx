import Container from '../Container';

/**
 * "THỊ TRƯỜNG NỘI ĐỊA" — domestic distribution: intro copy + a centered grid
 * of retailer partner logos (6 per row; the final short row auto-centers).
 */

// brand-1 … brand-15, in display order (matches the Figma sequence).
const BRAND_LOGOS = Array.from({ length: 15 }, (_, i) => `/images/brand-${i + 1}.png`);

const imgSketch = '/images/hero-sketch.png';
const imgDecor = '/images/decor-products.png';

export default function DomesticMarket() {
    return (
        <section className="relative w-full overflow-visible bg-taiky-bg pt-[120px]">
            <div className="absolute top-[200px] right-0 mix-blend-color-burn opacity-20">
                <img src={imgSketch} alt="bg-banner" />
            </div>
            <div className="absolute bottom-[-200px] left-0">
                <img src={imgDecor} alt="bg-banner" />
            </div>
            <Container className="flex flex-col items-center gap-[24px] py-[40px] relative z-10">
                <h2 className="font-stamp font-normal tracking-brand text-[36px] leading-[44px] text-taiky-orange uppercase text-center">
                    THỊ TRƯỜNG NỘI ĐỊA
                </h2>
                <p className="text-[18px] leading-[26px] tracking-[0.04em] text-taiky-lightbrown uppercase">
                    Bột thực phẩm từ nguồn{' '}
                    <span className="font-bold text-taiky-brown">nông sản tự nhiên</span> vì sức
                    khỏe cộng đồng.
                </p>

                {/* Rows 1-2: 6 logos each. Row 3: the remaining 3, centered. */}
                <div className="mt-[24px] grid w-full grid-cols-6 place-items-center gap-x-[40px] gap-y-[10px]">
                    {BRAND_LOGOS.slice(0, 12).map((src) => (
                        <div
                            className="bg-taiky-bg w-[197px] h-[140px] flex justify-center items-center"
                            key={src}
                        >
                            <img src={src} alt="" loading="lazy" />
                        </div>
                    ))}
                </div>
                <div className="mt-[18px] flex items-center justify-center gap-x-[40px]">
                    {BRAND_LOGOS.slice(12).map((src) => (
                        <div
                            className="bg-taiky-bg w-[197px] h-[140px] flex justify-center items-center"
                            key={src}
                        >
                            <img src={src} alt="" loading="lazy" />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
