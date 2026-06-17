/**
 * "QUÁ TRÌNH PHÁT TRIỂN TAKYFOOD" — development timeline.
 *
 * Fixed-size canvas (1304px wide = the natural width of the dotted-path asset,
 * matching the 1304×3440 design). The winding path with its flame nodes is the
 * background; 1976 is the top row (no flame), then each flame marks a year
 * (1978 → 2026) alternating left / right, with its photo on the opposite side.
 * Coordinates were measured directly from the 1304×3440 sample.
 *
 * Content is driven by `GET /grown-ups`; the fixed `imgPos`/`textPos` layout
 * coordinates stay local (design-specific) and are paired with the API rows by
 * order. Falls back to the built-in content when the feed is empty / erroring.
 */

import { useGrownUps, usePage } from '../../lib/api/queries';
import { img, t } from '../../lib/api/helpers';
import { PAGE, pageSection } from '../../lib/api/pages';

const imgMapLine = '/images/map-line.webp';

const imgDecorTopleft = '/images/decor-foodbowls.png';
const imgDecorTimeline = '/images/decor-timeline.png';
const imgDecorTimeline1 = '/images/decor-timeline-1.png';
const imgDecorTimeline2 = '/images/decor-core-value.png';
const imgDecorTimeline3 = '/images/decor-products.png';
const imgDecorTimeline4 = '/images//hero-sketch.png';

type Milestone = {
    year: string;
    title: string;
    subtitle?: string;
    image: string;
    /** Photo / logo placement (includes its width). */
    imgPos: string;
    /** Year + text placement, beside the flame node on the opposite side. */
    textPos: string;
};

const MILESTONES: Milestone[] = [
    {
        year: '1976',
        title: 'Cơ sở bột năng Tài Ký ra đời',
        subtitle: 'Sản xuất mang tính thủ công và nhân công là các thành viên trong gia đình.',
        image: '/images/est-1.png',
        imgPos: 'left-[140px] top-[0] w-[480px]',
        textPos: 'left-[889px] top-[41px] w-[333px]',
    },
    {
        year: '1978',
        title: 'Biểu tượng “Sư Tử Bay” ra đời',
        subtitle:
            'Là cái tên thân thương mà các tiểu thương vẫn nhớ tới với hình ảnh cùng chiếc xe đạp giao hàng bột năng.',
        image: '/images/est-2.png',
        imgPos: 'left-[695px] top-[495px] w-[501px]',
        textPos: 'left-[128px] top-[626px] w-[350px]',
    },
    {
        year: '2004',
        title: 'Thành lập Công ty Cổ Phần Bột - Thực Phẩm Tài Ký',
        image: '/images/est-3.png',
        imgPos: 'left-[230px] top-[1084px] w-[525px]',
        textPos: 'left-[923px] top-[1181px] w-[333px]',
    },
    {
        year: '2019',
        title: 'Cơ sở Nhà máy 2',
        image: '/images/est-4.png',
        imgPos: 'left-[536px] top-[1550px] w-[491px]',
        textPos: 'left-[224px] top-[1605px] w-[360px]',
    },
    {
        year: '2021',
        title: '45 năm hình thành và phát triển',
        image: '/images/est-5.png',
        imgPos: 'left-[95px] top-[2082px] w-[542px]',
        textPos: 'left-[756px] top-[2119px] w-[333px]',
    },
    {
        year: '2022',
        title: 'TAKYfood đạt Thương Hiệu Quốc Gia Việt Nam',
        image: '/images/est-6.png',
        imgPos: 'left-[619px] top-[2466px] w-[538px]',
        textPos: 'left-[245px] top-[2533px] w-[333px]',
    },
    {
        year: '2026',
        title: 'Hành trình 50 năm - khoai và bột',
        image: '/images/est-7.png',
        imgPos: 'left-[152px] top-[2875px] w-[582px]',
        textPos: 'left-[801px] top-[2975px] w-[333px]',
    },
];

type MilestoneContent = Pick<Milestone, 'year' | 'title' | 'subtitle' | 'image'>;

