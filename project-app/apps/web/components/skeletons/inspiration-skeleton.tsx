import { Skeleton } from "@/components/ui/skeleton";

export function InspirationSkeleton() {
  return (
    <div className="p-4 pt-8 space-y-4 min-h-full px-6  md:px-24 lg:px-52">
      {/* Search Bar */}
      {/* <Skeleton className="h-10 w-full rounded-full" />

      {/* Filter Buttons */}
      {/* <div className="flex space-x-2 mt-4">
        <Skeleton className="h-8 w-20 rounded-full  " />
        <Skeleton className="h-8 w-20 rounded-full  " />
        <Skeleton className="h-8 w-20 rounded-full  " />
        <Skeleton className="h-8 w-20 rounded-full  " />
      </div> */}

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-1 mt-4 md:grid-cols-3 lg:grid-cols-4 rounded-none">
        <Skeleton className="h-80 w-full rounded-none" />{" "}
        {/* Double height on the left */}
        <Skeleton className="h-80 w-full rounded-none" />{" "}
        {/* Half height on the right */}
        <Skeleton className="h-80 w-full rounded-none" />{" "}
        {/* Half height on the right */}
        <Skeleton className="h-80 w-full rounded-none" />
        <Skeleton className="h-80 w-full rounded-none" />
        <Skeleton className="h-80 w-full rounded-none" />{" "}
        {/* Half height on the left */}
        <Skeleton className="h-80 w-full rounded-none" />{" "}
        {/* Half height on the left */}
        <Skeleton className="h-80 w-full rounded-none" />{" "}
        {/* Double height on the right */}
        <Skeleton className="h-80 w-full rounded-none" />
        <Skeleton className="h-40 w-full rounded-none" />
      </div>
    </div>
  );
}
