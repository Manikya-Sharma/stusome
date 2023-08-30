"use client";
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Image from "next/image";

type State = {
  _id: string;
  email: string;
  password: string;
  name: string;
  picture: string;
  hasPic: boolean;
};

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
        className="flex flex-col items-center align-middle justify-center cursor-pointer w-12 h-12 rounded-full bg-slate-400 overflow-hidden"
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
        <div className="absolute right-2 p-3 bg-rose-200 hover:bg-gradient-to-tr from-rose-200 to-rose-100 hover:shadow-md">
          <ul className="flex flex-col gap-3">
            <li>
              <button
                className="w-full px-2 py-1 bg-gradient-to-r from-emerald-300 to-emerald-800 hover:text-fuchsia-200 text-[#fffffc] hover:from-emerald-800 hover:to-emerald-700 transition-all duration-300 rounded-md"
                onClick={() =>
                  props.router.push(`/logged-in/${props.state._id}/dashboard`)
                }
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="w-full px-2 py-1 bg-gradient-to-r from-emerald-300 to-emerald-800 hover:text-fuchsia-200 text-[#fffffc] hover:from-emerald-800 hover:to-emerald-700 transition-all duration-300 rounded-md"
                onClick={() =>
                  props.router.push(`/logged-in/${props.state._id}/settings`)
                }
              >
                Settings
              </button>
            </li>
            <li>
              <button
                className="w-full px-2 py-1 bg-gradient-to-r from-rose-300 to-rose-800 hover:text-fuchsia-200 text-[#fffffc] hover:from-rose-800 hover:to-rose-700 transition-all duration-300 rounded-md"
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
