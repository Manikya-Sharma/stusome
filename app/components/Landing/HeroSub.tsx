import About from "./hero/About";
import Image from "next/image";
import Link from "next/link";

export default function HeroSub() {
  return (
    <section className="grid grid-cols-1 grid-rows-4 items-center gap-3 bg-white px-3 pb-16 pt-10 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-4 md:grid-rows-1 md:text-xl">
      <div className="flex flex-col gap-2 rounded-md py-3 transition-all duration-200 hover:bg-gray-300 md:gap-4">
        <Image
          src="/images/Home/future.jpg"
          width={70}
          height={70}
          alt=""
          className="mx-auto block"
        />
        <p className="text-center font-semibold leading-5">Bright Future</p>
      </div>
      <div className="flex flex-col gap-2 rounded-md py-3 transition-all duration-200 hover:bg-gray-300 md:gap-4">
        <Image
          src="/images/Home/network.jpg"
          width={80}
          height={80}
          alt=""
          className="mx-auto block"
        />
        <p className="text-center font-semibold leading-5">Network Expansion</p>
      </div>
      <div className="flex flex-col gap-2 rounded-md py-3 transition-all duration-200 hover:bg-gray-300 md:gap-4">
        <Image
          src="/images/Home/logic.jpg"
          width={70}
          height={70}
          alt=""
          className="mx-auto block"
        />
        <p className="text-center font-semibold leading-5">Logic Building</p>
      </div>
      <div className="flex flex-col gap-2 rounded-md py-3 transition-all duration-200 hover:bg-gray-300 md:gap-4">
        <Image
          src="/images/Home/notes.jpg"
          width={70}
          height={70}
          alt=""
          className="mx-auto block"
        />
        <p className="text-center font-semibold leading-5">Making Notes</p>
      </div>
    </section>
  );
}
