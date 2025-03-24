import React from 'react';
import Image from 'next/image';

const MediaSection = ({ type, src, alt, className }) => {
  const renderMedia = () => {
    switch (type) {
      case 'gif':
        return (
          <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden">
            <Image
              src={src}
              alt={alt || 'Animation'}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        );
      case 'video':
        return (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full rounded-xl object-cover"
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
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#c55e0c]/20 to-purple-500/20 rounded-3xl blur-3xl" />
      <div className="relative">
        {renderMedia()}
      </div>
    </div>
  );
};

export default MediaSection;