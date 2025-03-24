import { Header } from "@/components/common/header";
import HeaderContainer from "@/components/HeaderContainer";
import DotPattern from "@/components/magicui/dot-pattern";
import { ShootingStars } from "@/components/magicui/shooting-stars";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/cards";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {};

const ContactUs = (props: Props) => {
  return (
    <HeaderContainer>
      <div className="space-y-8 relative flex justify-center items-center h-screen w-full px-4">
        <div className="z-40">
          <div className="space-y-2 mb-4">
            <h2 className="text-3xl font-bold">Get in touch with us</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Feel free to leave any enquiries below, or give us a call to speak
              with our helpful care team.{" "}
            </p>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold">Contact Details</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-4 h-4" />
                    <span>Paris, France</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-4 h-4" />
                    <span>+33 6 95 40 93 04</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-4 h-4" />
                    <Link href="#" prefetch={false}>
                      info@hopterlink.com
                    </Link>
                  </div>
                </div>
                <DotPattern
                  className={cn(
                    "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold">Leave a Message</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    className="border-1 border-border min-h-[100px]"
                  />
                  <Button>Send message</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ShootingStars />
      </div>
    </HeaderContainer>
  );
};

export default ContactUs;
