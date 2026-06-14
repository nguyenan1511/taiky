/**
 * Recipe meta row — servings · time · difficulty, with orange icons.
 * Shared by RecipeItem (cards) and TodayEat (slider).
 */

const iconPeople = '/images/profile-2user.svg';
const iconClock = '/images/clock.svg';
const iconDifficulty = '/images/ForkKnife.svg';

export type RecipeMetaProps = {
    people: string;
    time: string;
    difficulty: string;
    /** Override the wrapper (text size / gaps) per usage. */
    className?: string;
};

export default function RecipeMeta({ people, time, difficulty, className = '' }: RecipeMetaProps) {
    return (
        <div
            className={`flex flex-wrap items-center gap-x-[18px] gap-y-[8px] text-[13px] text-taiky-brown ${className}`}
        >
            <span className="flex items-center gap-[6px]">
                <img src={iconPeople} alt="" className="h-[18px] w-[18px]" />
                {people}
            </span>
            <span className="flex items-center gap-[6px]">
                <img src={iconClock} alt="" className="h-[18px] w-[18px]" />
                {time}
            </span>
            <span className="flex items-center gap-[6px]">
                <img src={iconDifficulty} alt="" className="h-[18px] w-[18px]" />
                Độ khó: {difficulty}
            </span>
        </div>
    );
}
