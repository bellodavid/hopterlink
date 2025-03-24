import React, { useState, useEffect } from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "./ui/credenza";
import ShinyButton from "./magicui/shiny-button";
import { Switch } from "@/components/ui/switch";
import ListItem from "./ListItem";
import Link from "next/link";
import { useCategories } from "@/contexts/ReUsableData";
import { toast } from "./ui-hooks/use-toast";
import { Button } from "./ui/button";

const ManageListing = () => {
  // Extracting businessData from context
  const { businessData } = useCategories();

  // Using useState with a function to initialize state only on the first render
  const [isActive, setIsActive] = useState(
    () => businessData?.is_active || false
  );

  // Function to toggle active status and update backend
  const toggleActiveStatus = async () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);

    const formData = new FormData();
    formData.append("is_active", newActiveState);

    try {
      const response = await fetch(`/api/business/${businessData.id}`, {
        method: "PATCH",
        body: formData,
      });
      const data = await response.json();
      console.log("Updated active status:", data);
      toast({
        title: "Business Status",
        description: "Your business status has been updated.",
      });
    } catch (error) {
      console.error("Failed to update active status:", error);
      toast({
        title: "Error",
        description: "Failed to update business status.",
      });
    }
  };

  // Effect to update local state if businessData changes externally
  useEffect(() => {
    setIsActive(businessData?.is_active || false);
  }, [businessData]);

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div className="flex items-center gap-4">
          <Button
            variant={"secondary"}
            className="flex gap-2 items-center min-w-60"
          >
            Manage your business
          </Button>{" "}
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Manage your listing</CredenzaTitle>
          <CredenzaDescription>
            Make changes to your business.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <>
            <div className="flex items-center justify-between">
              Availability Status{" "}
              <Switch checked={isActive} onCheckedChange={toggleActiveStatus} />
            </div>
            {/* <div className="flex items-center justify-between my-2">
              Let users see your contact information <Switch checked={showContact} onCheckedChange={toggleContactVisibility} />
            </div> */}
            <div>
              <Link href={"/manage-your-business"}>
                <ListItem title="Edit your business profile" />
              </Link>
            </div>
          </>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};

export default ManageListing;
