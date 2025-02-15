"use client";

import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import searchIcon from "@/public/icons/search.svg";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString().toLowerCase()}`);
  }, 300);

  return (
    <section className="relative flex flex-1 flex-shrink-0 mt-4 items-center justify-between gap-2 md:mt-8 py-4 md:py-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        className="bg-white peer block w-full md:w-1/3 rounded-full border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <Image
        src={searchIcon}
        alt="search"
        className="absolute left-4 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
      />
    </section>
  );
}
