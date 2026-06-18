import { Link } from 'react-router-dom';

export type NewsArticle = {
    image: string;
    tag: string;
    title: string;
    date: string;
    url?: string;
};

/**
 * News card — article image above a tag, title and date. The whole card is one
 * clickable link to the article (`/news/:slug`). Hover (Warm Heritage Tactile
 * motion, size-stable): a light sheen sweeps across the image, a warm orange
 * shadow glows in, and the title turns orange. Nothing resizes or shifts.
 */
export default function NewsItem({ image, tag, title, date, url = '#' }: NewsArticle) {
    return (
        <Link
            to={url}
            className="group flex flex-col rounded-[8px] outline-none focus-visible:ring-2 focus-visible:ring-taiky-orange focus-visible:ring-offset-2 focus-visible:ring-offset-taiky-bg"
        >
            <div className="relative overflow-hidden rounded-[8px] shadow-card transition-shadow duration-[450ms] ease-brand group-hover:shadow-card-hover">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="aspect-[414/300] w-full object-cover"
                />
                {/* Light sheen sweep — size-stable hover signature */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-[60%] -translate-x-[160%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[750ms] ease-brand group-hover:translate-x-[260%]"
                />
            </div>
            <span className="mt-[16px] text-[13px] text-taiky-orange">{tag}</span>
            <h3 className="mt-[8px] line-clamp-2 text-[18px] font-bold leading-[26px] text-taiky-brown transition-colors duration-[450ms] ease-brand group-hover:text-taiky-orange">
                {title}
            </h3>
            <span className="mt-[10px] text-[13px] text-taiky-lightbrown">{date}</span>
        </Link>
    );
}
