import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

const InputLogin = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {React.cloneElement(icon as React.ReactElement, {
              className: "w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground"
            })}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-full border border-input bg-input px-10 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "md:h-12 md:text-base" ,
            "sm:h-11 sm:text-[0.9375rem]",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

const InputFile = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-2 flex items-center">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex sm:h-12 sm:w-full rounded-md border border-input p-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
InputLogin.displayName = "InputLogin";
InputFile.displayName = "InputFile";

export { Input, InputLogin, InputFile };
