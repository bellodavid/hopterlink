import React from "react";

const PathContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 justify-center w-full">
      <div className="flex w-full max-w-screen h-full">{children}</div>
    </div>
  );
};

export default PathContainer;
