"use client";
import Link from "next/link";
import Typography from "@components/ui/typography";
import Logo from "../Logo";

export function Footer() {
  return (
    <footer className="flex h-12 items-center justify-center w-full border-t">
      <div className="w-full max-w-[1440px] md:px-8 px-4 flex place-content-center">
        <div className="gap-x-11 md:flex flex-1 hidden">
          <Link href="/" className="pointer flex items-center">
            <Logo />
          </Link>
        </div>
        <div className="flex max-w-fit items-center gap-x-4">
          <Link href="/contact-us" className="pointer block w-fit flex-1">
            <Typography variant="p" className="w-max">
              Contact us
            </Typography>
          </Link>
          <Link href="/terms-of-service" className="pointer block w-fit flex-1">
            <Typography variant="p" className="w-max">
              Terms of service
            </Typography>
          </Link>
          <Link href="/privacy-policy" className="pointer block w-fit">
            <Typography variant="p">Privacy Policy</Typography>
          </Link>
        </div>
      </div>
    </footer>
  );
}
