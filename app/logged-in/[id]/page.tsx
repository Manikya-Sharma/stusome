"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Navbar from "@/app/components/LoggedIn/Navbar";
import Welcome from "@/app/components/LoggedIn/Welcome";
import MostViewed from "@/app/components/LoggedIn/MostVeiwed";
import Frequents from "@/app/components/LoggedIn/Frequents";

type Params = {
  params: { id: string };
};

export default function LoggedIn({ params }: Params) {
  const router = useRouter();
  const id = params.id;
  const [state, setState] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    picture: "",
    hasPic: false,
  });
  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account == null) {
      router.push("/login");
    } else {
      setState(() => JSON.parse(account));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // different user
    if (id != state._id && state._id != "") {
      localStorage.removeItem("account");
      router.push("/login");
    }
  }, [id, router, state._id]);

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
    <main className="min-h-screen dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-950 dark:text-zinc-200 font-fancy">
      <Navbar state={state} />
      <div className="px-8 py-20 sm:py-32">
        <Welcome user={state} />

        <div className="sm:flex items-center justify-around gap-5">
          <MostViewed />
          <Frequents />
        </div>
      </div>
    </main>
  );
}
