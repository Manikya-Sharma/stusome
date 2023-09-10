"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/app/components/Chat/Sidebar";

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
      router.replace("/login");
    } else {
      setState(() => JSON.parse(account));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // different user
    if (id != state._id && state._id != "") {
      localStorage.removeItem("account");
      router.replace("/login");
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
    <main>
      <Sidebar userEmail={state.email} />
    </main>
  );
}
