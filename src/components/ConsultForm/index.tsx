import Container from '../Container';

/**
 * "NHẬN THÔNG TIN TƯ VẤN" — consultation form on a parchment panel (bg-form.jpg).
 * Underline-style fields; labels double as placeholders.
 */

const imgBg = '/images/bg-form.jpg';

const imgDecorTimeline1 = '/images/decor-timeline-1.png';
const imgDecorFormLeft = '/images/decor-form-left.png';

const fieldClass =
    'w-full border-0 border-b border-taiky-lightbrown/50 bg-transparent pb-[8px] text-[16px] text-taiky-brown outline-none transition-colors placeholder:uppercase placeholder:tracking-[0.04em] placeholder:text-taiky-lightbrown focus:border-taiky-orange';

export default function ConsultForm() {
    return (
        <section className="relative w-full overflow-visible bg-taiky-bg pb-[60px]">
            <div className="absolute top-[-300px] left-0 mix-blend-color-burn">
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
                        className="relative z-10 flex flex-col gap-[40px] px-[64px] py-[56px]"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <h2 className="font-stamp font-normal tracking-brand text-[36px] leading-[44px] text-taiky-orange uppercase text-center">
                            NHẬN THÔNG TIN TƯ VẤN
                        </h2>

                        <div className="grid grid-cols-2 gap-x-[56px] gap-y-[36px] font-bold">
                            <input className={fieldClass} type="text" placeholder="Họ và tên" />
                            <input className={fieldClass} type="tel" placeholder="Số điện thoại" />
                            <input className={fieldClass} type="email" placeholder="Email" />
                            <input className={fieldClass} type="text" placeholder="Địa chỉ" />
                        </div>

                        <textarea
                            className={`${fieldClass} resize-none font-bold`}
                            rows={3}
                            placeholder="Nội dung tư vấn"
                        />

                        <button
                            type="submit"
                            className="mx-auto mt-[8px] bg-taiky-yellow px-[36px] py-[12px] text-[15px] font-bold text-taiky-brown transition hover:opacity-90"
                        >
                            Gửi thông tin
                        </button>
                    </form>
                </div>
            </Container>
        </section>
    );
}
