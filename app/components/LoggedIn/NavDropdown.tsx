"use client";
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Image from "next/image";
import { State } from "@/types/user";
import { LuLayoutDashboard, LuSettings, LuLogOut } from "react-icons/lu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavDropdown() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full bg-slate-300 align-middle dark:border-2 dark:border-slate-400"
        onClick={() => setOpen(!open)}
      >
        {session && session.user && session.user.image && (
          <Image src={session.user.image} alt="" width={70} height={70} />
        )}
      </div>
      {open ? (
        <div className="absolute right-2 mt-2 rounded-md bg-[rgba(200,200,200,0.8)] p-3 shadow-md backdrop-blur-3xl dark:bg-zinc-800">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="dashboard"
                className="block w-full rounded-md border border-emerald-400 bg-emerald-300 px-2 py-1 text-emerald-900 transition-all duration-100 hover:bg-emerald-800 hover:text-white dark:border-transparent dark:bg-zinc-700 dark:text-slate-200 dark:hover:bg-zinc-200 dark:hover:text-slate-900"
              >
                <div className="flex items-center justify-start gap-2">
                  <LuLayoutDashboard />
                  <p>Dashboard</p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="settings"
                className="block w-full rounded-md border border-emerald-400 bg-emerald-300 px-2 py-1 text-emerald-900 transition-all duration-100 hover:bg-emerald-800 hover:text-white dark:border-transparent dark:bg-zinc-700 dark:text-slate-200 dark:hover:bg-zinc-200 dark:hover:text-slate-900"
              >
                <div className="flex items-center justify-start gap-2">
                  <LuSettings />
                  <p>Settings</p>
                </div>
              </Link>
            </li>
            <li>
              <button
                className="w-full rounded-md border border-rose-400 bg-rose-200 px-2 py-1 text-rose-900 transition-all duration-300 hover:bg-rose-800 hover:text-white dark:bg-rose-950 dark:text-rose-100 dark:hover:bg-rose-300 dark:hover:text-slate-950"
                onClick={() => signOut()}
              >
                <div className="flex items-center justify-start gap-2">
                  <LuLogOut />
                  <p>Logout</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
