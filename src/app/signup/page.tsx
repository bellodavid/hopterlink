"use client";
import Logo from "@/components/Logo";
import PathContainer from "@/components/PathContainer";
import SignUpForm from "@/components/SignUpForm";
import Particles from "@/components/magicui/particles";
import Typography from "@/components/ui/typography";

const page = () => {
  return (
    <PathContainer>
      <div
        className="w-screen h-dvh max-md:items-center max-md:justify-center
          flex flex-row"
      >
        <div className="bg-transparent w-1/2 max-lg:w-full">
          <div className="w-full h-screen flex items-center justify-center px-4">
            <SignUpForm />
          </div>
        </div>
        <div className="bg-secondary max-lg:hidden w-1/2 relative">
          <Particles
            className="absolute top-0 bottom-0 left-0 right-0"
            color="#c55e0c"
            staticity={10}
          />
          <div className="top-10 right-10 absolute">
            <Logo />
          </div>
          <div
            className="relative flex h-full w-full items-center justify-center
              overflow-hidden md:shadow-xl"
          >
            <Typography
              variant={"h1"}
              className="z-10 whitespace-pre-wrap text-center font-medium
                tracking-tighter"
            >
              Hopterlink™
            </Typography>
          </div>{" "}
        </div>
      </div>
    </PathContainer>
  );
};

export default page;
