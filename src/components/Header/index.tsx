import { Link } from 'react-router-dom';
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

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out motion-reduce:transition-none ${
                scrolled ? 'bg-taiky-bg/70 backdrop-blur-md shadow-md' : 'bg-transparent'
            }`}
        >
            <Container
                className={`flex items-center justify-between transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
                    scrolled ? 'py-[6px]' : 'py-[20px]'
                }`}
            >
                {/* Left: logo + 50yr badge — shrink on scroll */}
                <div className="flex items-center gap-8 shrink-0">
                    <Link to="/" className="block shrink-0">
                        <img
                            src={imgLogoMain}
                            alt="TAKYfood"
                            width={226}
                            height={70}
                            className={`block w-auto transition-[height] duration-300 ease-out motion-reduce:transition-none ${
                                scrolled ? 'h-[40px]' : 'h-[70px]'
                            }`}
                        />
                    </Link>
                    <Link to="/" className="block shrink-0">
                        <img
                            src={imgLogoSub}
                            alt="TAKYfood 50 năm"
                            width={97}
                            height={80}
                            className={`block w-auto transition-[height] duration-300 ease-out motion-reduce:transition-none ${
                                scrolled ? 'h-[46px]' : 'h-[80px]'
                            }`}
                        />
                    </Link>
                </div>

                {/* Right: nav links */}
                <nav aria-label="Điều hướng chính">
                    <ul className="flex items-center gap-5 uppercase text-[16px] leading-6 text-taiky-brown font-bold">
                        {NAV_LINKS.map(({ label, to }) => (
                            <li key={label}>
                                <Link
                                    to={to}
                                    className="hover:text-taiky-orange transition-colors whitespace-nowrap"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}
