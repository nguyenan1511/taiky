import { useState, useRef } from 'react';
import Container from '../Container';
import ProductCard, { type Product } from './ProductCard';

const imgProd1 = '/images/prod-1.png';
const imgProd2 = '/images/prod-2.png';
const imgProd3 = '/images/prod-3.png';
const imgProd4 = '/images/prod-4.jpg';
const imgArrow = '/images/prod-arrow.svg';
const imgDecor = '/images/decor-products.png';

const brandProducts: Record<string, Product[]> = {
    TAKYFOOD: [
        {
            img: imgProd1,
            title: 'Bột Chiên Tẩm Khô\nTakyGion 600g',
            desc: 'Bột đa dụng phù hợp cho mọi nhu cầu nấu nướng, từ làm bánh, chiên rán đến tạo độ sệt cho các món súp và nước sốt.',
        },
        {
            img: imgProd2,
            title: 'Bột Chiên Giòn Gia Vị\nTaky Giòn 150g',
            desc: 'Bột Chiên Giòn Nêm Sẵn Gia Vị TAKYGION làm nên các món chiên giòn tan thơm lừng, kết hợp gia vị đậm đà tăng hương vị tuyệt hảo cho các món chiên.',
        },
        {
            img: imgProd3,
            title: 'Bột Bánh Cuốn\n400g',
            desc: 'Sự lựa chọn hoàn hảo cho những ai yêu thích món bánh cuốn dẻo mềm, thơm ngon mà không tốn nhiều thời gian chế biến.',
        },
        {
            img: imgProd4,
            title: 'Bột Bánh Xèo\n400g',
            desc: 'Món bánh xèo có lớp vỏ giòn rụm đẹp mắt bên ngoài, vẫn giữ được sự mềm mọng bên trong, kết hợp cùng nhân tôm thịt tạo nên vị ngon khoái khẩu.',
        },
    ],
    'SƯ TỬ BAY': [
        {
            img: imgProd2,
            title: 'Bột Chiên Xù\nSư Tử Bay 500g',
            desc: 'Bột chiên xù Sư Tử Bay tạo lớp vỏ giòn tan, vàng đẹp cho mọi nguyên liệu. Công thức đặc biệt giữ độ giòn lâu hơn sau khi chiên.',
        },
        {
            img: imgProd1,
            title: 'Bột Tẩm Gà Rán\nSư Tử Bay 300g',
            desc: 'Bột tẩm chuyên dụng cho gà rán với hương thảo mộc tự nhiên. Tạo lớp vỏ vàng ươm, giòn rụm, thấm gia vị đến từng thớ thịt.',
        },
        {
            img: imgProd4,
            title: 'Bột Bánh Mì\nSư Tử Bay 1kg',
            desc: 'Bột bánh mì cao cấp từ lúa mì tuyển chọn. Cho ra đời những ổ bánh mì vỏ giòn, ruột mềm, thơm phức hương lúa mì tự nhiên.',
        },
        {
            img: imgProd3,
            title: 'Bột Đa Dụng\nSư Tử Bay 2kg',
            desc: 'Bột đa dụng phù hợp cho mọi nhu cầu nấu nướng, từ làm bánh, chiên rán đến tạo độ sệt cho các món súp và nước sốt.',
        },
    ],
    TAKYGION: [
        {
            img: imgProd1,
            title: 'Bột Chiên Tẩm Khô\nTakyGion 600g',
            desc: 'Bột đa dụng phù hợp cho mọi nhu cầu nấu nướng, từ làm bánh, chiên rán đến tạo độ sệt cho các món súp và nước sốt.',
        },
        {
            img: imgProd2,
            title: 'Bột Chiên Giòn\nTakyGion 150g',
            desc: 'Bột Chiên Giòn Nêm Sẵn Gia Vị TAKYGION làm nên các món chiên giòn tan thơm lừng, kết hợp gia vị đậm đà tăng hương vị tuyệt hảo.',
        },
        {
            img: imgProd3,
            title: 'Bột TakyGion\nKapika 400g',
            desc: 'Bột chiên chuyên nghiệp dòng Kapika với công thức độc quyền, tạo lớp vỏ cực giòn, giữ độ giòn đến 2 giờ sau khi chiên.',
        },
        {
            img: imgProd4,
            title: 'Bột TakyGion\nSpicy 300g',
            desc: 'Phiên bản cay nồng của TAKYGION với ớt cayenne và tiêu đen. Lý tưởng cho gà chiên cay, cánh gà, tôm chiên cay Hàn Quốc.',
        },
    ],
    LIV: [
        {
            img: imgProd3,
            title: 'Bột Ngũ Cốc\nLiv Organic 500g',
            desc: 'Hỗn hợp ngũ cốc hữu cơ cao cấp, giàu chất xơ và vitamin. Thích hợp cho bữa sáng lành mạnh, pha với sữa hoặc nước ấm.',
        },
        {
            img: imgProd4,
            title: 'Bột Yến Mạch\nLiv Oats 800g',
            desc: 'Yến mạch Liv nguyên cám, không qua xử lý hóa chất. Nguồn năng lượng bền vững cho ngày dài hoạt động.',
        },
        {
            img: imgProd1,
            title: 'Bột Protein\nLiv Fit 400g',
            desc: 'Bột protein thực vật từ đậu nành và hạt đinh hương, hỗ trợ phục hồi cơ bắp sau tập luyện, phù hợp cho người ăn chay.',
        },
        {
            img: imgProd2,
            title: 'Bột Smoothie\nLiv Green 300g',
            desc: 'Hỗn hợp rau xanh, trái cây sấy lạnh và siêu thực phẩm. Chỉ cần pha với nước hoặc sữa để có ly smoothie dinh dưỡng.',
        },
    ],
    SENTA: [
        {
            img: imgProd4,
            title: 'Bột Gia Vị\nSenta BBQ 250g',
            desc: 'Hỗn hợp gia vị nướng BBQ đặc biệt với paprika khói, tỏi và thảo mộc địa trung hải. Phù hợp cho thịt nướng, rau củ và hải sản.',
        },
        {
            img: imgProd2,
            title: 'Bột Curry\nSenta Indian 200g',
            desc: 'Cari Ấn Độ authentic với 12 loại gia vị truyền thống. Tạo nên màu vàng óng và hương thơm nồng đặc trưng cho mọi món cà ri.',
        },
        {
            img: imgProd3,
            title: 'Bột Phở\nSenta Bắc 350g',
            desc: 'Gia vị phở truyền thống miền Bắc với quế, hồi, đinh hương và gừng nướng. Nấu nồi phở thơm ngon, đậm đà ngay tại nhà.',
        },
        {
            img: imgProd1,
            title: 'Bột Húng Lìu\nSenta 150g',
            desc: 'Hỗn hợp gia vị ngũ vị hương đặc trưng ẩm thực Trung Hoa. Thích hợp để ướp vịt quay, thịt xá xíu và các món nướng phong cách Á Đông.',
        },
    ],
    TIKTA: [
        {
            img: imgProd2,
            title: 'Bột Tempura\nTikta Premium 500g',
            desc: 'Bột tempura Nhật Bản cao cấp, tạo lớp vỏ mỏng trong suốt, giòn nhẹ và thanh. Lý tưởng cho hải sản, rau củ chiên tempura.',
        },
        {
            img: imgProd3,
            title: 'Bột Okonomiyaki\nTikta 400g',
            desc: 'Bột bánh xèo kiểu Nhật Okonomiyaki với dashi và bắp cải. Tạo ra chiếc bánh xốp mềm, thơm ngon đúng phong cách Osaka.',
        },
        {
            img: imgProd1,
            title: 'Bột Takoyaki\nTikta 300g',
            desc: 'Bột bánh bạch tuộc Takoyaki chính gốc Nhật, tạo ra những viên bánh tròn đều, vỏ giòn nhẹ, bên trong mềm và thơm dầu động vật.',
        },
        {
            img: imgProd4,
            title: 'Bột Ramen\nTikta Noodle 500g',
            desc: 'Bột mì ramen đặc biệt với kiềm tự nhiên, tạo ra sợi mì vàng dai, thun và không bị nhũn sau khi nấu lâu.',
        },
    ],
    VIILAN: [
        {
            img: imgProd3,
            title: 'Bột Bánh Bèo\nViilan 400g',
            desc: 'Bột bánh bèo miền Trung chính gốc, tạo ra những chiếc bánh trắng trong, mềm mịn, thơm mùi gạo tươi đặc trưng Huế.',
        },
        {
            img: imgProd1,
            title: 'Bột Bánh Nậm\nViilan 300g',
            desc: 'Bột bánh nậm truyền thống xứ Huế với gạo tẻ xay mịn, gói lá chuối hấp chín tạo mùi thơm đặc trưng không thể nhầm lẫn.',
        },
        {
            img: imgProd4,
            title: 'Bột Bún Bò\nViilan Gia Vị 200g',
            desc: 'Hỗn hợp gia vị bún bò Huế chuẩn vị với sả, mắm ruốc và ớt bột. Nấu nồi bún bò đậm đà, cay nồng đúng khẩu vị miền Trung.',
        },
        {
            img: imgProd2,
            title: 'Bột Mì Quảng\nViilan 400g',
            desc: 'Bột mì Quảng đặc biệt vàng nghệ, tạo sợi mì dày, dai và có màu vàng tươi tự nhiên từ nghệ. Kết hợp tuyệt vời với nước nhân giàu.',
        },
    ],
};

