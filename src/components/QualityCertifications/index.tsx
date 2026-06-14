import Container from '../Container';

/**
 * "CHỨNG NHẬN CHẤT LƯỢNG" — quality-certification badges
 * (FDA · HALAL · ISO 22000 · HACCP · Hàng Việt Nam chất lượng cao).
 */

const CERTIFICATIONS = [
    { src: '/images/cer-1.png', alt: 'FDA Approved' },
    { src: '/images/cer-2.png', alt: 'HALAL' },
    { src: '/images/cer-3.png', alt: 'ISO 22000' },
    { src: '/images/cer-4.png', alt: 'HACCP Certified' },
    { src: '/images/cer-5.png', alt: 'Hàng Việt Nam chất lượng cao' },
];

export default function QualityCertifications() {
    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <Container className="flex flex-col items-center gap-[28px] py-[60px]">
                <h2 className="font-stamp font-normal tracking-brand text-[44px] leading-[48px] text-taiky-orange uppercase text-center">
                    CHỨNG NHẬN CHẤT LƯỢNG
                </h2>

                <p className="max-w-[1140px] text-center font-sans text-[18px] leading-[28px] tracking-[0.04em] text-taiky-lightbrown uppercase font-bold">
                    Cam kết <span className="font-bold text-taiky-brown">chất lượng cao</span>,
                    nguồn nguyên liệu <span className="font-bold text-taiky-brown">minh bạch</span>,{' '}
                    <span className="font-bold text-taiky-brown">an toàn</span> cho sức khỏe người
                    tiêu dùng.
                </p>

                <ul className="mt-[20px] flex w-full flex-wrap items-center justify-center gap-x-[56px] gap-y-[32px]">
                    {CERTIFICATIONS.map(({ src, alt }) => (
                        <li key={src}>
                            <img
                                src={src}
                                alt={alt}
                                width={230}
                                height={230}
                                loading="lazy"
                                className="block h-[150px] w-[150px] object-contain"
                            />
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
