import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import { useSettings, useSubmitSubscriber } from '../../lib/api/queries';

const imgLogoMain = '/images/footer-logo-main.svg';
const imgBg = '/images/bg-ft.webp';

// Shown until settings load (and as a fallback if the request fails).
const FALLBACK = {
    companyName: 'CÔNG TY CỔ PHẦN BỘT - THỰC PHẨM TÀI KÝ',
    address: '435 Quốc lộ 13, Khu phố 24, Phường Hiệp Bình, TP. Hồ Chí Minh, Việt Nam',
    phone: '19006108',
    email: 'contact@takyfood.com.vn',
};

// "TAKYfood" wordmark — "food" in brand orange (reused in the nav heading + copyright).
const Wordmark = () => <>TAKYfood</>;

// Group the hotline digits in 4s for readability, e.g. "19006108" → "1900 6108".
const formatPhone = (p: string) => p.replace(/(\d{4})(?=\d)/g, '$1 ');

// Keep the last two words together so a lone final word (e.g. "Nam") doesn't
// orphan onto its own line.
const noOrphan = (s: string) => s.replace(/ (\S+)\s*$/, ' $1');

// "Giới thiệu về TAKYfood" column — each item routes to its page.
// "Tuyển dụng" points to the recruitment page on the main takyfood.com.vn site.
const INTRO_LINKS: Array<{ label: string; to: string }> = [
    { label: 'Sản phẩm', to: '/products' },
    { label: 'Tin tức - Sự kiện', to: '/news' },
    { label: 'Phân Phối', to: '/distribution' },
    { label: 'Góc ẩm thực', to: '/food' },
    { label: 'Tuyển dụng', to: 'https://www.takyfood.com.vn/vn/tuyen-dung.html' },
];

// Support column — the policy pages hosted on the main takyfood.com.vn site.
const SUPPORT_LINKS: Array<{ label: string; to: string }> = [
    { label: 'Chính sách đổi trả', to: 'https://www.takyfood.com.vn/vn/chinh-sach-doi-tra.html' },
    { label: 'Chính sách bảo mật', to: '/privacy-policy' },
    { label: 'Chính sách Cookie', to: '/cookie-policy' },
    {
        label: 'Chính sách thanh toán',
        to: 'https://www.takyfood.com.vn/vn/chinh-sach-thanh-toan.html',
    },
];

// A footer nav entry. External URLs open in a new tab; internal paths use the
// router; an empty destination renders plain (non-clickable) text.
function NavItem({ label, to }: { label: string; to: string }) {
    if (!to) return <span className="cursor-default">{label}</span>;
    if (/^https?:\/\//.test(to)) {
        return (
            <a href={to} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {label}
            </a>
        );
    }
    return (
        <Link to={to} className="hover:underline">
            {label}
        </Link>
    );
}

