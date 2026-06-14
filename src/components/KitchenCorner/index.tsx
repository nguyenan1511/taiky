const imgTree = '/images/kitchen-tree.png';
const imgTextLeft = '/images/text-left.png';
const imgTextRight = '/images/text-right.png';
const imgDecorTopleft = '/images/decor-foodbowls.png';
const imgDecorBottomRight = '/images/decor-foodbowls-2.png';

export default function KitchenCorner() {
    return (
        <section id="goc-am-thuc" className="relative w-full overflow-hidden bg-taiky-bg">
            <div className="absolute top-[4%] left-0 translate-x-[-10%]">
                <img src={imgDecorTopleft} alt="bg-banner" />
            </div>
            <div className="absolute bottom-0 right-0 translate-x-[60%]">
                <img src={imgDecorBottomRight} alt="bg-banner" />
            </div>
            {/* Centered tree illustration */}
            <div className="flex flex-col items-center pt-[80px]">
                <div className="relative">
                    {/* Tree */}
                    <img src={imgTree} alt="50 năm TAIKYFOOD" className="" />
                    <img
                        src={imgTextLeft}
                        alt="imgTextLeft"
                        className="absolute bottom-[100px] left-[-180px]"
                    />
                    <img
                        src={imgTextRight}
                        alt="imgTextRight"
                        className="absolute bottom-[100px] right-[0px]"
                    />
                </div>

                {/* GÓC BẾP heading */}
                <h2 className="font-stamp font-normal tracking-brand text-[48px] leading-[48px] text-taiky-orange uppercase mt-[-20px] mb-[26px]">
                    GÓC BẾP CỦA TAIKYFOOD
                </h2>
            </div>
        </section>
    );
}
