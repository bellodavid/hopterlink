"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#c55e0c"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
