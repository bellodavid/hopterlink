import React from "react";

interface StarProps {
  filled: boolean;
  index: number;
}

const Star: React.FC<StarProps> = ({ filled, index }) => {
  return (
    <svg
      className={`star ${filled ? "filled" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <polygon points="12 2 15 8.5 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 8.5 12 2" />
    </svg>
  );
};

export default Star;
