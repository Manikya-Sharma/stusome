"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import NavDropdown from "@/app/components/LoggedIn/NavDropdown";
import Image from "next/image";
import { State } from "@/app/types/user";
import Link from "next/link";
import { MdOutlineChat, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { IconContext } from "react-icons";

function logout(router: AppRouterInstance) {
  localStorage.clear();
  router.push("/");
}

type Props = {
  state: State;
};

export default function Navbar(props: Props) {
  const router = useRouter();
  return (
    <nav className="flex z-[100] fixed w-[100vw] justify-between items-center px-4 py-1 sm:px-8 sm:py-4 backdrop-blur-sm dark:bg-[rgba(39,39,52,0.8)]">
      <div className="items-center sm:flex bg-[rgba(200,200,200,0.7)] rounded-lg px-2 hover:bg-white transition-all duration-200">
        <Image src="/logo-full-tx.png" alt="stusome" width={100} height={90} />
      </div>
      <div className="block flex-grow mx-2">
        <ul>
          <li>
            <IconContext.Provider
              value={{ className: "shared-class", size: "20" }}
            >
              <Link
                href={`${props.state._id}/chat`}
                className="text-slate-800 dark:text-slate-300 border-l-2 border-slate-400 hover:border-emerald-400 hover:text-emerald-400 dark:hover:border-emerald-300 dark:hover:text-emerald-300 transition-all duration-200 hover:underline underline-offset-2 cursor-pointer px-2 py-2"
              >
                <div className="inline-flex items-center justify-start gap-1">
                  <MdOutlineMarkUnreadChatAlt />
                  {/* <MdOutlineChat /> */}
                  Chats
                </div>
              </Link>
            </IconContext.Provider>
          </li>
        </ul>
      </div>
      <div>
        <NavDropdown logout={logout} router={router} state={props.state} />
      </div>
    </nav>
  );
}
