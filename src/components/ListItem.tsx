import React from "react";
import Typography from "./ui/typography";
import { ChevronRight } from "lucide-react";

type Props = {
  title: string;
};

const ListItem = ({ title }: Props) => {
  return (
    <div className="w-full flex justify-between items-center my-8 cursor-pointer">
      <Typography variant={"h4"}>{title}</Typography>
      <ChevronRight className="text-[#c55e0c]" />
    </div>
  );
};

export default ListItem;