export default function Timeline() {
    const { data } = useGrownUps();
    const apiItems = data?.data ?? [];

    // ABOUT-US page CMS section 4: heading + label.
    const { data: page } = usePage(PAGE.ABOUT_US);
    const s4 = pageSection(page?.data, '4');
    const heading = s4?.title || 'QUÁ TRÌNH PHÁT TRIỂN';
    const label = s4?.label || 'TAKYFOOD';

    // API content if available, else the built-in fallback content.
    const content: MilestoneContent[] = apiItems.length
        ? apiItems.map((g) => ({
              year: t(g.year),
              title: t(g.title),
              subtitle: t(g.description),
              image: img(g.image),
          }))
        : MILESTONES.map(({ year, title, subtitle, image }) => ({ year, title, subtitle, image }));

    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg pt-[40px] z-10">
            {/* Decorative blobs are positioned for the tall desktop canvas only */}
            <div className="absolute top-0 left-0 translate-x-[-20%] hidden min-[1304px]:block">
                <img src={imgDecorTopleft} alt="bg-banner" />
            </div>
            <div className="absolute top-[1090px] left-0 mix-blend-color-burn hidden min-[1304px]:block">
                <img src={imgDecorTimeline1} alt="bg-banner" />
            </div>
            <div className="absolute top-[410px] right-0 hidden min-[1304px]:block">
                <img src={imgDecorTimeline} alt="bg-banner" />
            </div>
            <div className="absolute top-[1800px] right-0 z-10 mix-blend-color-burn translate-x-[15%] hidden min-[1304px]:block">
                <img src={imgDecorTimeline2} alt="bg-banner" />
            </div>
            <div className="absolute top-[2500px] right-0 z-10 translate-x-[35%] hidden min-[1304px]:block">
                <img src={imgDecorTimeline3} alt="bg-banner" />
            </div>
            <div className="absolute top-[3000px] left-0 z-10 mix-blend-color-burn opacity-35 translate-x-[-10%] hidden min-[1304px]:block">
                <img src={imgDecorTimeline4} alt="bg-banner" />
            </div>
            {/* Heading */}
            <div className="flex flex-col items-center pt-[24px] lg:pt-[40px] pb-[20px] text-center relative z-10 px-[20px]">
                <h2 className="font-stamp font-normal tracking-brand text-[28px] leading-[32px] lg:text-[44px] lg:leading-[48px] text-taiky-orange uppercase mb-[12px] lg:mb-[20px]">
                    {heading}
                </h2>
                <p className="font-stamp text-[28px] leading-[28px] lg:text-[40px] lg:leading-[32px] text-taiky-brown uppercase">
                    {label}
                </p>
            </div>

            {/* Desktop (≥1304px): fixed-size canvas with the winding dotted path */}
            <div className="hidden min-[1304px]:flex justify-center items-center relative z-10">
                <div className="relative mx-auto">
                    <img src={imgMapLine} alt="" className="w-[1304px] h-auto" />

                    {MILESTONES.map(({ imgPos, textPos }, i) => {
                        const c = content[i];
                        if (!c) return null;
                        return (
                            <div key={i}>
                                <img
                                    src={c.image}
                                    alt={`TAKYfood ${c.year}`}
                                    className={`absolute ${imgPos}`}
                                />
                                <div className={`absolute ${textPos}`}>
                                    <p className="font-stamp text-[44px] leading-[44px] text-taiky-orange">
                                        {c.year}
                                    </p>
                                    <p className="mt-[10px] font-sans font-bold text-[18px] leading-[24px] text-taiky-brown">
                                        {c.title}
                                    </p>
                                    {c.subtitle && (
                                        <p className="mt-[6px] font-sans text-[14px] leading-[20px] text-taiky-lightbrown">
                                            {c.subtitle}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile / tablet (<1304px): vertical stacked timeline */}
            <ol className="min-[1304px]:hidden relative z-10 mx-auto flex max-w-[420px] flex-col gap-[40px] px-[24px] pb-[40px] pt-[12px]">
                {content.map(({ year, title, subtitle, image }, i) => (
                    <li key={i} className="flex flex-col items-center gap-[12px] text-center">
                        <img
                            src={image}
                            alt={`TAKYfood ${year}`}
                            loading="lazy"
                            className="w-full max-w-[320px] h-auto rounded-[12px]"
                        />
                        <p className="font-stamp text-[40px] leading-[40px] text-taiky-orange">
                            {year}
                        </p>
                        <p className="font-sans font-bold text-[16px] leading-[22px] text-taiky-brown">
                            {title}
                        </p>
                        {subtitle && (
                            <p className="font-sans text-[13px] leading-[19px] text-taiky-lightbrown">
                                {subtitle}
                            </p>
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
}
