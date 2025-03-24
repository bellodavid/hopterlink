/* eslint-disable @typescript-eslint/naming-convention */
import Image from "next/image";
import React from "react";
import Typography from "./ui/typography";
import { BadgeInfo } from "lucide-react";
import AverageReview from "./AverageReview";

interface Props {
  name?: string;
  loading?: boolean;
  description?: string;
  hours?: string;
  stars: number;
  price_range?: string;
  logo?: any;
  tags?: any;
  review_count?: any;
}

const DetailCard = ({
  logo,
  name,
  loading,
  tags,
  description,
  hours,
  stars,
  review_count,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  price_range,
}: Props) => {
  // const priceRange =
  //   priceRangeMapping[
  //     price_range as keyof typeof priceRangeMapping
  //   ]

  return (
    <>
      <div
        className="h-fit w-[80] max-md:w-full my-8 rounded-md hover:shadow-md flex flex-row max-md:flex-col items-start max-md:items-center
          bg-transparent hover:border-secondary border-[1px]
          border-transparent hover:transition hover:ease-in-out
          ease-in-out p-4"
      >
        <div className="m-2 rounded-md relative overflow-hidden md:w-[150px] max-sm:w-[300px] max-sm:h-[300px] md:h-[150px]">
          <Image src={logo} alt="image" fill />
        </div>
        <div className="w-2/3 max-md:w-full m-2 pl-4 gap-2 flex max-md:items-center flex-col">
          <Typography
            variant={"h3"}
            className="font-bold md:text-start text-center"
          >
            {name}
          </Typography>
          {stars < 1 ? (
            <div className="flex flex-row items-center gap-4 ">
              <p className="text-gray-400 text-xs">No reviews</p>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-4 ">
              <AverageReview size={14} value={stars} />
              <p className="text-gray-400 text-xs">({review_count} reviews)</p>
            </div>
          )}
          <div
            className="rounded-[18px] bg-teal-400/10 border-none mt-[5px] w-fit
              py-2"
          >
            <p className="text-center text-teal-300 text-xs px-2">
              Delivers within {hours} to {} days
            </p>
          </div>
          {description ? (
            <div className="flex flex-row items-start gap-2 mt-6">
              {" "}
              <BadgeInfo size={16} />
              <p
                className="text-start text-xs line-clamp-2 md:line-clamp-3
                  lg:line-clamp-2 w-full"
              >
                {description}
              </p>
            </div>
          ) : (
            ""
          )}
          {tags && tags.length > 0 && (
            <div className="w-full flex gap-2 flex-wrap">
              {tags.map(
                (tag: {
                  slug: React.Key | null | undefined;
                  name:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined;
                }) => (
                  <p
                    key={tag.slug}
                    className="max-w-[100px] truncate bg-teal-400/10 border-none mt-[5px]
                      text-[10px] px-2 py-1 rounded-[18px]"
                  >
                    {tag.name}
                  </p>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailCard;
