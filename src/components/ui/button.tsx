import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/35",
        secondary:
          "bg-sky-50 text-blue-900 border border-sky-200 hover:bg-sky-100 hover:border-sky-300 shadow-sm",
        outline:
          "border border-sky-200 text-slate-800 hover:bg-sky-50 hover:text-blue-600 hover:border-sky-300",
        ghost:
          "text-slate-700 hover:bg-sky-50 hover:text-blue-600",
        destructive:
          "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
        sacred:
          "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-sky-600",
        noir:
          "bg-slate-950 text-white hover:bg-slate-900 shadow-sm",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-[11px]",
        lg: "h-13 rounded-2xl px-7 text-sm",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
