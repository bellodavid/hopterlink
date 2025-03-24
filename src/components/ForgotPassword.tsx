"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Credenza,
  CredenzaBody,
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
import axios from "axios";
import { toast } from "./ui-hooks/use-toast";

// Validation schema using zod
const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/password-reset/", data);
      if (response.status === 201) {
        setEmailSent(true); // Set emailSent to true when the email is successfully sent
        toast({
          title: "Password reset sent",
          description:
            "Your password reset email has been successfully sent. Check your spam or junk folder if you can't find it in your inbox.",
        });
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessages = error.response.data;
        if (typeof errorMessages === "object") {
          for (const key in errorMessages) {
            if (Array.isArray(errorMessages[key])) {
              errorMessages[key].forEach((message: string) => {
                toast({
                  title: "Password Reset",
                  description: message,
                  variant: "destructive",
                });
              });
            } else {
              toast({
                title: "Password Reset Error",
                description: errorMessages[key],
                variant: "destructive",
              });
            }
          }
        } else {
          toast({
            title: "Password Reset Error",
            description: errorMessages,
          });
        }
      }
    }
    setLoading(false);
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <div className="flex justify-end w-full text-xs text-[#c55e0c] my-4 cursor-pointer">
          Forgot your password
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Forgot Password</CredenzaTitle>
          <CredenzaDescription>
            Don't worry! It happens. We'll get you right back in.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 z-50">
            <div>
              <Label>Email</Label>
              <Input
                {...register("email")}
                placeholder="Email"
                disabled={emailSent}
              />
              {errors.email && (
                <div className="w-full justify-end flex mt-2 text-xs text-red-500">
                  {errors.email.message}
                </div>
              )}
            </div>
            <Button
              type="submit"
              variant={"default"}
              className="w-full"
              disabled={loading || emailSent} // Disable button when loading or email is sent
            >
              <div className="text-white">
                {emailSent
                  ? "Password reset email sent"
                  : loading
                  ? "Sending your reset email..."
                  : "Send Password Reset Email"}
              </div>
            </Button>
          </form>
        </CredenzaBody>
        <CredenzaFooter className="justify-center flex w-full">
          <p className="text-xs">Ensure you have access to this email.</p>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default ForgotPassword;
