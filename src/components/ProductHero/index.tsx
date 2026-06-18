import Container from '../Container';
import BannerImage from '../BannerImage';
import { usePage } from '../../lib/api/queries';
import { PAGE, pageSection } from '../../lib/api/pages';
import { useReady } from '../../context/ready';

const imgBg = '/images/bg-product.jpg';

/**
 * Product page hero — full-width banner with heading + tagline + CTA overlaid.
 * Banner image / title / tagline come from `GET /pages/PRODUCT` (section 1),
 * with the local asset + copy as fallback. On load (after the preloader) the
 * image fades out of a slight zoom and the text staggers in.
 */
export default function ProductHero() {
    const ready = useReady();
    const { data } = usePage(PAGE.PRODUCT);
    const s1 = pageSection(data?.data, '1');
    const hasBanner = Boolean(s1?.image || s1?.imageMb);
    const title = s1?.title || 'SẢN PHẨM';

    const imageClass = `absolute inset-0 h-full w-full object-cover ${
        ready ? 'animate-hero-zoom' : 'opacity-0'
    }`;
    // Staggered text reveal: each line rises a beat after the previous.
    const riseClass = ready ? 'animate-hero-rise' : 'opacity-0';
    const riseStyle = (delay: string) => (ready ? { animationDelay: delay } : undefined);

    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg pt-[80px] lg:pt-[120px]">
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[1440/590]">
                {hasBanner ? (
                    <BannerImage
                        image={s1?.image}
                        imageMb={s1?.imageMb}
                        alt={title}
                        className={imageClass}
                    />
                ) : (
                    <img src={imgBg} alt="" className={imageClass} />
                )}

                {/* Content — sits in the empty centre zone of the banner */}
                <div className="absolute inset-0">
                    <Container className="relative h-full">
                        <div className="absolute left-1/2 top-1/2 w-[88%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 text-center">
                            <h1
                                style={riseStyle('0.1s')}
                                className={`font-stamp font-normal tracking-brand text-[32px] leading-[36px] lg:text-[48px] lg:leading-[52px] text-taiky-orange uppercase ${riseClass}`}
                            >
                                {title}
                            </h1>
                            {s1?.content ? (
                                <div
                                    style={riseStyle('0.24s')}
                                    className={`mt-[12px] lg:mt-[16px] font-semibold text-[15px] leading-[24px] lg:text-[20px] lg:leading-[32px] text-taiky-lightbrown uppercase [&_b]:font-bold [&_b]:text-taiky-brown ${riseClass}`}
                                    dangerouslySetInnerHTML={{ __html: s1.content }}
                                />
                            ) : (
                                <p
                                    style={riseStyle('0.24s')}
                                    className={`mt-[12px] lg:mt-[16px] font-semibold text-[15px] leading-[24px] lg:text-[20px] lg:leading-[32px] text-taiky-lightbrown uppercase ${riseClass}`}
                                >
                                    Tài Ký là{' '}
                                    <span className="font-bold text-taiky-brown">chính mình</span>,
                                    sản phẩm là{' '}
                                    <span className="font-bold text-taiky-brown">hoàn hảo</span>,
                                    khách hàng là{' '}
                                    <span className="font-bold text-taiky-brown">thượng đế</span>
                                </p>
                            )}
                            <a
                                href={s1?.link || '#'}
                                style={riseStyle('0.38s')}
                                className={`mt-[20px] lg:mt-[28px] inline-flex items-center justify-center bg-taiky-yellow px-[32px] lg:px-[40px] py-[10px] lg:py-[12px] ${riseClass}`}
                            >
                                <span className="font-bold text-[14px] lg:text-[16px] leading-6 text-taiky-brown uppercase">
                                    Xem chi tiết
                                </span>
                            </a>
                        </div>
                    </Container>
                </div>
            </div>
        </section>
    );
}
