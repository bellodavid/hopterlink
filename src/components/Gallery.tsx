"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";

interface Props {
  images: any;
  noNavigation: boolean;
  autoplayDelay?: number; // Optional prop for setting autoplay delay
}

const Gallery = ({ images, noNavigation, autoplayDelay = 3000 }: Props) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-[500px]">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]} // Conditional inclusion of Navigation and Autoplay
        autoplay={{
          delay: autoplayDelay, // Set delay for autoplay
          disableOnInteraction: false, // Continue autoplay even after user interaction
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center relative h-[500px] w-full rounded-md">
              {loading ? (
                <RotatingLines strokeColor="#c55e0c" width="20" />
              ) : null}
              <Image
                objectFit="cover"
                alt="business-images"
                fill
                className="rounded-md"
                onLoad={() => setLoading(false)}
                src={image.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
