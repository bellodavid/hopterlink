import React from "react";
import Typography from "@components/ui/typography";

interface FeatureProps {
  icon: React.ReactNode;
  headline: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, headline, description }) => {
  return (
    <div
      className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
        gap-6 text-left max-w-72 items-center"
    >
      <div className="py-4 px-4 rounded-md border max-w-fit border-[#c55e0c]">
        {icon}
      </div>
      <Typography variant="h3" className="text-center text-[#c55e0c]">
        {headline}
      </Typography>
      <Typography
        variant="p"
        className="text-[#c55e0c] max-lg:hidden flex text-center"
      >
        {description}
      </Typography>
    </div>
  );
};

export default Feature;
