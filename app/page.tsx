import Hero from "./components/Landing/Hero";
import Navbar from "./components/Landing/Navbar";

export default function Home() {
  return (
    <div>
      <main className="bg-[#fffffc] h-screen">
        <div>
          <Navbar />
        </div>
        <div className="pt-16 sm:pt-20 bg-gradient-to-tr h-full from-rose-300 to-fuchsia-400">
          <Hero />
        </div>
      </main>
      <div className="py-20 px-5 bg-black text-white text-center text-3xl tracking-tighter">
        <footer>
          <p>Deep . Design . Create</p>
          <div className="text-sm tracking-wider mt-5">
            <p>All rights reserved</p>
            <p>Lavya | Nikhil | Manikya</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
