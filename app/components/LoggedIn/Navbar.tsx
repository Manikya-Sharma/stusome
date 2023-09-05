"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import NavDropdown from "@/app/components/LoggedIn/NavDropdown";
import Image from "next/image";
import { State } from "@/app/types/user";

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
      <div className="hidden sm:block sm:flex-grow">
        {/* Middle space for extra components */}
      </div>
      <div>
        <NavDropdown logout={logout} router={router} state={props.state} />
      </div>
    </nav>
  );
}
