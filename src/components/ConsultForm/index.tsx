import { useState } from 'react';
import Container from '../Container';
import { useSubmitContact } from '../../lib/api/queries';

/**
 * "NHẬN THÔNG TIN TƯ VẤN" — consultation form on a parchment panel (bg-form.webp).
 * Underline-style fields; labels double as placeholders. Submits to
 * `POST /contacts`. The API body is { name, phone, email, message }; the
 * address field has no API counterpart, so it's folded into the message.
 */

const imgBg = '/images/bg-form.webp';

const imgDecorTimeline1 = '/images/decor-timeline-1.webp';
const imgDecorFormLeft = '/images/decor-form-left.webp';

const fieldClass =
    'w-full border-0 border-b border-taiky-lightbrown/50 bg-transparent pb-[8px] text-[16px] text-taiky-brown outline-none transition-colors placeholder:uppercase placeholder:tracking-[0.04em] placeholder:text-taiky-lightbrown focus:border-taiky-orange';

const EMPTY_FORM = { name: '', phone: '', email: '', address: '', message: '' };

export default function ConsultForm() {
    const [form, setForm] = useState(EMPTY_FORM);
    const { mutate, isPending, isSuccess, isError, reset } = useSubmitContact();

    const update =
        (field: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
            if (isSuccess || isError) reset();
        };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isPending) return;

        const message = form.address.trim()
            ? `Địa chỉ: ${form.address.trim()}\n\n${form.message.trim()}`
            : form.message.trim();

        mutate(
            {
                name: form.name.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                message,
            },
            { onSuccess: () => setForm(EMPTY_FORM) }
        );
    };

    return (
        <section className="relative w-full overflow-visible bg-taiky-bg pb-[60px]">
            <div className="absolute top-[-300px] left-0 mix-blend-color-burn hidden lg:block">
                <img src={imgDecorTimeline1} alt="bg-banner" />
            </div>

            <Container className="py-[40px] max-w-[886px] relative overflow-visible">
                <div className="absolute bottom-[0px] left-0 z-10 translate-x-[-70%]">
                    <img src={imgDecorFormLeft} alt="bg-banner" />
                </div>
                {/* <div className="absolute top-[0px] right-0 z-10 translate-x-[50%]">
                    <img src={imgDecorFormRight} alt="bg-banner" />
                </div> */}
                <div className="relative overflow-hidden z-20 rounded-[16px]">
                    <img
                        src={imgBg}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <form
                        className="relative z-10 flex flex-col gap-[28px] px-[24px] py-[32px] lg:gap-[40px] lg:px-[64px] lg:py-[56px]"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="font-stamp font-normal tracking-brand text-[24px] leading-[30px] lg:text-[36px] lg:leading-[44px] text-taiky-orange uppercase text-center">
                            NHẬN THÔNG TIN TƯ VẤN
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[56px] gap-y-[28px] lg:gap-y-[36px] font-bold">
                            <input
                                className={fieldClass}
                                type="text"
                                placeholder="Họ và tên"
                                required
                                value={form.name}
                                onChange={update('name')}
                            />
                            <input
                                className={fieldClass}
                                type="tel"
                                placeholder="Số điện thoại"
                                required
                                value={form.phone}
                                onChange={update('phone')}
                            />
                            <input
                                className={fieldClass}
                                type="email"
                                placeholder="Email"
                                required
                                value={form.email}
                                onChange={update('email')}
                            />
                            <input
                                className={fieldClass}
                                type="text"
                                placeholder="Địa chỉ"
                                value={form.address}
                                onChange={update('address')}
                            />
                        </div>

                        <textarea
                            className={`${fieldClass} resize-none font-bold`}
                            rows={3}
                            placeholder="Nội dung tư vấn"
                            value={form.message}
                            onChange={update('message')}
                        />

                        {isSuccess && (
                            <p className="text-center text-[15px] font-bold text-taiky-orange">
                                Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ liên hệ sớm.
                            </p>
                        )}
                        {isError && (
                            <p className="text-center text-[15px] font-bold text-red-600">
                                Gửi thông tin thất bại. Vui lòng thử lại.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="mx-auto mt-[8px] btn-cta bg-taiky-yellow px-[36px] py-[12px] text-[15px] font-bold text-taiky-brown disabled:opacity-60"
                        >
                            {isPending ? 'Đang gửi…' : 'Gửi thông tin'}
                        </button>
                    </form>
                </div>
            </Container>
        </section>
    );
}
