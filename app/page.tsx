import Hero from "./components/Landing/Hero";
import Navbar from "./components/Landing/Navbar";

export default function Home() {
  return (
    <main className="bg-[#fffffc] h-screen">
      <div className="pb-16">
        <Navbar />
      </div>
      <Hero />
    </main>
  );
}
