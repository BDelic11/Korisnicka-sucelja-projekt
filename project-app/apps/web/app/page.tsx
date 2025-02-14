import Image from "next/image";

//images
import illustration from "@/public/images/stylist illustration blue.svg";

//components
import LayoutContainer from "@/components/ui/container";
import WhyChooseUsSection from "@/components/aboutPageSections/whyChooseUsSection";
import HeroSection from "@/components/aboutPageSections/heroSection";

export default async function Home() {
  return (
    <LayoutContainer className="pt-28 min-h-screen md:pt-4">
      <HeroSection />
      <section className="block mt-10 md:hidden md:mt-0 ">
        <Image
          src={illustration}
          alt="illustration image"
          className=" h-72 w-auto "
        />
      </section>
      <WhyChooseUsSection />
    </LayoutContainer>
  );
}
