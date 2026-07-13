import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../Container';
import ProductsMegaMenu from './ProductsMegaMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { useScrolled } from './useScrolled';

const imgLogoMain = '/images/logo-main.svg';
const imgLogoSub = '/images/logo-sub.svg';

type NavLink = { label: string; to: string };

const NAV_LINKS: NavLink[] = [
    { label: 'Câu chuyện TAKYfood', to: '/story' },
    { label: 'sản phẩm', to: '/products' },
    { label: 'tin tức sự kiện', to: '/news' },
    { label: 'phân phối', to: '/distribution' },
    { label: 'góc ẩm thực', to: '/food' },
];

export default function Header() {
    const scrolled = useScrolled();
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    // Active when on the page or any of its sub-routes (e.g. /products/:slug).
    const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

    // Desktop "Sản phẩm" mega menu — open on hover, with a small close delay so
    // the mouse can travel from the nav link down into the panel without closing.
    const [megaOpen, setMegaOpen] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const openMega = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setMegaOpen(true);
    };
    const scheduleCloseMega = () => {
        closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
    };
    const closeMegaNow = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setMegaOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out motion-reduce:transition-none ${
                scrolled || open ? 'bg-taiky-bg/90 backdrop-blur-md shadow-md' : 'bg-transparent'
            }`}
        >
            <Container
                className={`flex items-center justify-between transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
                    scrolled ? 'py-[8px]' : 'py-[12px] lg:py-[20px]'
                }`}
            >
                {/* Left: logo + 50yr badge — shrink on scroll */}
                <div className="flex items-center gap-4 lg:gap-8 shrink-0">
                    <Link to="/" className="block shrink-0">
                        <img
                            src={imgLogoMain}
                            alt="TAKYfood"
                            width={226}
                            height={70}
                            className={`block w-auto transition-[height] duration-300 ease-out motion-reduce:transition-none ${
                                scrolled ? 'h-[38px] lg:h-[40px]' : 'h-[44px] lg:h-[70px]'
                            }`}
                        />
                    </Link>
                    <Link to="/" className="hidden sm:block shrink-0">
                        <img
                            src={imgLogoSub}
                            alt="TAKYfood 50 năm"
                            width={97}
                            height={80}
                            className={`block w-auto transition-[height] duration-300 ease-out motion-reduce:transition-none ${
                                scrolled ? 'h-[42px] lg:h-[46px]' : 'h-[52px] lg:h-[80px]'
                            }`}
                        />
                    </Link>
                </div>

                {/* Right: desktop nav links + language switcher */}
                <div className="hidden lg:flex items-center gap-6">
                    <nav aria-label="Điều hướng chính">
                        <ul className="flex items-center gap-5 uppercase text-[16px] leading-6 text-taiky-brown font-bold">
                            {NAV_LINKS.map(({ label, to }) => {
                                const isProducts = to === '/products';
                                return (
                                    <li
                                        key={label}
                                        onMouseEnter={isProducts ? openMega : closeMegaNow}
                                        onMouseLeave={isProducts ? scheduleCloseMega : undefined}
                                    >
                                        <Link
                                            to={to}
                                            aria-current={isActive(to) ? 'page' : undefined}
                                            aria-expanded={isProducts ? megaOpen : undefined}
                                            className={`transition-colors whitespace-nowrap hover:text-taiky-orange ${
                                                isActive(to) ? 'text-taiky-orange' : 'text-taiky-brown'
                                            }`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <LanguageSwitcher />
                </div>

                {/* Right: mobile hamburger */}
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-label={open ? 'Đóng menu' : 'Mở menu'}
                    aria-expanded={open}
                    className="lg:hidden flex h-[40px] w-[40px] items-center justify-end text-taiky-brown"
                >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        {open ? (
                            <path
                                d="M6 6l12 12M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                            />
                        ) : (
                            <path
                                d="M4 7h16M4 12h16M4 17h16"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                            />
                        )}
                    </svg>
                </button>
            </Container>

            {/* Desktop "Sản phẩm" mega menu — full-width panel below the header.
                The pt keeps its hitbox flush with the header so the hover
                doesn't break while the cursor moves down into it. */}
            <div
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
                className={`hidden lg:block absolute left-0 right-0 top-full pt-[10px] transition-[opacity,transform,visibility] duration-200 ease-out ${
                    megaOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible pointer-events-none -translate-y-2 opacity-0'
                }`}
            >
                <Container className="px-[72px]">
                    <div className="rounded-[16px] bg-taiky-bg/95 p-[28px] shadow-card-hover backdrop-blur-md">
                        <ProductsMegaMenu onNavigate={closeMegaNow} />
                    </div>
                </Container>
            </div>

            {/* Mobile menu panel */}
            <div
                className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                    open ? 'max-h-[460px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <nav
                    aria-label="Điều hướng chính (mobile)"
                    className="bg-taiky-bg/95 backdrop-blur-md"
                >
                    <ul className="flex flex-col px-[20px] py-[8px]">
                        {NAV_LINKS.map(({ label, to }) => (
                            <li key={label}>
                                <Link
                                    to={to}
                                    onClick={() => setOpen(false)}
                                    aria-current={isActive(to) ? 'page' : undefined}
                                    className={`block border-b border-taiky-lightbrown/20 py-[12px] text-[15px] font-bold uppercase transition-colors hover:text-taiky-orange ${
                                        isActive(to) ? 'text-taiky-orange' : 'text-taiky-brown'
                                    }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-[10px] px-[20px] py-[16px]">
                        <span className="text-[15px] font-bold uppercase text-taiky-lightbrown">
                            Ngôn ngữ:
                        </span>
                        <LanguageSwitcher variant="inline" />
                    </div>
                </nav>
            </div>
        </header>
    );
}
