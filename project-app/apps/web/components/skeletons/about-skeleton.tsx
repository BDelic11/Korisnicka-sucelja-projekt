// import { Skeleton } from "@/components/ui/skeleton";
import ClipLoader from "react-spinners/ClipLoader";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center m-auto  justify-center">
      <ClipLoader
        color={"black"}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
