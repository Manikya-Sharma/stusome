import Hero from "./components/Landing/Hero";
import Navbar from "./components/Landing/Navbar";
import Footer from "./components/Landing/Footer";
import HeroSub from "./components/Landing/HeroSub";
import Reviews from "./components/Landing/Reviews";
import { quicksand } from "@/custom-fonts/fonts";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="bg-[url('/images/Home/bg-new-sm.jpg')] bg-cover bg-no-repeat md:bg-[url('/images/Home/bg-new.jpg')]">
        <div className={quicksand.className}>
          <Navbar />
        </div>
        <div className="pt-20 sm:pt-24 ">
          <Hero />
        </div>
      </div>
      <HeroSub />
      <Reviews />
      <Footer />
    </main>
  );
}
