"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default BusinessLayout;
