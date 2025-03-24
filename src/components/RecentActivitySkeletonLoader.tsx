import React from "react";
import { Skeleton } from "./ui/skeleton";

const RecentActivitySkeletonLoader = () => {
  return (
    <div
      className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4
        auto-rows-auto gap-4"
    >
      <Skeleton
        className="flex flex-col z-40 p-4 rounded-md gap-6 w-[200px] h-[200px]
          items-center justify-center"
      />
      <Skeleton
        className="flex flex-col z-40 p-4 rounded-md gap-6 w-[200px] h-[200px]
          items-center justify-center"
      />{" "}
      <Skeleton
        className="flex flex-col z-40 p-4 rounded-md gap-6 w-[200px] h-[200px]
          items-center justify-center"
      />{" "}
      <Skeleton
        className="flex flex-col z-40 p-4 rounded-md gap-6 w-[200px] h-[200px]
          items-center justify-center"
      />
    </div>
  );
};

export default RecentActivitySkeletonLoader;
