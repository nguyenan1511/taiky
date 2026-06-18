import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import BannerImage from '../BannerImage';
import { useBanners } from '../../lib/api/queries';
import { img, t } from '../../lib/api/helpers';
import { PAGE } from '../../lib/api/pages';
import { useReady } from '../../context/ready';

/**
 * Event/News hero — full-bleed image carousel (Swiper, fade + autoplay) driven
 * by `GET /banners` filtered to the NEWS page (image + headline caption), with
 * themed pagination bullets. Falls back to the built-in slides while loading.
 */

type Slide = { id: string; image: string; imageMb: string; title: string };

// Fallback slides shown until the news feed resolves (or if it's empty).
const FALLBACK_SLIDES: Slide[] = [
    {
        id: 'fallback-1',
        image: '/images/bg-video.png',
        imageMb: '/images/bg-video.png',
        title: 'TAKYFOOD TẠI VIETNAM FOODEXPO - TRIỂN LÃM QUỐC TẾ LỚN NHẤT NGÀNH CÔNG NGHIỆP THỰC PHẨM VIỆT NAM 2026',
    },
    {
        id: 'fallback-2',
        image: '/images/bg-product.jpg',
        imageMb: '/images/bg-product.jpg',
        title: 'TAKYFOOD RA MẮT BỘ SƯU TẬP BỘT THỰC PHẨM MỚI - ĐẬM CHẤT BẢN VIỆT 2026',
    },
];

export default function EventHero() {
    const { data } = useBanners();
    const apiSlides: Slide[] = (data?.data ?? [])
        .filter((b) => b.page === PAGE.NEWS && b.active !== false)
        .sort((a, b) => a.sort - b.sort)
        .map((b) => ({
            id: b.id,
            image: img(b.image),
            imageMb: img(b.imageMb) || img(b.image),
            title: t(b.title),
        }));
    const slides = apiSlides.length > 0 ? apiSlides : FALLBACK_SLIDES;
    const ready = useReady();

    return (
        <section className="relative w-full overflow-hidden pt-[80px] lg:pt-[120px]">
            <Swiper
                key={slides.map((s) => s.id).join('|')}
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={800}
                loop={slides.length > 1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className={`event-hero-swiper w-full ${ready ? 'is-ready' : ''}`}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[1440/620] w-full">
                            <BannerImage
                                image={slide.image}
                                imageMb={slide.imageMb}
                                alt={slide.title}
                                className="hero-banner-img absolute inset-0 h-full w-full object-cover"
                            />
                            {/* Caption */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pb-[44px] pt-[48px] lg:pb-[64px] lg:pt-[80px]">
                                <p className="hero-banner-caption mx-auto max-w-[1100px] px-[20px] lg:px-[40px] text-center text-[18px] leading-[24px] lg:text-[30px] lg:leading-[42px] font-bold uppercase text-white">
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
