import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ReadMoreText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClippable, setIsClippable] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkIfClippable = () => {
      const element = textRef.current;
      // Check if the height of the content is greater than twice the line height (approximation for two lines of text)
      if (element) {
        const lineHeight = parseFloat(
          window.getComputedStyle(element).lineHeight
        );
        setIsClippable(element.scrollHeight > 2 * lineHeight);
      }
    };

    checkIfClippable();
    // Re-check when window resizes
    window.addEventListener("resize", checkIfClippable);
    return () => window.removeEventListener("resize", checkIfClippable);
  }, [text]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const style = isExpanded
    ? {}
    : {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "2", // Limit text to 2 lines when not expanded
        WebkitBoxOrient: "vertical",
        cursor: "pointer",
      };

  return (
    <div className="flex flex-col">
      <motion.div
        ref={textRef}
        className="text-center text-sm font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={style}
        onClick={toggleExpanded} // Toggle text expansion
      >
        {text || "No description provided."}
      </motion.div>
      {isClippable && !isExpanded && (
        <p
          className="text-[#c55e0c] text-center text-sm font-bold cursor-pointer"
          onClick={toggleExpanded}
        >
          Read More
        </p>
      )}
    </div>
  );
};

export default ReadMoreText;
