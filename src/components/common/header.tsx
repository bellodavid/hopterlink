"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState } from "react";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Typography from "@/components/ui/typography";
import { useCategories } from "@/contexts/ReUsableData";
import { cn } from "@/lib/utils";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  Activity,
  File,
  LogOut,
  MenuIcon,
  MessageCircle,
  MoonIcon,
  Search,
  SunIcon,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Collection from "../Collection";
import ListItem2 from "../ListItem";
import Logo from "../Logo";
import RecentlyViewed from "../RecentlyViewed";
import SearchComponent from "../SearchComponent";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Header({ className }: SidebarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { status, data: session } = useSession();
  const { userInfo, userLoading } = useCategories();

  const avatarSrc =
    session?.picture ||
    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"; // Default Gravatar image

  const { categories, loading } = useCategories();
  const getLogo = () => (
    <Link href="/" className="pointer flex items-center">
      <Logo />
    </Link>
  );

  const getAuthButtons = () => (
    <div className="flex gap-3 items-center justify-between">
      <>
        {status === "authenticated" && !userLoading && !userInfo?.is_business && (
          <Button
            variant={"default"}
            className="text-white bg-[#c55e0c]"
            onClick={() => router.replace("/add-a-business")}
          >
            Add a Business
          </Button>
        )}
      </>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="rounded-full relative bg-transparent group hover:bg-none"
                  variant={"outline"}
                >
                  <SunIcon
                    className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all 
        group-hover:-rotate-90 dark:scale-0 group-hover:text-primary hover:scale-110"
                  />
                  <MoonIcon
                    className="absolute h-[1.4rem] w-[1.4rem] rotate-0 scale-0 transition-all 
        group-hover:rotate-90 dark:scale-100 group-hover:text-primary text-white hover:scale-110"
                  />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Appearance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {status === "authenticated" && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      className=" relative rounded-full  bg-transparent group hover:bg-none" // Added 'group' class here
                      variant={"outline"}
                    >
                      <Activity
                        size={19}
                        className="h-[1.2rem] w-[1.2rem] scale-100 transition-all 
                     group-hover:text-primary group-hover:scale-110"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Activity Feed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex flex-row items-center gap-4 font-bold text-md">
                {/* <Activity size={14} /> */}
                Activity Feed
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <RecentlyViewed />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <File size={14} /> My Interest
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <PaperPlaneIcon size={14} /> Invite Friends
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Collection />
        </>
      )}
      {status === "unauthenticated" && (
        <>
          <Link href="/login" target="_blank">
            <Button size="tiny" variant="link">
              Sign in{" "}
            </Button>
          </Link>
          <Link href="/signup" target="_blank">
            <Button size="tiny" variant="outline">
              Sign Up
            </Button>
          </Link>
        </>
      )}{" "}
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="bg-[#c55e0c] mx-2">
                    <AvatarImage src={session?.user?.profile || ""} />
                    <AvatarFallback>
                      {session?.user?.first_name?.[0] || "H"}
                      {session?.user?.last_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your Account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href="/account">
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <User size={14} /> Account
              </DropdownMenuItem>
            </Link>
            <Link href="/messages">
              <DropdownMenuItem className="flex flex-row items-center gap-4">
                <MessageCircle size={14} /> Messages
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              className="flex flex-row items-center gap-4"
              onClick={() => {
                signOut({ callbackUrl: "/login" });
                router.push("/login");
              }}
            >
              <LogOut size={14} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  const getHeaderItems = () => {
    // Step 1: State management for search component visibility
    const [isSearchVisible, setSearchVisible] = useState(false);

    // Step 2: Function to toggle search component visibility
    const toggleSearch = () => {
      setSearchVisible(!isSearchVisible);
    };

    return (
      <div className="flex gap-4 my-6 max-lg:hidden py-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Link href="/" className="pointer flex items-center">
                          <Logo />
                        </Link>
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Hopterlink
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Find, Hire and review businesses at your convenience.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/signup" title="Sign Up">
                    Create a verified account on Hopterlink
                  </ListItem>
                  <ListItem href="/" title="Search businesses">
                    Use Hopterlink to find businesses closest to you
                  </ListItem>
                  <ListItem
                    href="/add-a-business"
                    title="Create your own business"
                  >
                    Create your own business and connect with other users
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ScrollArea className="h-96">
                  <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                    {categories.map((component) => (
                      <ListItem
                        key={component.id}
                        title={component.name}
                        href={`/categories/${component.id}`}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </ScrollArea>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex flex-row gap-4 items-center cursor-pointer">
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={toggleSearch}
              >
                <Search size={17} />
              </NavigationMenuLink>
              {/* Step 3: Conditionally render SearchComponent */}
              {isSearchVisible && <SearchComponent />}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    );
  };
  return (
    <div
      className={cn(
        `flex md:h-12 py-8 h-14 items-center justify-center w-full border-b fixed z-50 bg-secondary`,
        className
      )}
    >
      <div className="w-full max-w-[1440px] md:px-8 px-4">
        {/* Desktop */}
        <div className="flex items-center gap-x-8 w-full">
          <div className="md:flex-0 min-w-fit flex-1">{getLogo()}</div>
          <div className="hidden md:flex flex items-center w-full">
            <div className="flex items-center gap-x-8 flex-1">
              {getHeaderItems()}
            </div>
            {getAuthButtons()}
          </div>
          {/* Mobile */}
          <div className="md:hidden flex gap-x-4 items-center">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <MenuIcon />
              </DrawerTrigger>
              <DrawerContent className="h-dvh justify-between flex items-start top-0 right-0 left-auto mt-0 w-64 rounded-none">
                <div className="mx-auto w-full p-5">
                  <DrawerHeader>
                    <DrawerClose asChild>
                      <div className="w-full flex items-end justify-end">
                        <X />
                      </div>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="mt-12">
                    <SearchComponent />
                  </div>
                  {status === "unauthenticated" ? (
                    <>
                      <div className="w-full flex justify-between items-center my-8">
                        <Button
                          onClick={() => router.push("/signup")}
                          className="w-full"
                        >
                          Join Hopterlink
                        </Button>
                      </div>{" "}
                      <Link href={"/login"}>
                        <ListItem2 title="Sign In" />
                      </Link>
                    </>
                  ) : (
                    ""
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <ListItem2 title="Browse Categories" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <ScrollArea className="h-96 w-48 rounded-md">
                        {categories.map((category, index) => (
                          <>
                            <DropdownMenuItem
                              key={index}
                              onClick={() =>
                                router.push(`/categories/${category.id}`)
                              }
                            >
                              <div className={"text-sm my-2"}>
                                {category.name}
                              </div>
                            </DropdownMenuItem>
                          </>
                        ))}
                      </ScrollArea>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Typography variant={"h4"} className="text-gray-500 mt-4">
                    General
                  </Typography>
                  <Link href={"/"}>
                    <ListItem2 title="Home" />
                  </Link>
                  {userInfo?.is_business ? (
                    ""
                  ) : (
                    <Link href={"/add-a-business"}>
                      <ListItem2 title="Add a business" />
                    </Link>
                  )}

                  <div className=" flex flex-row items-center justify-between">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm">
                          <SunIcon
                            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hover:text-primary
                dark:-rotate-90 dark:scale-0"
                          />
                          <MoonIcon
                            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0
                transition-all dark:rotate-0 dark:scale-100 hover:text-primary"
                          />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          System
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mx-auto w-full p-5 flex flex-row gap-2 items-center justify-between">
                  {status === "authenticated" && (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="secondary" size="sm">
                            <Activity
                              size={20}
                              className="hover:text-primary"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex flex-row items-center gap-4 font-bold text-md">
                            {/* <Activity size={14} /> */}
                            Activity Feed
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <RecentlyViewed />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex flex-row items-center gap-4">
                            <File size={14} /> My Interest
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex flex-row items-center gap-4">
                            <PaperPlaneIcon
                              size={14}
                              className="hover:text-primary"
                            />{" "}
                            Invite Friends
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="secondary" size="sm">
                        <Collection />
                      </Button>
                    </>
                  )}

                  {status === "authenticated" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage src={session?.user?.profile || ""} />
                          <AvatarFallback>
                            {session?.user?.first_name?.[0] || "H"}
                            {session?.user?.last_name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href="/account">
                          <DropdownMenuItem className="flex flex-row items-center gap-4">
                            <User size={14} /> Account
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/messages">
                          <DropdownMenuItem className="flex flex-row items-center gap-4">
                            <MessageCircle size={14} /> Messages
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem
                          className="flex flex-row items-center gap-4"
                          onClick={() => {
                            signOut({ callbackUrl: "/login" });
                            router.push("/login");
                          }}
                        >
                          <LogOut size={14} /> Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}
