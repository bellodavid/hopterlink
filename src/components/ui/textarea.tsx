import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `flex w-full rounded-md border-0 bg-background px-3 py-2
          text-[16px] ring-offset-background
          placeholder:text-muted-foreground
          disabled:cursor-not-allowed disabled:opacity-50
          focus-visible:border-0 focus-visible:outline-none
          focus-visible:ring-custom-color`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
