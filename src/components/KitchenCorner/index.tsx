import BannerImage from '../BannerImage';
import { usePage } from '../../lib/api/queries';
import { PAGE, pageSection } from '../../lib/api/pages';

const imgTree = '/images/kitchen-tree.png';
const imgDecorTopleft = '/images/decor-foodbowls.png';
const imgDecorBottomRight = '/images/decor-foodbowls-2.png';

export default function KitchenCorner() {
    // HOME page CMS section 5: tree image + "GÓC BẾP" heading.
    const { data } = usePage(PAGE.HOME);
    const s4 = pageSection(data?.data, '4');

    const hasImage = Boolean(s4?.image || s4?.imageMb);

    return (
        <section id="goc-am-thuc" className="relative w-full overflow-hidden bg-taiky-bg">
            <div className="absolute top-[4%] left-0 translate-x-[-10%]">
                <img src={imgDecorTopleft} alt="bg-banner" />
            </div>
            <div className="absolute bottom-0 right-0 translate-x-[60%]">
                <img src={imgDecorBottomRight} alt="bg-banner" />
            </div>
            {/* Centered tree illustration */}
            <div className="flex flex-col items-center pt-[48px] px-[20px]">
                <div className="relative">
                    {/* Tree (CMS image, else local fallback) */}
                    {hasImage ? (
                        <BannerImage
                            image={s4?.image}
                            imageMb={s4?.imageMb}
                            alt="50 năm TAIKYFOOD"
                            className="w-full max-w-[420px] h-auto lg:w-auto lg:max-w-[900px]"
                        />
                    ) : (
                        <img
                            src={imgTree}
                            alt="50 năm TAIKYFOOD"
                            className="w-full max-w-[420px] h-auto lg:w-auto lg:max-w-none"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
