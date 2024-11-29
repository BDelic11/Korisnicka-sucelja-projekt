import Link from "next/link";
import Image from "next/image";

//images
import illustration from "@/public/images/stylist illustration blue.svg";

//components
import { Button } from "@/components/ui/button";
import LayoutContainer from "@/components/ui/container";
import { Grid } from "@/components/ui/grid";

export default async function Home() {
  return (
    <LayoutContainer className="pt-20 h-screen md:pt-0 ">
      <section className="flex flex-col  justify-center align-middle md:flex-row md:justify-between md:align-middle">
        <div className="flex flex-col align-middle justify-center w-full">
          <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight md:mb-4 lg:text-6xl text-gray-800">
            Welcome to Stylist{" "}
            <span className="text-stylist-blue">Inspiration</span>
          </h1>
          <h2 className="scroll-m-20  py-2 text-2xl text-gray-600 font-normal tracking-tight first:mt-0 md:text-xl md:tracking-normal">
            Place that will get you Inspired
          </h2>
          <Button size="lg" className="rounded-full py-8 bg-gray-800" asChild>
            <Link className="mt-20 w-40 " href="/inspiration">
              Get Inspired
            </Link>
          </Button>
        </div>
        <section className=" hidden md:block">
          <Grid />
        </section>
      </section>
      <section className="block mt-10 md:hidden md:mt-0 ">
        <Image
          src={illustration}
          alt="illustration image"
          className=" h-72 w-auto "
        />
      </section>
    </LayoutContainer>
  );
}
