import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-sky-200 bg-sky-50 text-blue-800",
        emerald:
          "border border-sky-300 bg-sky-100 text-blue-900",
        cosmos:
          "border border-slate-200 bg-slate-50 text-slate-700",
        terracotta:
          "border border-blue-200 bg-blue-50 text-blue-700",
        outline:
          "border border-blue-600 text-blue-600",
        noir:
          "border border-slate-900 bg-slate-950 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
