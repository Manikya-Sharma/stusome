"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

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
  });
  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account == null) {
      localStorage.removeItem("account");
      router.push("/login");
    } else {
      setState(() => JSON.parse(account));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (id != state._id && state._id != "") {
      router.push("/login");
    }
  }, [id, router, state._id]);
  return (
    <main className="p-4 min-h-screen dark:bg-slate-800 transition-all duration-200">
      <div className="mb-10">
        <Link
          href={`/logged-in/${state._id}/settings/`}
          className="text-slate-800 text-lg hover:underline underline-offset-2 dark:text-slate-200"
        >
          Back
        </Link>
      </div>
      <div className="text-lg w-full px-3 py-6 flex items-center justify-between bg-slate-300 dark:bg-slate-500 dark:text-slate-200 rounded-md">
        <p className="flex-grow">Change theme</p>
        <div className="flex min-w-[30%] justify-around">
          <button
            className="block px-4 py-2 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-200 hover:text-slate-800 transition-all duration-200"
            onClick={() => handleTheme("dark")}
          >
            Dark
          </button>
          <button
            className="block px-4 py-2 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-200 hover:text-slate-800 transition-all duration-200"
            onClick={() => handleTheme("light")}
          >
            Light
          </button>
        </div>
      </div>
    </main>
  );
}

function handleTheme(mode: "light" | "dark") {
  localStorage.setItem("theme", mode);
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add(mode);
}
