import React, { useState } from "react";

const RatingStar = ({ratingVal}) => {
    const [rating, setRating] = useState(ratingVal??0);
    const [hover, setHover] = useState(ratingVal??0);
    /* set Default and callback to state */

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}

                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star"><i className="bi bi-star-fill"></i></span>
                    </button>
                );
            })}
        </div>
    );
};

export default RatingStar;