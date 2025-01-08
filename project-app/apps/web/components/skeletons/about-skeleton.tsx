// import { Skeleton } from "@/components/ui/skeleton";
import ClipLoader from "react-spinners/ClipLoader";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center mt-auto pb-20 md:pb-40 justify-center">
      <ClipLoader
        color={"black"}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
