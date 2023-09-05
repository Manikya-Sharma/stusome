"use client";
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Image from "next/image";
import { State } from "@/app/types/user";
import { LuLayoutDashboard, LuSettings, LuLogOut } from "react-icons/lu";

type Props = {
  state: State;
  logout: Function;
  router: AppRouterInstance;
};

export default function NavDropdown(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="flex flex-col items-center align-middle justify-center cursor-pointer w-12 h-12 rounded-full bg-slate-300 overflow-hidden dark:border-slate-400 dark:border-2"
        onClick={() => setOpen(!open)}
      >
        {props.state.hasPic && (
          <Image
            src={`data:image/png;base64,${props.state.picture}`}
            alt=""
            width={70}
            height={70}
          />
        )}
      </div>
      {open ? (
        <div className="absolute right-2 mt-2 p-3 bg-[rgba(200,200,200,0.8)] backdrop-blur-3xl dark:bg-zinc-800 shadow-md rounded-md">
          <ul className="flex flex-col gap-3">
            <li>
              <button
                className="w-full px-2 py-1 bg-emerald-300 border border-emerald-400 dark:bg-zinc-700 dark:text-slate-200 dark:border-transparent text-emerald-900 hover:bg-emerald-800 hover:text-white dark:hover:bg-zinc-200 dark:hover:text-slate-900 transition-all duration-100 rounded-md"
                onClick={() =>
                  props.router.push(`/logged-in/${props.state._id}/dashboard`)
                }
              >
                <div className="flex items-center justify-start gap-2">
                  <LuLayoutDashboard />
                  <p>Dashboard</p>
                </div>
              </button>
            </li>
            <li>
              <button
                className="w-full px-2 py-1 bg-emerald-300 border border-emerald-400 dark:bg-zinc-700 dark:text-slate-200 dark:border-transparent text-emerald-900 hover:bg-emerald-800 hover:text-white dark:hover:bg-zinc-200 dark:hover:text-slate-900 transition-all duration-100 rounded-md"
                onClick={() =>
                  props.router.push(`/logged-in/${props.state._id}/settings`)
                }
              >
                <div className="flex items-center justify-start gap-2">
                  <LuSettings />
                  <p>Settings</p>
                </div>
              </button>
            </li>
            <li>
              <button
                className="w-full px-2 py-1 bg-rose-200 border border-rose-400 dark:bg-rose-950 hover:text-white text-rose-900 hover:bg-rose-800 dark:hover:bg-rose-300 dark:hover:text-slate-950 dark:text-rose-100 transition-all duration-300 rounded-md"
                onClick={() => props.logout(props.router)}
              >
                <div className="flex items-center justify-start gap-2">
                  <LuLogOut />
                  <p>Logout</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
