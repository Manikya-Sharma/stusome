import Link from "next/link";
import About from "@/app/components/Landing/hero/About";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="text-center flex flex-col gap-3 font-sans text-[rgba(225,225,225)]">
      <h1 className="text-4xl sm:text-8xl font-extrabold tracking-tighter font-merri">
        Student Social Media
      </h1>
      <p className="text-slate-300 text-xl sm:text-2xl font-fancy">
        Your mate for all needs
      </p>
      <div className="sm:flex sm:flex-row-reverse sm:justify-around sm:my-10">
        <div className="sm:max-w-[50%]">
          <About />
        </div>

        <div className="max-w-[70%] flex flex-col gap-2 mx-auto text-xl sm:text-2xl">
          <p>
            The wait is over! Welcome to
            <div className="inline-block items-center sm:flex bg-[rgba(200,200,200,0.8)] rounded-lg px-2 hover:bg-white transition-all duration-200">
              <Image
                src="/logo-full-tx.png"
                alt="stusome"
                width={100}
                height={90}
              />
            </div>
          </p>
          <p>This is your one stop solution for all academic needs.</p>
          <Link
            href="/login"
            className="px-4 py-2 bg-gradient-to-tr from-[rgba(100,70,70,0.7)] to-[rgba(200,100,100,0.3)] text-slate-200 hover:from-rose-600 hover:to-orange-700 transition-all duration-300 rounded-md"
          >
            <button>Login</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
