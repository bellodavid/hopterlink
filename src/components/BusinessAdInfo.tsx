import React from "react";
import { Card, CardContent, CardFooter } from "./ui/cards";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link2, Map, Phone } from "lucide-react";
import Link from "next/link";
import Typography from "./ui/typography";

interface Props {
  businessInfo: any;
}

const BusinessAdInfo = ({ businessInfo }: Props) => {
  return (
    <Card>
      <CardContent className="gap-4 flex flex-col pt-4">
        <div className="flex flex-row justify-between items-center">
          {businessInfo?.website ? (
            <Link href={businessInfo?.website} className="font-bold ">
              {businessInfo?.website}{" "}
            </Link>
          ) : (
            ""
          )}
          <Link2 />
        </div>
        <Separator />
        <div className="flex flex-row justify-between items-center">
          {businessInfo?.is_active ? (
            <div className=" bg-green-400/10 px-2 rounded-full py-2 text-sm">
              Active
            </div>
          ) : (
            <div className="bg-yellow-300/20 text-sm px-2 py-1 rounded-full">
              Away
            </div>
          )}
        </div>
        <Separator />
        <div className="gap-4 flex flex-col">
          <Typography className="" variant={"h5"}>
            Get Directions
          </Typography>
          <div className="flex flex-row items-center justify-between gap-2">
            <Typography className="text-xs font-bold" variant={"h5"}>
              {businessInfo?.location}{" "}
            </Typography>
            <Map />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Separator />{" "}
      </CardFooter>
    </Card>
  );
};

export default BusinessAdInfo;
