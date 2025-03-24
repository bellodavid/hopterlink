import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react"; // Assuming you're using lucide-react for icons
import axios from "axios";
import { toast } from "./ui-hooks/use-toast";
import ListItem from "./ListItem";
import { useRouter } from "next/navigation";

// Validation schema using zod
const schema = z
  .object({
    newpassword1: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must be no longer than 64 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    newpassword2: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long"),
  })
  .refine((data) => data.newpassword1 === data.newpassword2, {
    message: "Passwords don't match",
    path: ["newpassword2"], // Path to the error
  });

type FormData = z.infer<typeof schema>;

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/password-change/", data);
      if (response && response.status === 201) {
        toast({
          title: "Password Change",
          description: `Your password has been changed successfully.`,
        });
        reset();
        setTimeout(() => {
          router.back();
        }, 2000);
        // Reset the form fields after a successful password change
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const apiErrors = error.response.data;
        for (const key in apiErrors) {
          if (apiErrors.hasOwnProperty(key)) {
            setError(key as keyof FormData, {
              type: "manual",
              message: apiErrors[key][0],
            });
          }
        }
        toast({
          title: "Password Change failed",
          description:
            "Ensure your new password is not similar to your names for security.",
        });
      } else {
        // Handle unexpected errors
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
        });
      }
    }
    setLoading(false);
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div>
          <ListItem title="Change Password" />
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Change Your Password</CredenzaTitle>
          <CredenzaDescription>
            Please keep your password safe
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 z-50">
            <div>
              <Label>New Password</Label>
              <div className="relative">
                <Input
                  {...register("newpassword1")}
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="text-[16px]"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              {errors.newpassword1 && (
                <div className="w-full justify-end flex mt-2 text-xs text-red-500">
                  {errors.newpassword1.message}
                </div>
              )}
            </div>
            <div>
              <Label>Confirm Password</Label>
              <div className="relative">
                <Input
                  {...register("newpassword2")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="text-[16px]"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              {errors.newpassword2 && (
                <div className="w-full justify-end flex mt-2 text-xs text-red-500">
                  {errors.newpassword2.message}
                </div>
              )}
            </div>
            <Button
              type="submit"
              variant={"default"}
              className="w-full"
              disabled={loading}
            >
              <div className="text-white">
                {loading ? "Changing..." : "Change Password"}
              </div>
            </Button>
          </form>
        </CredenzaBody>
        <CredenzaFooter className="justify-center flex w-full"></CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default ChangePassword;
