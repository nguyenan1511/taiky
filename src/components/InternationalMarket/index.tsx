import { useRef, useState } from 'react';
import Container from '../Container';

/**
 * "THỊ TRƯỜNG QUỐC TẾ" — export markets: an interactive world map above a
 * per-continent country breakdown.
 *
 * The map is 5 continent layers (player-1…5) at the FULL map frame, stacked
 * with `inset-0` so they line up exactly. Hover is detected by sampling each
 * layer's pixel alpha under the cursor — so it always highlights the exact
 * continent you're over, regardless of shape. `origin` (~continent centre)
 * makes the pop scale in place.
 */
type Continent = { key: string; src: string; alt: string; origin: string };

const CONTINENTS: Continent[] = [
    { key: 'americas', src: '/images/player-1.webp', alt: 'Châu Mỹ', origin: '11% 42%' },
    { key: 'europe', src: '/images/player-3.webp', alt: 'Châu Âu', origin: '44% 16%' },
    { key: 'africa', src: '/images/player-2.webp', alt: 'Châu Phi', origin: '46% 52%' },
    { key: 'asia', src: '/images/player-5.webp', alt: 'Châu Á', origin: '70% 28%' },
    { key: 'oceania', src: '/images/player-4.webp', alt: 'Châu Đại Dương', origin: '80% 62%' },
];

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

const imgDecorTopRight = '/images/decor-core-value.webp';

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
    const [hovered, setHovered] = useState<string | null>(null);

    // Offscreen canvas per layer for pixel-alpha hit-testing.
    const samplers = useRef<
        Record<string, { ctx: CanvasRenderingContext2D; w: number; h: number }>
    >({});

    const cacheSampler = (key: string, imgEl: HTMLImageElement) => {
        const w = imgEl.naturalWidth;
        const h = imgEl.naturalHeight;
        if (!w || !h) return;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(imgEl, 0, 0);
        samplers.current[key] = { ctx, w, h };
    };

    // On move, find the topmost layer whose pixel under the cursor is opaque.
    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const fx = (e.clientX - rect.left) / rect.width;
        const fy = (e.clientY - rect.top) / rect.height;
        let found: string | null = null;
        for (const c of CONTINENTS) {
            const s = samplers.current[c.key];
            if (!s) continue;
            const px = Math.min(s.w - 1, Math.max(0, Math.floor(fx * s.w)));
            const py = Math.min(s.h - 1, Math.max(0, Math.floor(fy * s.h)));
            try {
                if (s.ctx.getImageData(px, py, 1, 1).data[3] > 20) {
                    found = c.key;
                    break;
                }
            } catch {
                /* ignore */
            }
        }
        if (found !== hovered) setHovered(found);
    };

    return (
        <section className="relative w-full overflow-hidden bg-taiky-bg">
            <div className="absolute hidden lg:block top-0 right-0 mix-blend-color-burn">
                <img src={imgDecorTopRight} alt="bg-banner" />
            </div>
            <Container className="flex flex-col items-center gap-[20px] lg:gap-[24px] py-[40px]">
                <h2 className="font-stamp font-normal tracking-brand text-[26px] leading-[32px] lg:text-[48px] lg:leading-[44px] text-taiky-orange uppercase text-center">
                    THỊ TRƯỜNG QUỐC TẾ
                </h2>
                <p className="text-center text-[15px] leading-[22px] lg:text-[18px] lg:leading-[26px] tracking-[0.04em] text-taiky-lightbrown uppercase">
                    Chúng tôi đã xuất khẩu đến{' '}
                    <span className="font-bold text-taiky-brown">59 quốc gia</span>
                </p>

                {/* World map — 5 full-frame layers; hover detected by pixel alpha so
                    the exact continent under the cursor highlights. */}
                <div
                    className="relative w-full aspect-[1280/781]"
                    onMouseMove={handleMove}
                    onMouseLeave={() => setHovered(null)}
                >
                    {CONTINENTS.map((c) => {
                        const active = hovered === c.key;
                        const dimmed = hovered !== null && !active;
                        return (
                            <img
                                key={c.key}
                                src={c.src}
                                alt={c.alt}
                                onLoad={(e) => cacheSampler(c.key, e.currentTarget)}
                                style={{ transformOrigin: c.origin }}
                                className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-[transform,opacity,filter] duration-[400ms] ease-brand ${
                                    active
                                        ? 'z-20 scale-[1.05] drop-shadow-[0_10px_26px_rgba(231,119,7,0.5)]'
                                        : ''
                                } ${dimmed ? 'opacity-40' : 'opacity-100'}`}
                            />
                        );
                    })}
                </div>

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
