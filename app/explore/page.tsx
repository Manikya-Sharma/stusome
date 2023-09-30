"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Navbar from "@/app/components/LoggedIn/Navbar";
import Welcome from "@/app/components/LoggedIn/Welcome";
import MostViewed from "@/app/components/LoggedIn/MostVeiwed";
import Frequents from "@/app/components/LoggedIn/Frequents";

import CustomPropLayout from "../components/LoggedIn/CustomPropLayout";

export default function LoggedIn() {
  const router = useRouter();
  // dark mode
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.add("light");
      }
    } else {
      document.documentElement.classList.add(theme);
    }
  }, []);

  return (
    <CustomPropLayout>
      <main className="min-h-screen font-fancy dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-950 dark:text-zinc-200">
        <Navbar />
        <div className="px-8 py-20 sm:py-32">
          <Welcome />

          <div className="items-center justify-around gap-5 sm:flex">
            <MostViewed />
            <Frequents />
          </div>
        </div>
      </main>
    </CustomPropLayout>
  );
}
