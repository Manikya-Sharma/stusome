import Hero from "./components/Landing/Hero";
import Navbar from "./components/Landing/Navbar";
import Footer from "./components/Landing/Footer";

export default function Home() {
  return (
    <div>
      <main className="bg-[url('/images/Home/bg.png')] min-h-[70vh]">
        <div>
          <Navbar />
        </div>
        <div className="pt-16 sm:pt-20 h-[70vh] bg-gradient-to-b from-[rgba(30,30,80,0.5)] to-[rgba(90,25,25,0.85)] text-white">
          <Hero />
        </div>
      </main>
      <Footer />
    </div>
  );
}
