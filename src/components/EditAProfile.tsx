"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
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
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui-hooks/use-toast";
import { useRouter } from "next/navigation";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "./ui/button";

type UserInfo = {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  profile: string | null;
  email: string | null;
  is_business: boolean;
};

type Props = {
  userInfo: UserInfo;
};

const EditAProfile = ({ userInfo }: Props) => {
  const router = useRouter();
  const [preview, setPreview] = useState(userInfo?.profile || "");
  const [firstName, setFirstName] = useState(userInfo?.first_name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [lastName, setLastName] = useState(userInfo?.last_name || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [profile, setProfile] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isBusiness, setIsBusiness] = useState(userInfo?.is_business || false);
  const [loading, setLoading] = useState(false);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files, displayUrl } = getImageData(event);
    setPreview(displayUrl);
    setImageFile(files[0]);
  };

  const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
    const dataTransfer = new DataTransfer();
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(files[0]);

    return { files, displayUrl };
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    if (imageFile) {
      formData.append("profile", imageFile); // Append the actual file
    }

    try {
      const response = await fetch("/api/account", {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        toast({
          title: "Error Occurred",
          description:
            "Your profile could not be updated. Check if you have a stable internet connection.",
        });
      }
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Occurred",
        description: "Your profile could not be updated. Try again later.",
      });
      setLoading(false);
    }
  };

  const isFormValid =
    firstName && lastName && email && phone && (profile || "") !== ""; // Check if all required fields are filled

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div className="flex items-center gap-4">
          <Button className="flex gap-2 items-center min-w-60">
            Edit your profile
          </Button>{" "}
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Edit your profile</CredenzaTitle>
          <CredenzaDescription>
            Make changes to your profile.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="my-4 flex flex-col gap-4">
            <div className="flex items-center justify-center w-full">
              <Avatar className="w-24 h-24 justify-center flex">
                <AvatarImage src={preview} onLoad={() => <RotatingLines />} />
                <AvatarFallback>
                  {userInfo?.first_name?.[0]} {userInfo?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <Input
              type="file"
              onChange={handleImageChange}
              placeholder="Change your profile picture"
            />
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="text-[16px]"
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="text-[16px]"
            />
            <Input
              type="tel"
              placeholder="Phone number"
              disabled
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-[16px]"
            />
            <Input
              type="email"
              placeholder="Email"
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-[16px]"
            />
            <Textarea
              placeholder="Your Bio"
              value={profile || ""}
              onChange={(e) => setProfile(e.target.value)}
              className="border-2 border-border text-[16px]"
            />
            <div
              onClick={handleSubmit} // Disable if the form is not valid or dirty
              className={`w-full justify-center flex "cursor-pointer`}
            >
              {loading ? (
                <RotatingLines strokeColor="#c55e0c" width="20" />
              ) : (
                <ShinyButton text="Save Changes" className="w-full" />
              )}
            </div>
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};

export default EditAProfile;
