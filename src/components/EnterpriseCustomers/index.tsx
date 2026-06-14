import Container from '../Container';

/**
 * "KHÁCH HÀNG DOANH NGHIỆP (OEM/ODM)" — enterprise partners: intro copy + a
 * single centered row of brand logos (cus-1 … cus-7, at natural size).
 */

const CUSTOMER_LOGOS = Array.from({ length: 7 }, (_, i) => `/images/cus-${i + 1}.png`);

export default function EnterpriseCustomers() {
    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <Container className="flex flex-col items-center gap-[20px] py-[40px]">
                <h2 className="font-stamp font-normal tracking-brand text-[36px] leading-[44px] text-taiky-orange uppercase text-center">
                    KHÁCH HÀNG DOANH NGHIỆP (OEM/ODM)
                </h2>
                <p className="text-[18px] font-bold leading-[26px] tracking-[0.04em] text-taiky-lightbrown uppercase">
                    Đồng hành sản xuất &amp; phát triển sản phẩm cùng các thương hiệu
                </p>

                <div className="mt-[24px] flex flex-wrap items-center justify-center gap-x-[40px] gap-y-[32px]">
                    {CUSTOMER_LOGOS.map((src) => (
                        <img key={src} src={src} alt="" loading="lazy" />
                    ))}
                </div>
            </Container>
        </section>
    );
}
