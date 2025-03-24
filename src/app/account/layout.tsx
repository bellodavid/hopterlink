"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default AccountLayout;
