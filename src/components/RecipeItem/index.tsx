import RecipeMeta from '../RecipeMeta';

const imgBottomBg = '/images/bg-bottom-food.webp';

export type Recipe = {
    title: string;
    people: string;
    time: string;
    difficulty: string;
    image: string;
    url?: string;
};

/**
 * Recipe card — dish photo above an info panel (title + meta). The whole card
 * is one clickable link; hovering anywhere zooms the photo, lifts the card and
 * highlights the title.
 */
export default function RecipeItem({ title, people, time, difficulty, image, url = '#' }: Recipe) {
    // Recipe links point to external pages — open them in a new tab.
    const external = Boolean(url) && url !== '#';
    return (
        <a
            href={url}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            className="group block overflow-hidden rounded-[8px] shadow-card outline-none transition-shadow duration-[450ms] ease-brand hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-taiky-orange focus-visible:ring-offset-2 focus-visible:ring-offset-taiky-bg"
        >
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="aspect-[9/16] w-full object-cover transition-transform duration-[600ms] ease-brand group-hover:scale-[1.06]"
                />
                {/* Light sheen sweep — size-stable hover signature */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-[60%] -translate-x-[160%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[750ms] ease-brand group-hover:translate-x-[260%]"
                />
            </div>
            <div className="relative p-[20px]">
                <img
                    src={imgBottomBg}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10">
                    <h3 className="text-[18px] font-bold leading-[24px] text-taiky-brown transition-colors duration-[450ms] ease-brand group-hover:text-taiky-orange">
                        {title}
                    </h3>
                    <RecipeMeta
                        people={people}
                        time={time}
                        difficulty={difficulty}
                        className="mt-[12px]"
                    />
                </div>
            </div>
        </a>
    );
}
