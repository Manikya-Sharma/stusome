import Link from "next/link";
import About from "@/app/components/Landing/hero/About";
import Image from "next/image";

export default function Hero() {
  return (
    <div>
      <div className="sm:text-md text-md pr-3 text-right text-sm tracking-wider text-slate-100 md:text-lg">
        Deep . Dive . Create
      </div>
      <section className="relative flex flex-col gap-3 px-3 pb-8 font-sans text-white drop-shadow-md">
        <div>
          <h1 className="mb-2 font-merri text-4xl font-extrabold tracking-tight sm:text-8xl">
            Our Services
          </h1>
          <p className="font-fancy text-xl text-slate-100 sm:text-2xl">
            WHAT WE OFFER
          </p>
        </div>
      </section>
    </div>
  );
}
