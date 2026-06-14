import Container from '../Container';

const imgBg = '/images/bg-food.png';

/**
 * Food page hero — full-width food banner (bg-food.png, 1440×590) with the
 * heading + tagline + CTA overlaid centred in the empty middle zone.
 */
export default function FoodHero() {
    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg pt-[120px]">
            <div className="relative w-full aspect-[1440/590]">
                <img src={imgBg} alt="" className="absolute inset-0 h-full w-full object-cover" />

                {/* Content — centred over the banner */}
                <div className="absolute inset-0">
                    <Container className="relative h-full">
                        <div className="absolute left-1/2 top-1/2 w-[820px] -translate-x-1/2 -translate-y-1/2 text-center">
                            <h1 className="font-stamp font-normal tracking-brand text-[48px] leading-[52px] text-taiky-orange uppercase">
                                Cùng Tài Ký khám phá mọi món ngon
                            </h1>
                            <p className="mt-[30px] font-semibold text-[20px] leading-[32px] text-taiky-lightbrown uppercase">
                                Khám phá{' '}
                                <span className="font-bold text-taiky-brown">
                                    nguồn nguyên liệu tự nhiên
                                </span>{' '}
                                được tuyển chọn, giúp bạn dễ dàng chế biến nên những{' '}
                                <span className="font-bold text-taiky-brown">
                                    món ngon đầy cảm hứng
                                </span>{' '}
                                mỗi ngày.
                            </p>
                            <button
                                type="button"
                                className="mt-[30px] inline-flex items-center justify-center bg-taiky-yellow px-[40px] py-[12px]"
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
