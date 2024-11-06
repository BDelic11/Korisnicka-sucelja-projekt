import { Skeleton } from "@/components/ui/skeleton";

export function InspirationSkeleton() {
  return (
    <div className="p-4 pt-8 space-y-4">
      {/* Search Bar */}
      <Skeleton className="h-10 w-full rounded-full" />

      {/* Filter Buttons */}
      <div className="flex space-x-2 mt-4">
        <Skeleton className="h-8 w-20 rounded-full  " />
        <Skeleton className="h-8 w-20 rounded-full  " />
        <Skeleton className="h-8 w-20 rounded-full  " />
        <Skeleton className="h-8 w-20 rounded-full  " />
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-2 mt-8">
        {/* Row 1 */}
        <Skeleton className="h-80 w-full" /> {/* Double height on the left */}
        <div className="space-y-2 flex flex-col">
          <Skeleton className="h-40 w-full" /> {/* Half height on the right */}
          <Skeleton className="h-40 w-full" /> {/* Half height on the right */}
        </div>
        {/* Row 2 */}
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        {/* Row 3 */}
        <div className="space-y-2 flex flex-col">
          <Skeleton className="h-40 w-full" /> {/* Half height on the left */}
          <Skeleton className="h-40 w-full" /> {/* Half height on the left */}
        </div>
        <Skeleton className="h-80 w-full" /> {/* Double height on the right */}
        {/* Row 4 */}
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}
