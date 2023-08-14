import About from "@/app/components/Landing/hero/About";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center flex flex-col gap-3 font-sans text-[rgba(25,25,25)]">
      <h1 className="text-4xl sm:text-8xl font-extrabold tracking-tighter font-merri">
        Student Social Media
      </h1>
      <p className="text-slate-700 text-xl sm:text-2xl font-fancy">
        Your mate for all needs
      </p>
      <div className="sm:flex sm:flex-row-reverse sm:justify-around sm:my-10">
        <div className="sm:max-w-[50%]">
          <About />
        </div>

        <div className="max-w-[70%] flex flex-col gap-2 mx-auto text-xl sm:text-2xl">
          <p>
            The wait is over! Welcome to{" "}
            <span className="bg-slate-800 text-slate-200">ProductName</span> !
          </p>
          <p>This is your one stop solution for all academic needs.</p>
          <Link
            href="/login"
            className="px-4 py-2 bg-gradient-to-tr from-orange-700 to-rose-400 text-slate-200 hover:from-rose-600 hover:to-orange-700 transition-all duration-300 rounded-md"
          >
            <button>Login</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
