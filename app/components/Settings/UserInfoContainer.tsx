"use client";
import { useState, useEffect } from "react";
import { State } from "@/types/user";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Image from "next/image";
import React from "react";
import { LuMenu, LuPanelRightClose } from "react-icons/lu";
import { IconContext } from "react-icons";
import { useSession } from "next-auth/react";

export default function UserInfoContainer({
  children,

}: {
  children: React.ReactNode;

}) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const {data:session} = useSession()

  return (
    <div className="pt-10 sm:flex sm:justify-between sm:pr-5 sm:pt-0">
      <IconContext.Provider value={{ className: "shared-class", size: "23" }}>
        <div
          className="absolute right-3 top-2 sm:hidden"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <LuPanelRightClose /> : <LuMenu />}
        </div>
      </IconContext.Provider>
      <div
        className={
          "fixed h-[100vh] max-w-fit overflow-y-hidden rounded-tl-3xl border-l border-t border-zinc-300 bg-[rgba(226,232,240,0.7)] px-5 backdrop-blur-sm transition-all duration-200 dark:bg-[rgba(51,65,85,0.7)] sm:static sm:mr-3 sm:block sm:max-w-full sm:grow sm:rounded-tr-3xl sm:border-none lg:max-w-[30vw]" +
          (showMenu
            ? " translate-x-[calc(100vw-100%)] sm:translate-x-0"
            : " translate-x-[110vw] sm:translate-x-0")
        }
      >
        <div className="flex flex-col items-center space-y-3 pt-[4rem] text-center">
          <div className="flex h-32 w-32 flex-col items-center justify-center overflow-hidden rounded-full bg-slate-300 align-middle dark:border-2 dark:border-slate-400">
            {session && session.user && session.user.image && (
              <Image
                src={session.user.image}
                alt=""
                width={170}
                height={170}
              />
            )}
          </div>
          <p className="font-merri text-3xl">{session?.user?.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {session?.user?.email}
          </p>
          <div className="my-10 h-[3px] w-[80%] bg-slate-500" />
          <h2 className="text-lg">Quick Setup</h2>
          <ul>
            <li>
              <div
                className="w-[80px] cursor-pointer rounded-3xl bg-slate-300 px-3 py-2 dark:bg-slate-500"
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
            </li>
          </ul>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
