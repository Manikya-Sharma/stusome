"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from "@/app/components/LoggedIn/Navbar";
import Welcome from "@/app/components/LoggedIn/Welcome";
import MostViewed from "@/app/components/LoggedIn/MostVeiwed";
import Frequents from "@/app/components/LoggedIn/Frequents";
import CustomPropLayout from "../components/LoggedIn/CustomPropLayout";

import { BarLoader } from "react-spinners";

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
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.add("light");
      }
    } else {
      document.documentElement.classList.add(theme);
    }
  }, []);

  const [loading, setLoading] = useState<Boolean>(true);
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <CustomPropLayout>
      <main className="min-h-screen font-fancy dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-950 dark:text-zinc-200">
        {loading && (
          <div className="absolute left-0 top-0 z-[200]">
            <BarLoader
              height={3}
              width={width}
              color="#55fff6"
              cssOverride={{ backgroundColor: "#11aaaa" }}
            />
          </div>
        )}
        <Navbar />
        <div className="px-8 py-20 sm:py-32">
          <Welcome />

          <div>
            <MostViewed setLoader={setLoading} />
            <Frequents />
          </div>
        </div>
      </main>
    </CustomPropLayout>
  );
}
