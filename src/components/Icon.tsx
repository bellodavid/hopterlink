import React from "react";
import { icons } from "lucide-react";

interface LucideProps {
  color?: string;
  size?: number;
  name: string; // Updated to ensure 'name' is always a string
}

const Icon = ({ name, color, size }: LucideProps) => {
  const LucideIcon = icons[name as keyof typeof icons];

  // Handle the case where the icon is not found
  if (!LucideIcon) {
    console.error(`Icon "${name}" not found in lucide-react-native`);
    return null;
  }

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
