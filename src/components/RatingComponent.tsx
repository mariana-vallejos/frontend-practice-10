import { type FC } from "react";
import { FiStar } from "react-icons/fi";

interface RatingComponentProps {
    rating: number;
    setRating: (rating: number) => void;
}

const RatingComponent: FC<RatingComponentProps> = ({ setRating, rating}) => {

    return (
        <div className="flex bg-white items-center min-w-[600px] py-2">
            <div className="py-2 text-base font-semibold">Rate:</div>
            <div className="flex gap-4 p-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex justify-center px-2">
                        <FiStar
                            size={25}
                            strokeWidth={0}
                            fill={index + 1 <= rating ? "gold" : "#D6DBDF"}
                            cursor="pointer"
                            className="star"
                            onClick={() => setRating(index + 1)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingComponent;
