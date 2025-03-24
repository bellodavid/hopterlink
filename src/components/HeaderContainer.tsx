import React, { type ReactNode } from "react";
import { Footer } from "./common/footer";
import { Header } from "./common/header";

const HeaderContainer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex flex-1 justify-center w-full">
        <div className="flex w-full max-w-[1440px] h-full">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default HeaderContainer;
