import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../Container';
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

                {/* Right: desktop nav links */}
                <nav aria-label="Điều hướng chính" className="hidden lg:block">
                    <ul className="flex items-center gap-5 uppercase text-[16px] leading-6 text-taiky-brown font-bold">
                        {NAV_LINKS.map(({ label, to }) => (
                            <li key={label}>
                                <Link
                                    to={to}
                                    aria-current={isActive(to) ? 'page' : undefined}
                                    className={`transition-colors whitespace-nowrap hover:text-taiky-orange ${
                                        isActive(to) ? 'text-taiky-orange' : 'text-taiky-brown'
                                    }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

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

            {/* Mobile menu panel */}
            <div
                className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                    open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
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
                </nav>
            </div>
        </header>
    );
}
