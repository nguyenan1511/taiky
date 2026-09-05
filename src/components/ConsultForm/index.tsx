import { useState } from 'react';
import Container from '../Container';
import { useSubmitContact } from '../../lib/api/queries';
import { useUi } from '../../content/ui';

/**
 * Surface the backend's error message verbatim (e.g. `"phone" must be a phone
 * number`), falling back to a generic message for network / non-API failures.
 */
function errorMessage(error: unknown, fallback: string): string {
    const message = error instanceof Error ? error.message : '';
    return message || fallback;
}

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
    const ui = useUi().consultForm;
    const [form, setForm] = useState(EMPTY_FORM);
    const { mutate, isPending, isSuccess, isError, error, reset } = useSubmitContact();

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
            ? `${ui.addressPrefix}${form.address.trim()}\n\n${form.message.trim()}`
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
                            {ui.heading}
                        </h2>

                        <div className="flex flex-col items-center gap-[6px] text-[14px] font-bold text-taiky-brown sm:flex-row sm:justify-center sm:gap-[24px]">
                            <a
                                href="mailto:contact@takyfood.com.vn"
                                className="transition-colors hover:text-taiky-orange"
                            >
                                Email: contact@takyfood.com.vn
                            </a>
                            <a
                                href="tel:19006108,802"
                                className="transition-colors hover:text-taiky-orange"
                            >
                                Hotline: 19006108 - Ext: 802
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[56px] gap-y-[28px] lg:gap-y-[36px] font-bold">
                            <input
                                className={fieldClass}
                                type="text"
                                placeholder={ui.namePlaceholder}
                                required
                                value={form.name}
                                onChange={update('name')}
                            />
                            <input
                                className={fieldClass}
                                type="tel"
                                placeholder={ui.phonePlaceholder}
                                required
                                value={form.phone}
                                onChange={update('phone')}
                            />
                            <input
                                className={fieldClass}
                                type="email"
                                placeholder={ui.emailPlaceholder}
                                required
                                value={form.email}
                                onChange={update('email')}
                            />
                            <input
                                className={fieldClass}
                                type="text"
                                placeholder={ui.addressPlaceholder}
                                value={form.address}
                                onChange={update('address')}
                            />
                        </div>

                        <textarea
                            className={`${fieldClass} resize-none font-bold`}
                            rows={3}
                            placeholder={ui.messagePlaceholder}
                            value={form.message}
                            onChange={update('message')}
                        />

                        {isSuccess && (
                            <p className="text-center text-[15px] font-bold text-taiky-orange">
                                {ui.success}
                            </p>
                        )}
                        {isError && (
                            <p className="text-center text-[15px] font-bold text-red-600">
                                {errorMessage(error, ui.errorFallback)}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="mx-auto mt-[8px] btn-cta bg-taiky-yellow px-[36px] py-[12px] text-[15px] font-bold text-taiky-brown disabled:opacity-60"
                        >
                            {isPending ? ui.submitting : ui.submit}
                        </button>
                    </form>
                </div>
            </Container>
        </section>
    );
}