export default function Footer() {
    const { data: settingsData } = useSettings();
    const s = settingsData?.data;
    const companyName = s?.companyName || FALLBACK.companyName;
    const address = s?.address || FALLBACK.address;
    const phone = s?.phone || FALLBACK.phone;
    const email = s?.email || FALLBACK.email;

    const [subEmail, setSubEmail] = useState('');
    const subscribe = useSubmitSubscriber();

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (subscribe.isPending || !subEmail.trim()) return;
        subscribe.mutate(subEmail.trim(), { onSuccess: () => setSubEmail('') });
    };

    return (
        <footer className="relative w-full overflow-hidden pt-[40px] z-10">
            <img src={imgBg} alt="" className="absolute inset-x-0 top-0 w-full h-auto" />
            {/* Logo centered */}

            <div className="flex justify-center items-center relative z-10 px-[20px]">
                <img src={imgLogoMain} alt="" className="h-auto w-[180px] max-w-full lg:w-auto" />
            </div>

            {/* Main content — orange backdrop; on mobile it spans from below the
                logo to the bottom so it covers the taller stacked content. */}
            <div className="bg-taiky-footerbg absolute w-screen bottom-0 left-0 lg:top-auto h-[700px] md:h-[450px] xl:h-[300px]"></div>

            <Container className="px-6 sm:px-8 md:px-[80px] py-8 flex flex-wrap items-start justify-between gap-8 relative z-10 pt-[48px] lg:pt-[80px] bg-taiky-footerbg md:bg-inherit">
                {/* Left: company info */}
                <div className="flex flex-col gap-[22px] max-w-[461px] min-w-[240px]">
                    <h3 className="font-bold text-white text-[20px] leading-6 uppercase">
                        {companyName}
                    </h3>
                    <div className="flex flex-col gap-3 font-bold text-white text-[14px] leading-6">
                        <p className="whitespace-pre-wrap">Địa chỉ: {noOrphan(address)}</p>
                        <p>Hotline: {formatPhone(phone)} - Ext: 802</p>
                        <p>Email: {email}</p>
                    </div>
                    {/* Newsletter */}
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <input
                                type="email"
                                required
                                value={subEmail}
                                onChange={(e) => setSubEmail(e.target.value)}
                                placeholder="Email nhận khuyến mãi"
                                className="bg-white px-4 py-[10px] text-[16px] leading-6 w-full min-w-0 sm:w-[240px] outline-none text-taiky-lightbrown"
                            />
                            <button
                                type="submit"
                                disabled={subscribe.isPending}
                                className="px-4 py-[10px] font-sans text-white text-[16px] leading-6 whitespace-nowrap bg-taiky-footerbg border border-white/40 transition hover:opacity-90 disabled:opacity-60"
                            >
                                {subscribe.isPending ? 'Đang gửi…' : 'Gửi ngay'}
                            </button>
                        </div>
                        {subscribe.isSuccess && (
                            <p className="text-[13px] text-white">Đăng ký nhận tin thành công!</p>
                        )}
                        {subscribe.isError && (
                            <p className="text-[13px] text-white/90">
                                Đăng ký thất bại. Vui lòng thử lại.
                            </p>
                        )}
                    </form>
                </div>

                {/* Right group: nav columns + back-to-top */}
                <div className="flex flex-wrap items-start gap-x-[24px] gap-y-[28px] lg:gap-[60px]">
                    {/* Nav col 1 */}
                    <div className="flex flex-col gap-4 font-bold text-white text-[14px] leading-[22px] pt-2 min-w-[140px]">
                        <Link to="/story" className="text-[16px] mb-2 hover:underline">
                            Giới thiệu về <Wordmark />
                        </Link>
                        {INTRO_LINKS.map((item) => (
                            <NavItem key={item.label} {...item} />
                        ))}
                    </div>

                    {/* Nav col 2 */}
                    <div className="flex flex-col gap-4 font-bold text-white text-[14px] leading-[22px] pt-2 min-w-[140px]">
                        <p className="text-[16px] mb-2">Hỗ trợ khách hàng</p>
                        {SUPPORT_LINKS.map((item) => (
                            <NavItem key={item.label} {...item} />
                        ))}
                    </div>

                    {/* Back to top */}
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        aria-label="Lên đầu trang"
                        className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-md bg-white text-taiky-orange shadow-md transition hover:opacity-90"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                    </button>
                </div>
                {/* Bottom bar */}
            </Container>

            <div className="flex justify-center w-full relative z-10">
                <div className="mx-8 md:mx-[80px] w-full border-t border-white/30 py-6 text-center font-montserrat font-normal text-white text-[16px] leading-[22px]">
                    Copyright © 2026 <Wordmark /> | All Rights Reserved |{' '}
                    <Link to="/terms-of-use" className="underline hover:opacity-90">
                        Terms and Conditions
                    </Link>{' '}
                    |{' '}
                    <Link to="/privacy-policy" className="underline hover:opacity-90">
                        Privacy Policy
                    </Link>{' '}
                    |{' '}
                    <Link to="/cookie-policy" className="underline hover:opacity-90">
                        Cookie Policy
                    </Link>{' '}
                </div>
            </div>
        </footer>
    );
}
