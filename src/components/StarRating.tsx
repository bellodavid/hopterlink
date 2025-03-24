import React from "react";
import Star from "./Stars";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} filled={true} index={i} />);
  }

  if (hasHalfStar) {
    stars.push(<Star key="half" filled={true} index={fullStars} />);
    stars.push(
      <svg
        key="half-cover"
        className="star"
        style={{
          animationDelay: `${(fullStars + 1) * 0.1}s`,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <defs>
          <mask id="half-mask">
            <rect x="0" y="0" width="12" height="24" fill="white" />
          </mask>
        </defs>
        <polygon
          points="12 2 15 8.5 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 8.5 12 2"
          mask="url(#half-mask)"
          fill="#FFD700"
          stroke="#FFD700"
          strokeWidth="2"
        />
      </svg>
    );
  }

  while (stars.length < 5) {
    stars.push(<Star key={stars.length} filled={false} index={stars.length} />);
  }

  return <div style={{ display: "flex", alignItems: "center" }}>{stars}</div>;
};

export default StarRating;
