import About from "./hero/About";
import Image from "next/image";
import Link from "next/link";

export default function HeroSub() {
  return (
    <section className="bg-white pt-10 pb-16 px-3 grid grid-rows-4 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 md:grid-rows-1 md:grid-cols-4 gap-3 items-center md:text-xl">
      <div className="flex flex-col gap-2 md:gap-4 py-3 rounded-md hover:bg-gray-300 transition-all duration-200">
        <Image
          src="/images/Home/future.jpg"
          width={70}
          height={70}
          alt=""
          className="block mx-auto"
        />
        <p className="text-center font-semibold leading-5">Bright Future</p>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 py-3 rounded-md hover:bg-gray-300 transition-all duration-200">
        <Image
          src="/images/Home/network.jpg"
          width={80}
          height={80}
          alt=""
          className="block mx-auto"
        />
        <p className="text-center font-semibold leading-5">Network Expansion</p>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 py-3 rounded-md hover:bg-gray-300 transition-all duration-200">
        <Image
          src="/images/Home/logic.jpg"
          width={70}
          height={70}
          alt=""
          className="block mx-auto"
        />
        <p className="text-center font-semibold leading-5">Logic Building</p>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 py-3 rounded-md hover:bg-gray-300 transition-all duration-200">
        <Image
          src="/images/Home/notes.jpg"
          width={70}
          height={70}
          alt=""
          className="block mx-auto"
        />
        <p className="text-center font-semibold leading-5">Making Notes</p>
      </div>
    </section>
  );
}
