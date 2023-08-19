"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import NavDropdown from "@/app/components/LoggedIn/NavDropdown";

function logout(router: AppRouterInstance) {
  localStorage.clear();
  router.push("/");
}

type State = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type Props = {
  state: State;
};

export default function Navbar(props: Props) {
  const router = useRouter();
  return (
    <nav className="flex fixed w-[100vw] justify-between items-center px-4 py-1 sm:px-8 sm:py-4 backdrop-blur-sm">
      <div className="items-center sm:flex">
        <div className="mr-2 p-1 text-center bg-slate-800 text-slate-200 rounded-full">
          Logo
        </div>
      </div>
      <div className="hidden sm:block sm:flex-grow">
        {/* Middle space for extra components */}
      </div>
      <div>
        <NavDropdown logout={logout} router={router} id={props.state.id} />
      </div>
    </nav>
  );
}
