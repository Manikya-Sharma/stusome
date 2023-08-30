"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import NavDropdown from "@/app/components/LoggedIn/NavDropdown";
import Image from "next/image";

function logout(router: AppRouterInstance) {
  localStorage.clear();
  router.push("/");
}

type State = {
  _id: string;
  name: string;
  email: string;
  password: string;
  picture: string;
  hasPic: boolean;
};

type Props = {
  state: State;
};

export default function Navbar(props: Props) {
  const router = useRouter();
  return (
    <nav className="flex z-[100] fixed w-[100vw] justify-between items-center px-4 py-1 sm:px-8 sm:py-4 backdrop-blur-sm">
      <div>
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
