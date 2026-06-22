import Container from '../Container';
import BannerImage from '../BannerImage';
import { useReady } from '../../context/ready';
import { usePage } from '../../lib/api/queries';
import { PAGE, pageSection } from '../../lib/api/pages';

// Product bags (fallback composition when the CMS banner image is absent)
const imgBagLeft = '/images/hero-bag-left.webp';
const imgBagRight = '/images/hero-bag-right.webp';
const imgBagFront = '/images/hero-bag-front.webp';
const imgBgBanner = '/images/bg-hero.webp';
const imgSketch = '/images/hero-sketch.webp';
const imgBgBannerMb = '/images/bg-baner-mb.webp';

const FALLBACK_DESC =
    'Dòng sản phẩm Taky hoàn hảo về chất lượng và đột phá trong từng thiết kế bao bì mới. Mỗi tuyệt phẩm đến từ nhãn hàng Taky đều là một sản phẩm quan trọng trong danh mục sản phẩm được ưa thích nhất. Xứng đáng trở thành chuyên gia bột thực phẩm hàng đầu tại Việt Nam.';

export default function Hero() {
    // Hold the entrance until the preloader lifts, then play it.
    const ready = useReady();

    // Banner content from GET /pages/HOME (section 1), with local fallback.
    const { data } = usePage(PAGE.HOME);
    const s1 = pageSection(data?.data, '1');
    const title = s1?.title || 'Đậm chất bản Việt';
    const product = s1?.product || 'Bánh TAKY';
    const description = s1?.description || FALLBACK_DESC;
    const link = s1?.linkProduct || '#';
    const hasBanner = Boolean(s1?.image || s1?.imageMb);

    return (
        <section className="relative w-full pt-[96px] lg:pt-[120px] lg:min-h-[710px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 w-[55%] max-w-[340px] lg:w-auto lg:max-w-none hidden lg:block">
                <img src={imgBgBanner} alt="bg-banner" className="w-full lg:w-auto" />
            </div>
            <div className="absolute top-0 right-0 block lg:hidden">
                <img src={imgBgBannerMb} alt="bg-banner" className="w-full lg:w-auto" />
            </div>
            {/* Sketch overlay — spans hero→products */}
            <div
                aria-hidden="true"
                className="absolute pointer-events-none mix-blend-color-burn opacity-20 z-[1] right-0 bottom-0 translate-y-[50%] hidden lg:block"
            >
                <img src={imgSketch} alt="" />
            </div>
            <Container className="w-full z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-2 w-full items-center gap-[28px] lg:gap-[97px]">
                    <div
                        className={`order-2 lg:order-none flex flex-col gap-[32px] lg:gap-[64px] items-center ${
                            ready ? 'animate-enter-left' : 'opacity-0'
                        }`}
                    >
                        <div className="flex flex-col gap-[24px] lg:gap-[32px] items-center w-full">
                            <div className="flex flex-col gap-[10px] lg:gap-[12px] items-center">
                                <h1 className="font-stamp font-normal text-[32px] leading-[34px] lg:text-[48px] lg:leading-[48px] text-taiky-orange uppercase text-center lg:whitespace-nowrap">
                                    {title}
                                </h1>
                                <p className="font-bold text-[26px] leading-[28px] lg:text-[40px] lg:leading-[40px] text-taiky-brown text-center lg:whitespace-nowrap">
                                    {product}
                                </p>
                            </div>
                            <p className="font-normal text-[15px] leading-[23px] lg:text-[16px] lg:leading-[24px] text-taiky-darkbrown text-center [word-break:break-word] w-full max-w-[466px] lg:w-[466px]">
                                {description}
                            </p>
                        </div>

                        <a
                            href={link}
                            className="flex items-center justify-center px-[40px] py-[12px] drop-shadow-[2px_4px_2px_rgba(0,0,0,0.5)] btn-cta bg-taiky-yellow"
                        >
                            <span className="font-bold text-taiky-brown text-[16px] leading-6 whitespace-nowrap [word-break:break-word]">
                                XEM CHI TIẾT
                            </span>
                        </a>
                    </div>

                    {/* Banner: CMS image when present, else the layered bag composition */}
                    <div
                        className={`order-1 lg:order-none relative flex w-full max-w-[420px] mx-auto lg:max-w-none lg:mx-0 ${
                            ready ? 'animate-enter-right' : 'opacity-0'
                        }`}
                    >
                        {hasBanner ? (
                            <BannerImage
                                image={s1?.image}
                                imageMb={s1?.imageMb}
                                alt={product}
                                className="w-full h-auto"
                            />
                        ) : (
                            <>
                                <img
                                    src={imgBagLeft}
                                    alt="Bánh Taky"
                                    className="w-full h-auto lg:w-auto"
                                />
                                <img
                                    src={imgBagRight}
                                    alt="Bánh Taky"
                                    className="absolute top-0 left-0 w-full h-auto lg:w-auto"
                                />
                                <img
                                    src={imgBagFront}
                                    alt="Bánh Taky"
                                    className="absolute top-0 left-0 w-full h-auto lg:w-auto"
                                />
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}
