import Container from '../Container';

/**
 * "THỊ TRƯỜNG QUỐC TẾ" — export markets: the world map (with flame markers)
 * above a per-continent country breakdown laid out in two columns.
 */

const imgMap = '/images/map.png';

type Region = { name: string; count: number; countries: string };

const LEFT_REGIONS: Region[] = [
    {
        name: 'CHÂU Á',
        count: 13,
        countries:
            'Campuchia, Lào, Nhật Bản, Hàn Quốc, Đài Loan, Trung Quốc, Philippines, Malaysia, Indonesia, Thái Lan, Ả Rập Saudi, Các Tiểu vương quốc Ả Rập Thống nhất, Uzbekistan',
    },
    { name: 'CHÂU ĐẠI DƯƠNG', count: 3, countries: 'Úc, New Zealand, Fiji' },
    { name: 'CHÂU MỸ', count: 3, countries: 'Hoa Kỳ, Canada, Chile' },
];

const RIGHT_REGIONS: Region[] = [
    {
        name: 'CHÂU ÂU',
        count: 14,
        countries:
            'Nga, Serbia, Hà Lan, Anh, Na Uy, Phần Lan, Ba Lan, Pháp, Đức, Czechia, Đan Mạch, Thụy Điển, Thụy Sĩ, Slovakia',
    },
    { name: 'CHÂU PHI', count: 1, countries: 'Ma Rốc' },
];

const imgDecorTopRight = '/images/decor-core-value.png';

function RegionRow({ name, count, countries }: Region) {
    return (
        <div className="flex gap-[10px] text-[16px] leading-[26px]">
            <span className="shrink-0 font-bold uppercase text-taiky-orange">
                {name} ({count}):
            </span>
            <span className="text-taiky-lightbrown">{countries}</span>
        </div>
    );
}

export default function InternationalMarket() {
    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <div className="absolute top-0 right-0 mix-blend-color-burn">
                <img src={imgDecorTopRight} alt="bg-banner" />
            </div>
            <Container className="flex flex-col items-center gap-[20px] lg:gap-[24px] py-[40px]">
                <h2 className="font-stamp font-normal tracking-brand text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] text-taiky-orange uppercase text-center">
                    THỊ TRƯỜNG QUỐC TẾ
                </h2>
                <p className="text-center text-[15px] leading-[22px] lg:text-[18px] lg:leading-[26px] tracking-[0.04em] text-taiky-lightbrown uppercase">
                    Chúng tôi đã xuất khẩu đến{' '}
                    <span className="font-bold text-taiky-brown">59 quốc gia</span>
                </p>

                <img src={imgMap} alt="Bản đồ thị trường xuất khẩu TAKYfood" className="w-full" />

                <div className="mt-[8px] grid w-full grid-cols-1 lg:grid-cols-2 gap-x-[64px] gap-y-[20px] lg:gap-y-[28px]">
                    <div className="flex flex-col gap-[28px]">
                        {LEFT_REGIONS.map((region) => (
                            <RegionRow key={region.name} {...region} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-[28px]">
                        {RIGHT_REGIONS.map((region) => (
                            <RegionRow key={region.name} {...region} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
