"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/app/components/Chat/Sidebar";

export default function LoggedIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "authenticated") {
      if (
        session == undefined ||
        session.user == undefined ||
        session.user.email == undefined
      ) {
        console.log("NO USERNAME!");
        router.push("/");
      }
    }
  });

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
      {session && session.user && session.user.email && (
        <Sidebar userEmail={session.user.email} />
      )}
    </main>
  );
}
