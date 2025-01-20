import { RegisterForm } from "@/components/forms/register-form";
import Image from "next/image";

//images
import illustration from "@/public/images/stylist illustration blue.svg";

export default async function RegisterPage() {
  return (
    <main className="flex-grow items-center  ">
      <section
        className="flex flex-col justify-center md:justify-around align-middle md:flex-row md:mx-20 md:py-10 md:px-20  md:border  md:bg-white md:rounded-md 
     "
      >
        <div className="my-auto md:w-1/2 ">
          <h1 className=" text-left md:my-6 text-4xl font-extrabold tracking-tight  lg:text-5xl">
            Register Form
          </h1>

          <Image
            src={illustration}
            alt="illustration image"
            className=" h-72 w-auto "
          />
        </div>
        <RegisterForm />
      </section>
    </main>
  );
}
