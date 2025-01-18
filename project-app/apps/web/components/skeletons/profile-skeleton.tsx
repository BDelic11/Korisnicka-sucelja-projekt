import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="flex flex-row justify-center align-middle w-full  gap-20 mt-40">
      <Skeleton className="h-10 w-80 rounded-full" />{" "}
      <Skeleton className="h-10 w-1/2 rounded-full" />{" "}
      <div className="flex flex-row md:flex-col w-full justify-center align-middle">
        <div className="flex flex-col justify-around gap-10 ">
          <div className="flex flex-col justify-around gap-4 ">
            <Skeleton className="h-10 w-1/2 rounded-full" />{" "}
            <Skeleton className="h-20 w-1/2 rounded-full" />{" "}
          </div>
          <div>
            <Skeleton className="h-10  w-1/2  rounded-full" />{" "}
            <Skeleton className="h-20  w-1/2 rounded-full" />{" "}
          </div>
          <div>
            <Skeleton className="h-10  w-1/2  rounded-full" />{" "}
            <Skeleton className="h-0  w-1/2  rounded-full" />{" "}
          </div>
        </div>
        <Skeleton className="h-1/2 w-1/2 rounded-full" />
      </div>
    </div>
  );
}
