import { MessageCircleDashed } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/cards";
import GridPattern from "./magicui/animated-grid-patter";

interface Props {
  businessInfo: any;
}

const BusinessCTA = ({ businessInfo }: Props) => {
  return (
    <div className="relative mt-4">
      <Card>
        <GridPattern maxOpacity={0.1} numSquares={4} width={100} height={100} />
        <CardHeader>
          <CardTitle className="text-center">
            Connect with {businessInfo?.business_name} right through Hopterlink
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full flex gap-2" variant={"secondary"}>
            <MessageCircleDashed /> Message Owner
          </Button>{" "}
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessCTA;
