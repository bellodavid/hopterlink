import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/cards";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";
import { Verified } from "lucide-react";

interface Props {
  businessOwner: any;
}

const BusinessOwner = ({ businessOwner }: Props) => {
  return (
    <div className="relative mt-4">
      <Card>
        {/* <GridPattern maxOpacity={0.1} numSquares={4} width={100} height={100} /> */}
        <CardHeader>
          <CardTitle className="text-center">Owned By</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="flex flex-col gap-4 items-center">
            <Avatar>
              <AvatarImage
                height={52}
                width={52}
                src={businessOwner?.profile}
              />
              <AvatarFallback className="font-bold">
                {businessOwner?.first_name?.[0]} {businessOwner?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <Typography
              variant={"h5"}
              className="flex-row flex gap-2 items-center font-bold"
            >
              {businessOwner?.first_name} {businessOwner?.last_name}{" "}
              <Verified color="#c55e0c" size={16} />
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessOwner;
