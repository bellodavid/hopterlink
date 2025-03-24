import React, { type CSSProperties } from "react";

// Modify these
const MAIN_CIRCLE_SIZE = 210;
const MAIN_CIRCLE_OPACITY = 0.24;
const NUM_CIRCLES = 8;

const Ripple = React.memo(
  React.forwardRef<HTMLDivElement>((props, ref) => {
    const circleProps: CSSProperties = {
      width: MAIN_CIRCLE_SIZE,
      height: MAIN_CIRCLE_SIZE,
      opacity: MAIN_CIRCLE_OPACITY,
      animationDelay: "0s",
    };

    return (
      <div
        ref={ref}
        className="absolute left-1/2 top-1/2 h-full w-full overflow-visible"
      >
        {Array.from({ length: NUM_CIRCLES }, (_, i) => (
          <div
            key={i}
            className={`absolute -translate-x-1/2 -translate-y-1/2 animate-ripple
              rounded-full bg-neutral-400`}
            style={{
              ...circleProps,
              width: ((circleProps.width as number) ?? 0) + i * 70,
              height: ((circleProps.height as number) ?? 0) + i * 70,
              opacity: (circleProps.opacity as number) - i * 0.03,
              animationDelay: `${i * 0.06}s`,
            }}
          />
        ))}
      </div>
    );
  })
);

Ripple.displayName = "Ripple";

export default Ripple;
