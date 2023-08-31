"use client";
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Image from "next/image";
import { State } from "@/app/types/user";

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
        className="flex flex-col items-center align-middle justify-center cursor-pointer w-12 h-12 rounded-full overflow-hidden"
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
        <div className="absolute right-2 p-3 bg-slate-200 dark:bg-black hover:bg-gradient-to-tr from-rose-200 to-rose-100 dark:from-slate-800 dark:to-slate-900 hover:shadow-md rounded-md">
          <ul className="flex flex-col gap-3">
            <li>
              <button
                className="w-full px-2 py-1 bg-gradient-to-r from-emerald-300 to-emerald-800 dark:from-emerald-800 dark:to-emerald-950 hover:text-fuchsia-200 text-[#fffffc] hover:from-emerald-800 hover:to-emerald-700 dark:hover:from-emerald-300 dark:hover:to-emerald-400 dark:hover:text-slate-800 transition-all duration-300 rounded-md"
                onClick={() =>
                  props.router.push(`/logged-in/${props.state._id}/dashboard`)
                }
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="w-full px-2 py-1 bg-gradient-to-r from-emerald-300 to-emerald-800 dark:from-emerald-800 dark:to-emerald-950 hover:text-fuchsia-200 text-[#fffffc] hover:from-emerald-800 hover:to-emerald-700 dark:hover:from-emerald-300 dark:hover:to-emerald-400 dark:hover:text-slate-800 transition-all duration-300 rounded-md"
                onClick={() =>
                  props.router.push(`/logged-in/${props.state._id}/settings`)
                }
              >
                Settings
              </button>
            </li>
            <li>
              <button
                className="w-full px-2 py-1 bg-gradient-to-r from-rose-300 to-rose-800 dark:from-rose-800 dark:to-rose-950 hover:text-fuchsia-200 text-[#fffffc] hover:from-rose-800 hover:to-rose-700 dark:hover:from-rose-300 dark:hover:to-rose-400 dark:hover:text-slate-800 transition-all duration-300 rounded-md"
                onClick={() => props.logout(props.router)}
              >
                Logout
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
