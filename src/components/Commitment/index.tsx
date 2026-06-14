import Container from '../Container';

const imgBgPhoto = '/images/commitment-bg.png';

export default function Commitment() {
    return (
        <section className="relative w-full overflow-hidden bg-taiky-cream mb-[-200px]">
            {/* Light warm scrim — keeps the flour photo sharp (Figma) while giving the heading legible contrast at the top */}
            <div className="absolute inset-0 bg-gradient-to-b from-taiky-bg via-taiky-bg/40 to-transparent" />
            <Container className="relative z-10 h-full flex flex-col items-center justify-center gap-[32px] px-[80px] space-y-3">
                <h2 className="font-stamp font-normal tracking-brand text-[48px] leading-[48px] text-taiky-orange uppercase text-center">
                    CAM KẾT CỦA TÀI KÝ
                </h2>
                <p className="text-center font-sans text-[18px] leading-[28px] tracking-[0.04em] text-taiky-lightbrown uppercase font-bold">
                    BỘT THỰC PHẨM TỪ NGUỒN
                    <span className="font-bold text-taiky-brown">NÔNG SẢN TỰ NHIÊN</span>VÌ SỨC KHỎE
                    CỘNG ĐỒNG.
                </p>
            </Container>
            <div className="w-full">
                <img src={imgBgPhoto} alt="" className="w-full" />
            </div>
        </section>
    );
}
