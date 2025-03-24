"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = () => {
  // const { theme, systemTheme } = useTheme();
  // const [mounted, setMounted] = useState(false);

  // // When mounted on client, now we can show the UI
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

  // const currentTheme = theme === "system" ? systemTheme : theme;

  return <img src="/Hopterlink png.png" alt="Logo" className="mr-3 w-20" />;
};

export default Logo;
