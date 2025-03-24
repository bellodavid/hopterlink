/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { toast } from "@/components/ui-hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Logo from "./Logo";

const formSchema = z
  .object({
    new_password1: z
      .string()
      .min(8, "New Password must be at least 8 characters long")
      .max(64, "New Password must be no longer than 64 characters")
      .regex(/[a-z]/, "New Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "New Password must contain at least one uppercase letter")
      .regex(/\d/, "New Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "New Password must contain at least one special character"
      ),
    new_password2: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.new_password1 === data.new_password2, {
    message: "Passwords don't match",
    path: ["new_password2"], // Path to the error
  });
type UserFormValue = z.infer<typeof formSchema>;
interface Props {
  uid: string | string[];
  token: string | string[];
}
export default function PasswordReset({ uid, token }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    new_password1: "",
    new_password2: "", // Add the 'password' field to the default values
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true); // Set loading to true when submitting
    try {
      const payload = {
        uid: uid,
        token: token,
        new_password1: data.new_password1,
        new_password2: data.new_password2,
      };
      const response = await axios.post(
        "/api/confirm-password-reset/",
        JSON.stringify(payload)
      );

      if (response.status === 201) {
        toast({
          title: "Password changed successfully",
          description:
            "You have successfully changed your password. Sign in with your new password",
        });
        router.push("/login");
      }

      setLoading(false);
    } catch (error: any) {
      // Check if the error response exists and if it contains error data
      if (error.response && error.response.data) {
        const errorMessages = error.response.data; // Extract error messages from the API response

        // If errorMessages is an object, check if it has keys with the error array.
        if (typeof errorMessages === "object") {
          for (const key in errorMessages) {
            if (Array.isArray(errorMessages[key])) {
              errorMessages[key].forEach((message: string) => {
                toast({
                  title: "Password Reset Error",
                  description: message,
                });
              });
            } else {
              toast({
                title: "Password Reset Error",
                description: errorMessages[key],
              });
            }
          }
        } else {
          toast({
            title: "Password Reset Error",
            description: errorMessages,
          });
        }
      } else {
        toast({
          title: "Password Reset Error",
          description:
            "There was an error resetting your password. Please try again.",
        });
      }
    }
    setLoading(false); // Set loading to false after the sign-in process
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="new_password1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your new password"
                    disabled={loading}
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                    {...field}
                    className="text-[16px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <ForgotPassword /> */}
          <Button
            disabled={loading}
            className="ml-auto w-full mt-4"
            type="submit"
          >
            <p className="">
              {loading ? "Changing your password..." : "Change your password"}
            </p>
          </Button>
        </form>
      </Form>
    </>
  );
}
