import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-grow flex md:min-h-[80vh] flex-col items-center justify-center gap-2">
      {/* <FaceFrownIcon className="w-10 text-gray-400" /> */}
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>There is no page you were trying to find</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
