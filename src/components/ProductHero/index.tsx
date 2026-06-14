import Container from '../Container';

const imgBg = '/images/bg-product.jpg';

/**
 * Product page hero — full-width wood-table banner (bg-product.jpg, 1440×590)
 * with the heading + tagline + CTA overlaid in the empty centre zone.
 */
export default function ProductHero() {
    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg pt-[120px]">
            <div className="relative w-full aspect-[1440/590]">
                <img src={imgBg} alt="" className="absolute inset-0 h-full w-full object-cover" />

                {/* Content — sits in the empty centre-left zone of the banner */}
                <div className="absolute inset-0">
                    <Container className="relative h-full">
                        <div className="absolute left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 text-center">
                            <h1 className="font-stamp font-normal tracking-brand text-[48px] leading-[52px] text-taiky-orange uppercase">
                                SẢN PHẨM
                            </h1>
                            <p className="mt-[16px] font-semibold text-[20px] leading-[32px] text-taiky-lightbrown uppercase">
                                Tài Ký là{' '}
                                <span className="font-bold text-taiky-brown">chính mình</span>, sản
                                phẩm là <span className="font-bold text-taiky-brown">hoàn hảo</span>
                                , khách hàng là{' '}
                                <span className="font-bold text-taiky-brown">thượng đế</span>
                            </p>
                            <button
                                type="button"
                                className="mt-[28px] inline-flex items-center justify-center bg-taiky-yellow px-[40px] py-[12px]"
                            >
                                <span className="font-bold text-[16px] leading-6 text-taiky-brown uppercase">
                                    Xem chi tiết
                                </span>
                            </button>
                        </div>
                    </Container>
                </div>
            </div>
        </section>
    );
}
