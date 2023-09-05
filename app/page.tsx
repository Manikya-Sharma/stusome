import Hero from "./components/Landing/Hero";
import Navbar from "./components/Landing/Navbar";
import Footer from "./components/Landing/Footer";
import HeroSub from "./components/Landing/HeroSub";
import Reviews from "./components/Landing/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="bg-[url('/images/Home/bg-new-sm.jpg')] md:bg-[url('/images/Home/bg-new.jpg')] bg-no-repeat bg-cover">
        <div>
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
