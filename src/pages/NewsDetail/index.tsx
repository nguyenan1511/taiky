import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
import BannerImage from '../../components/BannerImage';
import NewsItem from '../../components/NewsItem';
import Reveal from '../../components/Reveal';
import RevealStagger from '../../components/RevealStagger';
import ListState from '../../components/ListState';
import Skeleton from '../../components/Skeleton';
import { useNews, useNewsDetail } from '../../lib/api/queries';
import { img, t, toNewsCard } from '../../lib/api/helpers';
import { useReady } from '../../context/ready';
import { useDocumentMeta } from '../../hooks/usePageMeta';

/**
 * News detail page (`/news/:slug`) — full-bleed hero, date + title, the article
 * body (HTML from `content`), and a "TIN TỨC LIÊN QUAN" related grid.
 */

// Shared prose styling for the API HTML body.
const PROSE =
    'text-left [&_p]:mb-[16px] [&_p]:text-[15px] [&_p]:leading-[26px] lg:[&_p]:text-[16px] lg:[&_p]:leading-[28px] [&_p]:text-taiky-darkbrown ' +
    '[&_h2]:mt-[28px] [&_h2]:mb-[12px] [&_h2]:font-bold [&_h2]:text-[20px] lg:[&_h2]:text-[22px] [&_h2]:text-taiky-brown ' +
    '[&_h3]:mt-[20px] [&_h3]:mb-[8px] [&_h3]:font-bold [&_h3]:text-[18px] [&_h3]:text-taiky-brown ' +
    '[&_b]:text-taiky-brown [&_strong]:text-taiky-brown ' +
    '[&_ul]:my-[12px] [&_ul]:list-disc [&_ul]:pl-[24px] [&_ol]:my-[12px] [&_ol]:list-decimal [&_ol]:pl-[24px] [&_li]:mb-[6px] [&_li]:text-taiky-darkbrown ' +
    '[&_img]:my-[24px] [&_img]:mx-auto [&_img]:rounded-[8px] ' +
    '[&_a]:text-taiky-orange [&_a]:underline';

export default function NewsDetail() {
    const ready = useReady();
    const { slug = '' } = useParams();

    const { data, isLoading, isError, refetch } = useNewsDetail(slug);
    const article = data?.data;

    // SEO meta from the article (falls back to its name/description/image).
    useDocumentMeta(
        {
            title: t(article?.metaTitle) || t(article?.name) || 'TAKYfood',
            description: t(article?.metaDescription) || t(article?.description),
            image: img(article?.metaImage) || img(article?.image),
        },
        Boolean(article)
    );

    // Related news (exclude the current article).
    const { data: relatedData } = useNews({ limit: 6 });
    const related = (relatedData?.data ?? [])
        .filter((n) => n.id !== article?.id)
        .map(toNewsCard)
        .slice(0, 6);

    if (isLoading) {
        return (
            <main className="relative pt-[80px] lg:pt-[120px]">
                <Skeleton className="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[1440/620]" />
                <Container className="flex flex-col items-center gap-[16px] py-[40px]">
                    <Skeleton className="h-[16px] w-[120px] rounded-[6px]" />
                    <Skeleton className="h-[36px] w-[70%] rounded-[8px]" />
                    <Skeleton className="mt-[12px] h-[14px] w-full rounded-[6px]" />
                    <Skeleton className="h-[14px] w-[92%] rounded-[6px]" />
                    <Skeleton className="h-[14px] w-[80%] rounded-[6px]" />
                </Container>
            </main>
        );
    }

    if (!article) {
        return (
            <main className="relative pt-[120px] lg:pt-[160px] min-h-[60vh]">
                <Container>
                    <ListState
                        error={isError}
                        empty={!isError}
                        onRetry={() => refetch()}
                        emptyText="Không tìm thấy bài viết."
                    />
                </Container>
            </main>
        );
    }

    return (
        <main className="relative">
            {/* Hero */}
            <section className="relative w-full overflow-hidden pt-[80px] lg:pt-[120px]">
                <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[1440/620]">
                    <BannerImage
                        image={img(article.image)}
                        imageMb={img(article.imageMb) || img(article.image)}
                        alt={t(article.name)}
                        className={`absolute inset-0 h-full w-full object-cover ${
                            ready ? 'animate-hero-zoom' : 'opacity-0'
                        }`}
                    />
                </div>
            </section>

            {/* Article */}
            <section className="relative w-full bg-taiky-bg">
                <Container className="max-w-[886px] py-[40px] lg:py-[60px]">
                    <Reveal>
                        {article.publishDate && (
                            <p className="text-center text-[14px] font-bold tracking-[0.06em] text-taiky-orange">
                                {article.publishDate}
                            </p>
                        )}
                        <h1 className="mt-[12px] text-center font-stamp font-normal tracking-brand text-[28px] leading-[34px] lg:text-[40px] lg:leading-[46px] text-taiky-orange uppercase">
                            {t(article.name)}
                        </h1>
                        {article.content && t(article.content) ? (
                            <div
                                className={`mt-[24px] lg:mt-[32px] ${PROSE}`}
                                dangerouslySetInnerHTML={{ __html: t(article.content) }}
                            />
                        ) : (
                            <p className="mt-[24px] text-center text-[15px] leading-[26px] text-taiky-lightbrown">
                                {t(article.description)}
                            </p>
                        )}
                    </Reveal>
                </Container>
            </section>

            {/* Related news */}
            {related.length > 0 && (
                <section className="relative w-full overflow-hidden bg-taiky-bg">
                    <Container className="flex flex-col items-center gap-[28px] lg:gap-[36px] py-[40px] lg:py-[60px]">
                        <Reveal>
                            <h2 className="font-stamp font-normal tracking-brand text-[26px] leading-[32px] lg:text-[36px] lg:leading-[44px] text-taiky-orange uppercase text-center">
                                Tin tức liên quan
                            </h2>
                        </Reveal>
                        <RevealStagger className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-[44px]">
                            {related.map((card) => (
                                <NewsItem key={card.id} {...card} />
                            ))}
                        </RevealStagger>
                    </Container>
                </section>
            )}
        </main>
    );
}
