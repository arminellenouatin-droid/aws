import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-gold-500 to-gold-400 text-cosmos-950 font-bold shadow-lg shadow-gold-500/20 hover:from-gold-400 hover:to-gold-300 hover:shadow-gold-500/30",
        secondary:
          "bg-cosmos-900/90 text-gold-300 border border-gold-500/30 hover:bg-cosmos-850 hover:border-gold-400/60 shadow-sm",
        outline:
          "border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 hover:border-gold-400",
        ghost:
          "text-gold-300/90 hover:bg-cosmos-800/60 hover:text-gold-200",
        destructive:
          "bg-red-950/80 text-red-200 border border-red-500/40 hover:bg-red-900/80 hover:border-red-400",
        sacred:
          "bg-gradient-to-r from-emeraldSacred-600 to-emeraldSacred-500 text-white shadow-lg shadow-emeraldSacred-600/20 hover:from-emeraldSacred-500 hover:to-emeraldSacred-400",
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
