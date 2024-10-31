import React, { useState } from "react";

function Star({ value, rating, setRating, hover, setHover }) {
  return (
    <div>
      <input
        type="radio"
        name="rating"
        value={value}
        onClick={() => setRating(value)}
      />
      <div
        className="star"
        onMouseEnter={() => setHover(value)}
        onMouseLeave={() => setHover(null)}
      >
        <div
          style={{
            width: "55px",
            height: "55px",
            backgroundColor: value <= (hover || rating) ? "#edaa10" : "grey",
          }}
        ></div>
      </div>
    </div>
  );
}

export default function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <>
      <div>Rating is: {rating}</div>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          const value = index + 1;

          return (
            <Star
              key={index}
              value={value}
              rating={rating}
              hover={hover}
              setRating={setRating}
              setHover={setHover}
            />
          );
        })}
      </div>
    </>
  );
}
