import { useState } from 'react';
import Container from '../Container';
import NewsItem, { type NewsArticle } from '../NewsItem';
import Pagination from '../Pagination';

/**
 * "TIN TỨC SỰ KIỆN" — news list: category tabs, a news-card grid and
 * pagination. Cards use the shared NewsItem component with mock data.
 */

const CATEGORIES = ['TẤT CẢ TIN TỨC', 'TIN SỰ KIỆN', 'THÔNG TIN XÃ HỘI', 'THƯƠNG HIỆU QUỐC GIA'];

// Mock data — replace with a real news feed later.
const ARTICLES: NewsArticle[] = Array.from({ length: 9 }, (_, i) => ({
    image: i % 2 === 0 ? '/images/new-1.jpg' : '/images/new-2.jpg',
    tag: 'Tin tức nổi bật',
    title: 'TAKYFOOD thổi hồn Việt vào văn hoá ẩm thực thế giới',
    date: '20/03/2026',
}));

const imgSketch = '/images/decor-bottom-catalog.jpg';

export default function NewsList() {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

    return (
        <section className="relative w-full overflow-visible bg-taiky-bg z-10">
            <div className="absolute bottom-0 right-0 translate-x-[20%] translate-y-[50%] z-1">
                <img src={imgSketch} alt="bg-banner" />
            </div>
            <Container className="flex flex-col items-center gap-[36px] py-[60px] relative z-10">
                <h2 className="font-stamp font-normal tracking-brand text-[44px] leading-[48px] text-taiky-orange uppercase text-center">
                    TIN TỨC SỰ KIỆN
                </h2>

                {/* Category tabs */}
                <div className="flex w-fit items-center justify-center gap-[48px] border-b border-taiky-lightbrown/40">
                    {CATEGORIES.map((category) => {
                        const active = category === activeCategory;
                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`-mb-[1px] border-b-2 pb-[14px] text-[16px] font-bold uppercase tracking-[0.04em] transition-colors ${
                                    active
                                        ? 'border-taiky-orange text-taiky-orange'
                                        : 'border-transparent text-taiky-brown hover:text-taiky-orange'
                                }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* News grid */}
                <div className="grid w-full grid-cols-3 gap-x-[24px] gap-y-[44px]">
                    {ARTICLES.map((article, i) => (
                        <NewsItem key={`${article.title}-${i}`} {...article} />
                    ))}
                </div>

                <Pagination className="mt-[12px]" />
            </Container>
        </section>
    );
}
