import { useState } from 'react';
import BannerImage from '../BannerImage';
import { usePage } from '../../lib/api/queries';
import { PAGE, pageSection } from '../../lib/api/pages';

const imgThumb = '/images/bg-video.webp';
const imgThumbMb = '/images/bg-video-mb.jpg';
const FALLBACK_VIDEO_ID = 'APd6J4EM5NU';

/** Build a YouTube embed (autoplay) URL from a watch / share / embed link. */
function youtubeEmbed(url?: string): string {
    const id = url?.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1] ?? FALLBACK_VIDEO_ID;
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

/**
 * Story hero — full-bleed poster; clicking play swaps in the embedded video.
 * Video link comes from `GET /pages/ABOUT-US` (section 1 `linkVideo`) and the
 * poster from section 2, with local fallbacks.
 */
export default function StoryHero() {
    const [playing, setPlaying] = useState(false);

    const { data } = usePage(PAGE.ABOUT_US);
    const videoSrc = youtubeEmbed(pageSection(data?.data, '1')?.linkVideo);
    const poster = pageSection(data?.data, '2');
    const hasPoster = false;
    // const hasPoster = Boolean(poster?.image || poster?.imageMb);

    return (
        <section className="relative w-full overflow-hidden pt-[80px] lg:pt-[120px]">
            <div className="relative w-full aspect-[390/754] lg:aspect-[1440/690] overflow-hidden bg-black">
                {playing ? (
                    <iframe
                        src={videoSrc}
                        title="TAKYfood"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        aria-label="Phát video"
                        className="group absolute inset-0 h-full w-full cursor-pointer"
                    >
                        {hasPoster ? (
                            <BannerImage
                                image={poster?.image}
                                imageMb={poster?.imageMb}
                                alt="Trụ sở TAKYfood"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        ) : (
                            <BannerImage
                                image={imgThumb}
                                imageMb={imgThumbMb}
                                alt="Trụ sở TAKYfood"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        )}
                        {/* Play badge */}
                        <span className="absolute left-1/2 top-1/2 flex h-[56px] w-[56px] lg:h-[80px] lg:w-[80px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none">
                            <svg
                                width="28"
                                height="32"
                                viewBox="0 0 28 32"
                                fill="currentColor"
                                className="ml-[4px] h-[22px] w-[20px] lg:h-[32px] lg:w-[28px] text-taiky-orange"
                                aria-hidden="true"
                            >
                                <path d="M2 2.5v27a2 2 0 0 0 3.03 1.71l23-13.5a2 2 0 0 0 0-3.42l-23-13.5A2 2 0 0 0 2 2.5Z" />
                            </svg>
                        </span>
                    </button>
                )}
            </div>
        </section>
    );
}
