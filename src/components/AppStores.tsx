"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

type Props = {};

const AppStores = (props: Props) => {
  const { theme } = useTheme();
  return (
    <div className="relative w-fit flex">
      <div className="relative w-40 h-40">
        <Image
          alt="app-store"
          src={theme === "light" ? "/App Store (1).png" : "/App Store.png"}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="relative w-40 h-40 ml-4">
        <Image
          alt="google-play"
          src={theme === "light" ? "/Google Play (1).png" : "/Google Play.png"}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default AppStores;
