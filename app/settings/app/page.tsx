"use client";
import { useState, useEffect } from "react";
import { LuArrowLeft, LuFlashlight, LuFlashlightOff } from "react-icons/lu";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function AppSettings() {
  const [theme, setTheme] = useState<"dark" | "light">(null);
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
      <div className="px-3 pt-12">
        <div className="flex w-full items-center justify-between rounded-md bg-slate-300 px-3 py-6 text-lg transition-all duration-300 dark:bg-slate-500 dark:text-slate-200 sm:px-8">
          <div className="mr-3 inline-flex items-center justify-center">
            {theme == "dark" ? <LuFlashlightOff /> : <LuFlashlight />}
          </div>
          <p className="flex-grow">Change theme</p>
          <div
            className="w-[80px] cursor-pointer rounded-3xl bg-slate-100 px-3 py-2 dark:bg-slate-400"
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
