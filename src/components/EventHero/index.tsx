import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

/**
 * Event/News hero — full-bleed image carousel (Swiper, fade + autoplay) with a
 * dark caption bar (headline) and themed pagination bullets.
 */

type Slide = { image: string; title: string };

// Mock data — replace with a real event/news feed later.
const SLIDES: Slide[] = [
    {
        image: '/images/bg-video.png',
        title: 'TAKYFOOD TẠI VIETNAM FOODEXPO - TRIỂN LÃM QUỐC TẾ LỚN NHẤT NGÀNH CÔNG NGHIỆP THỰC PHẨM VIỆT NAM 2026',
    },
    {
        image: '/images/bg-product.jpg',
        title: 'TAKYFOOD RA MẮT BỘ SƯU TẬP BỘT THỰC PHẨM MỚI - ĐẬM CHẤT BẢN VIỆT 2026',
    },
];

export default function EventHero() {
    return (
        <section className="relative w-full overflow-hidden pt-[80px] lg:pt-[120px]">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={800}
                loop
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="event-hero-swiper w-full"
            >
                {SLIDES.map((slide) => (
                    <SwiperSlide key={slide.title}>
                        <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[1440/620] w-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* Caption */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pb-[44px] pt-[48px] lg:pb-[64px] lg:pt-[80px]">
                                <p className="mx-auto max-w-[1100px] px-[20px] lg:px-[40px] text-center text-[18px] leading-[24px] lg:text-[30px] lg:leading-[42px] font-bold uppercase text-white">
                                    {slide.title}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
