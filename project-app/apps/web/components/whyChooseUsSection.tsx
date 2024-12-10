// images
import icon1 from "@/public/icons/fire-solid.svg";
import icon2 from "@/public/icons/person-solid.svg";
import icon3 from "@/public/icons/wand-magic-sparkles-solid.svg";

import Image from "next/image";

const icons = [
  {
    id: "1",
    title: "Stay In Trend",
    icon: icon1,
    description: "We provide the latest trends in the fashion industry",
  },
  {
    id: "2",
    title: "Personalized Experience",
    icon: icon2,
    description: "We provide a personalized experience for each user",
  },
  {
    id: "3",
    title: "Personalized Experience",
    icon: icon3,
    description: "We provide a personalized experience for each user",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="w-full flex flex-col pt-20 md:pt-10">
      <h2 className="text-4xl md:text-3xl font-extrabold tracking-tight text-gray-800">
        {" "}
        Why Choose Us
      </h2>
      <div className=" w-full flex flex-col md:flex-row md:justify-around justify-center align-middle gap-20 md:gap-0 my-32">
        {icons.map((icon) => (
          <article
            key={icon.id}
            className="flex flex-col align-middle justify-center gap-6 md:gap-8 hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <Image
              src={icon.icon}
              alt={icon.title}
              className="w-24 h-24 md:w-24 md:h-24 justify-center align-middle m-auto"
            />
            <h2 className="text-center text-2xl font-medium md:text-lg">
              {icon.title}
            </h2>
            <p className="text-gray-500 w-2/3 m-auto justify-center align-middle text-center">
              {icon.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
