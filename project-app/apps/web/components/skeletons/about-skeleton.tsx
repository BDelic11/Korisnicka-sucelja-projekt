import { Skeleton } from "@/components/ui/skeleton";

export function AboutSkeleton() {
  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col">
        <Skeleton className="h-10 w-full rounded-none" />{" "}
        <Skeleton className="h-40 w-20 rounded-full" />{" "}
      </div>
      <div>
        <Skeleton className="h-80 w-full rounded-none" />{" "}
        <Skeleton className="h-80 w-full rounded-none" />{" "}
        <Skeleton className="h-80 w-full rounded-none" />
      </div>
    </div>
  );
}
