import About from "@/app/components/Landing/hero/About";

export default function Hero() {
  return (
    <section className="text-center flex flex-col gap-3 font-sans">
      <h1 className="text-4xl sm:text-8xl font-extrabold tracking-tighter mt-5 font-serif">
        Student Social Media
      </h1>
      <p className="text-slate-600 text-xl sm:text-2xl">
        Your mate for all needs
      </p>
      <About />
      <div className="max-w-[70%] flex flex-col gap-2 mx-auto text-xl sm:text-2xl">
        <p>
          The wait is over! Welcome to{" "}
          <span className="bg-slate-800 text-slate-200">ProductName</span> !
        </p>
        <p>This is your one stop solution for all academic needs.</p>
        <button className="px-4 py-2 bg-slate-600 text-slate-200 hover:bg-slate-800 transition-all duration-300 rounded-md">
          Login
        </button>
      </div>
    </section>
  );
}
