import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-gold-500/30 bg-gold-500/10 text-gold-300",
        emerald:
          "border border-emeraldSacred-500/30 bg-emeraldSacred-500/10 text-emeraldSacred-300",
        cosmos:
          "border border-cosmos-700 bg-cosmos-900/80 text-muted-foreground",
        terracotta:
          "border border-terracotta-500/30 bg-terracotta-500/10 text-terracotta-300",
        outline:
          "border border-gold-400/40 text-gold-400",
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
