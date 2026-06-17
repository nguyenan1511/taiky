import Container from '../Container';
import { usePage } from '../../lib/api/queries';
import { PAGE, pageSection, type PageCode } from '../../lib/api/pages';

const imgBgPhoto = '/images/commitment-bg.png';

type CommitmentProps = {
    /** Which CMS page + section holds this page's commitment block. */
    pageCode?: PageCode;
    sectionId?: string;
};

export default function Commitment({ pageCode = PAGE.HOME, sectionId = '6' }: CommitmentProps) {
    // Commitment statement comes from the given page's CMS section.
    const { data } = usePage(pageCode);
    const s6 = pageSection(data?.data, sectionId);
    const heading = s6?.title || 'CAM KẾT CỦA TÀI KÝ';

    return (
        <section className="relative w-full overflow-hidden bg-taiky-cream mb-[-80px] lg:mb-[-200px]">
            {/* Light warm scrim — keeps the flour photo sharp (Figma) while giving the heading legible contrast at the top */}
            <div className="absolute inset-0 bg-gradient-to-b from-taiky-bg via-taiky-bg/40 to-transparent" />
            <Container className="relative z-10 h-full flex flex-col items-center justify-center gap-[24px] lg:gap-[32px] px-[20px] lg:px-[80px] space-y-3">
                <h2 className="font-stamp font-normal tracking-brand text-[28px] leading-[32px] lg:text-[48px] lg:leading-[48px] text-taiky-orange uppercase text-center">
                    {heading}
                </h2>
                {s6?.content ? (
                    <div
                        className="text-center font-sans text-[15px] leading-[24px] lg:text-[18px] lg:leading-[28px] tracking-[0.04em] text-taiky-lightbrown uppercase font-bold [&_b]:font-bold [&_b]:text-taiky-brown"
                        dangerouslySetInnerHTML={{ __html: s6.content }}
                    />
                ) : (
                    <p className="text-center font-sans text-[15px] leading-[24px] lg:text-[18px] lg:leading-[28px] tracking-[0.04em] text-taiky-lightbrown uppercase font-bold">
                        BỘT THỰC PHẨM TỪ NGUỒN
                        <span className="font-bold text-taiky-brown">NÔNG SẢN TỰ NHIÊN</span>VÌ SỨC
                        KHỎE CỘNG ĐỒNG.
                    </p>
                )}
            </Container>
            <div className="w-full">
                <img src={imgBgPhoto} alt="" className="w-full" />
            </div>
        </section>
    );
}