const tabs = ['TAKYFOOD', 'SƯ TỬ BAY', 'TAKYGION', 'LIV', 'SENTA', 'TIKTA', 'VIILAN'];

const CARD_W = 264;
const CARD_GAP = 16;
const STEP = CARD_W + CARD_GAP;
const N = 4;
const VIEWPORT_W = N * CARD_W + (N - 1) * CARD_GAP;

export default function Products() {
    const [activeTab, setActiveTab] = useState(0);
    const products = brandProducts[tabs[activeTab]];
    const looped = [...products, ...products, ...products];

    const posRef = useRef(N);
    const busy = useRef(false);
    const [tx, setTx] = useState(-N * STEP);
    const [dur, setDur] = useState('0s');

    const slide = (dir: 1 | -1) => {
        if (busy.current) return;
        busy.current = true;
        posRef.current += dir;
        setDur('0.45s');
        setTx(-posRef.current * STEP);
    };

    const onTransitionEnd = () => {
        const pos = posRef.current;
        if (pos >= N * 2) {
            posRef.current = N;
            setDur('0s');
            setTx(-N * STEP);
        } else if (pos < N) {
            posRef.current = N * 2 - 1;
            setDur('0s');
            setTx(-(N * 2 - 1) * STEP);
        }
        requestAnimationFrame(() => {
            busy.current = false;
        });
    };

    const handleTabChange = (i: number) => {
        setActiveTab(i);
        posRef.current = N;
        setDur('0s');
        setTx(-N * STEP);
    };

    return (
        <section id="san-pham" className="relative w-full overflow-hidden pt-[60px] z-[2]">
            <div className="absolute top-1/2 left-[-10%] translate-y-[-50%]">
                <img src={imgDecor} alt="bg-banner" />
            </div>
            <Container className="relative z-10">
                {/* Ticker — centered horizontally */}
                <p className="whitespace-nowrap font-bold text-[24px] leading-[24px] flex justify-center pb-[68px] gap-[6px]">
                    <span className="text-taiky-lightbrown">TÀI KÝ LÀ</span>
                    <span className="text-taiky-brown">{' CHÍNH MÌNH, '}</span>
                    <span className="text-taiky-lightbrown">SẢN PHẨM LÀ</span>
                    <span className="text-taiky-brown">{' HOÀN HẢO, '}</span>
                    <span className="text-taiky-lightbrown">{'KHÁCH HÀNG LÀ '}</span>
                    <span className="text-taiky-brown">THƯỢNG ĐẾ</span>
                </p>

                {/* Heading + tabs */}
                <div className="flex flex-col items-center gap-[40px] mb-[40px]">
                    <h2 className="font-stamp font-normal text-[48px] leading-[48px] text-taiky-orange uppercase whitespace-nowrap">
                        SẢN PHẨM
                    </h2>

                    <div className="flex items-start gap-[40px] relative">
                        {tabs.map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(i)}
                                className={`relative shrink-0 pb-[6px] bg-transparent border-none cursor-pointer font-bold text-[20px] leading-6 whitespace-nowrap transition-colors duration-[250ms] ease-linear ${
                                    activeTab === i ? 'text-taiky-orange' : 'text-taiky-brown'
                                }`}
                            >
                                {tab}
                                <span
                                    className={`absolute bottom-0 left-0 w-full block h-[2px] bg-taiky-orange rounded-[1px] transition-transform duration-[250ms] ease-linear origin-center ${
                                        activeTab === i ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative flex items-center justify-between px-[80px]">
                    <button
                        onClick={() => slide(-1)}
                        className="shrink-0 self-start mt-[138px] hover:opacity-60 active:scale-90 transition"
                    >
                        <img
                            src={imgArrow}
                            alt="prev"
                            className="h-[26px] w-[40px] object-contain"
                        />
                    </button>

                    {/* Viewport — clips the sliding track */}
                    <div className="overflow-hidden" style={{ width: `${VIEWPORT_W}px` }}>
                        <div
                            className="flex items-start gap-4 will-change-transform"
                            style={{
                                transform: `translateX(${tx}px)`,
                                transition: `transform ${dur} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                            }}
                            onTransitionEnd={onTransitionEnd}
                        >
                            {looped.map((p, i) => (
                                // Slide wrapper — width is the carousel's layout concern (tied to STEP math),
                                // so it stays here as a dynamic value; the card itself fills it (w-full).
                                <div key={i} className="shrink-0" style={{ width: `${CARD_W}px` }}>
                                    <ProductCard {...p} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => slide(1)}
                        className="shrink-0 self-start mt-[138px] hover:opacity-60 active:scale-90 transition"
                    >
                        <img
                            src={imgArrow}
                            alt="next"
                            className="h-[26px] w-[40px] object-contain rotate-180"
                        />
                    </button>
                </div>
            </Container>
        </section>
    );
}
