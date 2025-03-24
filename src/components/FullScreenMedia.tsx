import React from "react";
import Image from "next/image";

const FullScreenMedia = ({ type, src, overlay = true, children }) => {
  const renderMedia = () => {
    switch (type) {
      case "gif":
        return (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={src}
              alt="Background Animation"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        );
      case "video":
        return (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {renderMedia()}

      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-br 
       from-purple-600/40 
       via-[#c55e0c]/30 
       to-purple-500/40 
       backdrop-blur-[2px]"
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default FullScreenMedia;
