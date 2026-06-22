import { useState } from 'react';
import { useSettings } from '../../lib/api/queries';

/**
 * Floating chat widget — a fixed circular launcher (orange circle + message
 * icon) bottom-right on every
 * page; clicking it opens a chat panel (greeting bubbles, quick replies, social
 * shortcuts, message input). Launcher animates on hover; panel pops in.
 */

const imgMessage = '/images/message.svg';
const imgLogoMain = '/images/logo-main.svg';
const imgLogoSub = '/images/logo-sub.svg';
const imgBg = '/images/bg-form.jpg';

const QUICK_REPLIES = ['Đơn hàng', 'Sản phẩm', 'Khuyến mãi mới', 'Về TakyFood'];

function Icon({ d, fill = false }: { d: string; fill?: boolean }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={fill ? 'currentColor' : 'none'}
            stroke={fill ? 'none' : 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d={d} />
        </svg>
    );
}

const socialBtn =
    'flex h-[44px] w-[44px] items-center justify-center rounded-full shadow-md transition-transform duration-300 ease-brand hover:scale-110';

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const { data } = useSettings();
    const s = data?.data;
    const phone = (s?.phone || '19006108').replace(/\s/g, '');
    const email = s?.email || 'contact@takyfood.com.vn';
    const facebook = s?.linkFacebook || '#';

    return (
        <>
            {open && (
                <div
                    role="dialog"
                    aria-label="Chat với TAKYfood"
                    className="fixed bottom-[20px] right-[20px] z-[70] flex h-[600px] max-h-[calc(100vh-32px)] w-[380px] max-w-[calc(100vw-32px)] origin-bottom-right animate-chat-pop flex-col overflow-hidden rounded-[20px] shadow-card-hover"
                >
                    <img
                        src={imgBg}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="relative z-10 flex h-full flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between px-[20px] py-[16px]">
                            <img src={imgLogoMain} alt="TAKYfood" className="h-[34px] w-auto" />
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Đóng chat"
                                className="text-taiky-brown/60 transition hover:text-taiky-brown"
                            >
                                <Icon d="M6 6l12 12M18 6L6 18" />
                            </button>
                        </div>
                        <div className="mx-[20px] border-t border-taiky-lightbrown/30" />

                        {/* Body */}
                        <div className="relative flex-1 overflow-y-auto px-[20px] py-[20px]">
                            <div className="flex items-start gap-[10px]">
                                <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-taiky-orange">
                                    <img
                                        src={imgLogoSub}
                                        alt=""
                                        className="h-[22px] w-auto brightness-0 invert"
                                    />
                                </span>
                                <p className="rounded-[16px] bg-white px-[18px] py-[12px] text-[14px] leading-[20px] text-taiky-brown shadow-card">
                                    Chào bạn, TakyFood luôn sẵn sàng hỗ trợ bạn!
                                </p>
                            </div>
                            <p className="mt-[12px] ml-[50px] rounded-[16px] bg-white px-[18px] py-[12px] text-[14px] leading-[20px] text-taiky-brown shadow-card">
                                TakyFood có thể giúp gì cho bạn hôm nay?
                            </p>

                            {/* Quick replies */}
                            <div className="mt-[20px] ml-[50px] flex flex-wrap gap-[12px]">
                                {QUICK_REPLIES.map((q) => (
                                    <button
                                        key={q}
                                        type="button"
                                        className="rounded-[10px] border border-taiky-orange px-[18px] py-[12px] text-[14px] font-bold text-taiky-orange transition-colors duration-300 ease-brand hover:bg-taiky-orange hover:text-white"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>

                            {/* Social shortcuts */}
                            <div className="absolute bottom-[12px] right-[12px] flex flex-col gap-[12px]">
                                <a
                                    href="#"
                                    aria-label="Zalo"
                                    className={`${socialBtn} bg-white text-[11px] font-bold text-[#0068ff]`}
                                >
                                    Zalo
                                </a>
                                <a
                                    href={facebook}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Messenger"
                                    className={`${socialBtn} bg-[#0084ff] text-white`}
                                >
                                    <Icon
                                        fill
                                        d="M12 3C6.5 3 2 7 2 12c0 2.6 1.2 4.9 3.2 6.5V22l3-1.6c1.2.4 2.5.6 3.8.6 5.5 0 10-4 10-9S17.5 3 12 3Z"
                                    />
                                </a>
                                <a
                                    href={`tel:${phone}`}
                                    aria-label="Gọi điện"
                                    className={`${socialBtn} bg-taiky-orange text-white`}
                                >
                                    <Icon
                                        fill
                                        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .7-.2 1l-2.3 2.2Z"
                                    />
                                </a>
                                <a
                                    href={`mailto:${email}`}
                                    aria-label="Email"
                                    className={`${socialBtn} bg-taiky-orange text-white`}
                                >
                                    <Icon d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2 8 6 8-6" />
                                </a>
                            </div>
                        </div>

                        {/* Input bar */}
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex items-center gap-[12px] bg-taiky-orange px-[20px] py-[18px]"
                        >
                            <input
                                type="text"
                                maxLength={1000}
                                placeholder="Nhập tin nhắn dưới 1000 ký tự nhé!"
                                className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold text-white outline-none placeholder:text-white/85"
                            />
                            <button
                                type="submit"
                                aria-label="Gửi"
                                className="text-white transition hover:scale-110"
                            >
                                <Icon d="M5 12h14M13 6l6 6-6 6" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Launcher — CSS orange circle + white message icon */}
            {!open && (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label="Mở chat hỗ trợ"
                    className="group fixed bottom-[20px] right-[20px] z-[60] flex h-[60px] w-[60px] lg:h-[68px] lg:w-[68px] items-center justify-center rounded-full bg-taiky-orange shadow-lg transition-transform duration-300 ease-brand hover:scale-110 hover:-rotate-6"
                >
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full bg-taiky-orange/40 motion-safe:animate-ping"
                    />
                    <img
                        src={imgMessage}
                        alt="Chat với TAKYfood"
                        className="relative h-[28px] w-[28px] lg:h-[32px] lg:w-[32px]"
                    />
                </button>
            )}
        </>
    );
}
