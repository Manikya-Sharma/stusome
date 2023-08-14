import Hero from "./components/Landing/Hero";
import Navbar from "./components/Landing/Navbar";

export default function Home() {
  return (
    <main className="bg-[#fffffc] h-screen">
      <div>
        <Navbar />
      </div>
      <div className="pt-16 sm:pt-20 bg-gradient-to-tr h-full from-rose-300 to-fuchsia-400">
        <Hero />
      </div>
    </main>
  );
}
