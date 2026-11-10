import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-cosmos-850/60 border border-gold-500/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
