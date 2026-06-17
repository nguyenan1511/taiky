/**
 * Responsive banner image from the page CMS: serves the mobile asset
 * (`imageMb`) below the `md` breakpoint and the desktop asset (`image`) above,
 * each falling back to the other when one is missing. Renders nothing if
 * neither URL is present (callers can show their own fallback).
 */
type BannerImageProps = {
    image?: string | null;
    imageMb?: string | null;
    alt?: string;
    className?: string;
};

export default function BannerImage({
    image,
    imageMb,
    alt = '',
    className = '',
}: BannerImageProps) {
    const desktop = image || imageMb || '';
    const mobile = imageMb || image || '';
    if (!desktop) return null;

    return (
        <picture>
            <source media="(max-width: 767px)" srcSet={mobile} />
            <img src={desktop} alt={alt} className={className} />
        </picture>
    );
}
