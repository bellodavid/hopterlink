import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border border-input
          bg-background px-3 py-2 text-[16px] file:border-0
          file:bg-transparent file:text-sm file:font-medium
          placeholder:text-muted-foreground
          disabled:cursor-not-allowed focus-visible:border-0
          focus-visible:outline-none focus-visible:ring-custom-color
          disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
