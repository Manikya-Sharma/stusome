"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LuArrowLeft, LuFlashlight, LuFlashlightOff } from "react-icons/lu";
import { DarkModeSwitch } from "react-toggle-dark-mode";

type Params = {
  params: { id: string };
};

export default function AppSettings({ params }: Params) {
  const router = useRouter();
  const id = params.id;
  const [state, setState] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  });

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account == null) {
      localStorage.removeItem("account");
      router.replace("/login");
    } else {
      setState(() => JSON.parse(account));
    }
  }, [router]);
  useEffect(() => {
    if (id != state._id && state._id != "") {
      router.push("/login");
    }
  }, [id, router, state._id]);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  function handleTheme(mode: "light" | "dark") {
    localStorage.setItem("theme", mode);
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add(mode);
    setTheme(mode);
  }

  return (
    <>
      <div className="pt-12 px-3">
        <div className="text-lg w-full px-3 sm:px-8 py-6 flex items-center justify-between bg-slate-300 dark:bg-slate-500 dark:text-slate-200 rounded-md transition-all duration-300">
          <div className="inline-flex items-center justify-center mr-3">
            {theme == "dark" ? <LuFlashlightOff /> : <LuFlashlight />}
          </div>
          <p className="flex-grow">Change theme</p>
          <div
            className="w-[80px] dark:bg-slate-400 bg-slate-100 py-2 px-3 rounded-3xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleTheme(theme == "dark" ? "light" : "dark");
            }}
          >
            <div
              className={
                "transition-transform duration-200 " +
                (theme == "dark" ? "translate-x-[30px]" : "translate-x-0")
              }
            >
              {
                <DarkModeSwitch
                  checked={theme == "dark"}
                  onChange={() =>
                    handleTheme(theme == "dark" ? "light" : "dark")
                  }
                  size={25}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
