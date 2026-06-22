import Container from '../Container';
import RevealStagger from '../RevealStagger';
import { usePage } from '../../lib/api/queries';
import { PAGE, pageSection } from '../../lib/api/pages';

/**
 * "CHỨNG NHẬN CHẤT LƯỢNG" — quality-certification badges
 * (FDA · HALAL · ISO 22000 · HACCP · Hàng Việt Nam chất lượng cao).
 */

const CERTIFICATIONS = [
    { src: '/images/cer-1.webp', alt: 'FDA Approved' },
    { src: '/images/cer-2.webp', alt: 'HALAL' },
    { src: '/images/cer-3.webp', alt: 'ISO 22000' },
    { src: '/images/cer-4.webp', alt: 'HACCP Certified' },
    { src: '/images/cer-5.webp', alt: 'Hàng Việt Nam chất lượng cao' },
];

export default function QualityCertifications() {
    // ABOUT-US page CMS section 5: heading + intro copy.
    const { data } = usePage(PAGE.ABOUT_US);
    const s5 = pageSection(data?.data, '5');
    const heading = s5?.title || 'CHỨNG NHẬN CHẤT LƯỢNG';

    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <Container className="flex flex-col items-center gap-[24px] lg:gap-[28px] py-[48px] lg:py-[60px]">
                <h2 className="font-stamp font-normal tracking-brand text-[28px] leading-[32px] lg:text-[44px] lg:leading-[48px] text-taiky-orange uppercase text-center">
                    {heading}
                </h2>

                {s5?.content ? (
                    <div
                        className="max-w-[1140px] text-center font-sans text-[15px] leading-[24px] lg:text-[18px] lg:leading-[28px] tracking-[0.04em] text-taiky-lightbrown uppercase font-bold [&_b]:font-bold [&_b]:text-taiky-brown"
                        dangerouslySetInnerHTML={{ __html: s5.content }}
                    />
                ) : (
                    <p className="max-w-[1140px] text-center font-sans text-[15px] leading-[24px] lg:text-[18px] lg:leading-[28px] tracking-[0.04em] text-taiky-lightbrown uppercase font-bold">
                        Cam kết <span className="font-bold text-taiky-brown">chất lượng cao</span>,
                        nguồn nguyên liệu{' '}
                        <span className="font-bold text-taiky-brown">minh bạch</span>,{' '}
                        <span className="font-bold text-taiky-brown">an toàn</span> cho sức khỏe
                        người tiêu dùng.
                    </p>
                )}

                <RevealStagger
                    step={80}
                    className="mt-[12px] lg:mt-[20px] flex w-full flex-wrap items-center justify-center gap-x-[28px] gap-y-[24px] lg:gap-x-[56px] lg:gap-y-[32px]"
                >
                    {CERTIFICATIONS.map(({ src, alt }) => (
                        <img
                            key={src}
                            src={src}
                            alt={alt}
                            width={230}
                            height={230}
                            loading="lazy"
                            className="block h-[100px] w-[100px] lg:h-[150px] lg:w-[150px] object-contain"
                        />
                    ))}
                </RevealStagger>
            </Container>
        </section>
    );
}
