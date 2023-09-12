"use client";
import { useState, useEffect } from "react";
import { State } from "@/app/types/user";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Image from "next/image";
import React from "react";
import { LuMenu, LuPanelRightClose } from "react-icons/lu";
import { IconContext } from "react-icons";

type Props = {
  state: State;
};

export default function UserInfoContainer({
  children,
  props,
}: {
  children: React.ReactNode;
  props: Props;
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

  return (
    <div className="sm:flex sm:justify-between sm:pr-5 pt-10 sm:pt-0">
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
          "fixed border-l border-t border-zinc-300 sm:border-none sm:static sm:block bg-[rgba(226,232,240,0.7)] backdrop-blur-sm px-5 max-w-fit sm:max-w-full lg:max-w-[30vw] dark:bg-[rgba(51,65,85,0.7)] h-[100vh] overflow-y-hidden rounded-tl-3xl sm:rounded-tr-3xl sm:mr-3 sm:grow transition-all duration-200" +
          (showMenu
            ? " translate-x-[calc(100vw-100%)] sm:translate-x-0"
            : " translate-x-[110vw] sm:translate-x-0")
        }
      >
        <div className="pt-[4rem] flex flex-col items-center space-y-3 text-center">
          <div className="flex flex-col items-center align-middle justify-center w-32 h-32 rounded-full bg-slate-300 overflow-hidden dark:border-slate-400 dark:border-2">
            {props.state.hasPic && (
              <Image
                src={`data:image/png;base64,${props.state.picture}`}
                alt=""
                width={170}
                height={170}
              />
            )}
          </div>
          <p className="text-3xl font-merri">{props.state.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {props.state.email}
          </p>
          <div className="w-[80%] h-[3px] my-10 bg-slate-500" />
          <h2 className="text-lg">Quick Setup</h2>
          <ul>
            <li>
              <div
                className="w-[80px] dark:bg-slate-500 bg-slate-300 py-2 px-3 rounded-3xl cursor-pointer"
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
