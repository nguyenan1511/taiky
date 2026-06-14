import { useState } from 'react';

const imgThumb = '/images/bg-video.png';
// Demo clip — swap for the real TAKYfood video when available.
const videoId = 'APd6J4EM5NU';
const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

/**
 * Story hero — full-bleed headquarters render shown as a poster; clicking the
 * play button swaps it for the embedded video and starts playback.
 */
export default function StoryHero() {
    const [playing, setPlaying] = useState(false);

    return (
        <section className="relative w-full overflow-hidden pt-[120px]">
            <div className="relative w-full aspect-[1440/690] overflow-hidden bg-black">
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
                        <img
                            src={imgThumb}
                            alt="Trụ sở TAKYfood"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* Play badge */}
                        <span className="absolute left-1/2 top-1/2 flex h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none">
                            <svg
                                width="28"
                                height="32"
                                viewBox="0 0 28 32"
                                fill="currentColor"
                                className="ml-[4px] text-taiky-orange"
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
