import React from "react";
import { Skeleton } from "./ui/skeleton";

const SearchLoaders = () => {
  return (
    <>
      <div className="w-full">
        <Skeleton className="h-52 w-[80] my-6 rounded-md bg-secondary items-start p-4" />
        <Skeleton className="h-52 w-[80] my-6 rounded-md bg-secondary items-start p-4" />{" "}
        <Skeleton className="h-52 w-[80] my-6 rounded-md bg-secondary items-start p-4" />{" "}
        <Skeleton className="h-52 w-[80] my-6 rounded-md bg-secondary items-start p-4" />{" "}
        <Skeleton className="h-52 w-[80] my-6 rounded-md bg-secondary items-start p-4" />{" "}
        <Skeleton className="h-52 w-[80] my-6 rounded-md bg-secondary items-start p-4" />
      </div>
    </>
  );
};

export default SearchLoaders;
