/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import axios from "axios";
import { Clock, StopCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import AverageReview from "./AverageReview";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const RecentlyViewed = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const fetchRecents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/recently-viewed/");
      setLoading(false);
      setBusinesses(response.data.results);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (session) {
      void fetchRecents();
    }
  }, [session]);

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div className="flex cursor-pointer flex-row items-center gap-2 pl-2 text-sm">
          <Clock size={14} /> Recents
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Recents</CredenzaTitle>
          <CredenzaDescription>
            Businesses you have recently visited would be listed here.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          {loading ? (
            <div className="flex items-center justify-center p-10">
              <RotatingLines height="20" width="20" strokeColor="#c55e0c" />
            </div>
          ) : (
            <>
              {businesses.length > 0 ? (
                <ScrollArea className="h-96">
                  <ul className="px-4 my-2">
                    {businesses.map((business) => (
                      <>
                        <Link href={`/business/${business.id}`}>
                          <div className="flex gap-1 flex-col shadow-md rounded-md px-2 py-1 my-2">
                            <div className="flex flex-row items-center justify-between mt-2">
                              <li key={business.id} className="my-2">
                                {business.business_name}
                              </li>
                              {business.average_rating < 1 ? (
                                <p className="text-xs">No reviews</p>
                              ) : (
                                <AverageReview
                                  size={14}
                                  value={business.average_rating}
                                />
                              )}{" "}
                            </div>
                            <div>
                              <p className="text-xs text-secondary-foreground">
                                {business.location}
                              </p>
                            </div>
                          </div>
                        </Link>
                        {/* <Separator /> */}
                      </>
                    ))}
                  </ul>
                </ScrollArea>
              ) : (
                <div className="flex items-center flex-row gap-4 justify-center h-[100%] w-full">
                  {" "}
                  <StopCircle />
                  <p className="">You haven't visited any businesses.</p>
                </div>
              )}
            </>
          )}
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button variant={"destructive"}>Close</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default RecentlyViewed;
