import Image from "next/image";
import React from "react";
import AverageReview from "./AverageReview";
import { Star } from "lucide-react";

const highlightSlides = [
  {
    id: 1,
    imageSrc: "/medium-shot-smiley-woman-desk.jpg",
    textList: ["Discover real expertise.", "Angela Yuo", "Fashion Designer"],
    Stars: 4.5,
    imageDuration: 4,
  },
];

const ImageCarousel = () => {
  return (
    <div className="flex items-center">
      {highlightSlides.map((list) => (
        <div key={list.id} className="" id="slider">
          <div
            className="image-carousel_container2 flex-center rounded-3xl
              overflow-hidden bg-black relative"
          >
            <Image
              src={list.imageSrc}
              alt={list.textList[0]}
              layout="fill"
              objectFit="cover"
            />
            <div
              className="absolute max-md:hidden top-12 left-[5%] z-10 glassmorphism p-4 flex gap-4
                flex-col"
            >
              <div className="">
                <p className="text-md text-start font-bold">Angela Yuo</p>
                <p className="text-start font-bold text-xs">
                  Virtual Assistant
                </p>
              </div>
              {/* <AverageReview size={12} value={list.Stars} /> */}
              <div className="flex-row flex items-center gap-2">
                <Star color="transparent" size={12} fill="#c55e0c" />
                <Star color="transparent" size={12} fill="#c55e0c" />
                <Star color="transparent" size={12} fill="#c55e0c" />
                <Star color="transparent" size={12} fill="#c55e0c" />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
