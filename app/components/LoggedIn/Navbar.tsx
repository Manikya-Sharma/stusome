"use client";

import { useRouter } from "next/navigation";
import NavDropdown from "@/app/components/LoggedIn/NavDropdown";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdOutlineChat, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { IconContext } from "react-icons";
import { LuLayoutDashboard } from "react-icons/lu";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <nav className="fixed z-[100] flex w-[100vw] items-center justify-between px-4 py-1 backdrop-blur-sm dark:bg-[rgba(39,39,52,0.8)] sm:px-8 sm:py-4">
      <div className="items-center rounded-lg bg-[rgba(200,200,200,0.7)] px-2 transition-all duration-200 hover:bg-white sm:flex">
        <Image src="/logo-full-tx.png" alt="stusome" width={100} height={90} />
      </div>
      <div className="mx-2 block flex-grow">
        <ul>
          <li>
            <IconContext.Provider
              value={{ className: "shared-class", size: "20" }}
            >
              <Link
                href={`/dashboard`}
                className="cursor-pointer border-l-2 border-slate-400 px-2 py-2 text-slate-800 underline-offset-2 transition-all duration-200 hover:border-cyan-400 hover:text-cyan-400 hover:underline dark:text-slate-300 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
              >
                <div className="inline-flex items-center justify-start gap-1 pr-2">
                  <LuLayoutDashboard />
                  <span className="hidden sm:inline">Dashboard</span>
                </div>
              </Link>
              <Link
                href={`/chat`}
                className="cursor-pointer border-l-2 border-slate-400 px-2 py-2 text-slate-800 underline-offset-2 transition-all duration-200 hover:border-emerald-400 hover:text-emerald-400 hover:underline dark:text-slate-300 dark:hover:border-emerald-300 dark:hover:text-emerald-300"
              >
                <div className="mr-2 inline-flex items-center justify-start gap-1">
                  <MdOutlineMarkUnreadChatAlt />
                  {/* <MdOutlineChat /> */}
                  <span className="hidden sm:inline">Chats</span>
                </div>
              </Link>
            </IconContext.Provider>
          </li>
        </ul>
      </div>
      <div>
        <NavDropdown />
      </div>
    </nav>
  );
}
