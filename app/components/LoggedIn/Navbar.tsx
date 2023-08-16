"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

function logout(router: AppRouterInstance) {
  localStorage.clear();
  router.push("/");
}

type Props = {
  id: number;
};

export default function Navbar(props: Props) {
  const router = useRouter();
  return (
    <nav className="flex fixed w-[100vw] justify-between items-center px-2 py-1 sm:px-8 sm:py-4 backdrop-blur-sm">
      <div className="items-center sm:flex">
        <div className="mr-2 p-1 text-center bg-slate-800 text-slate-200 rounded-full">
          Logo
        </div>
      </div>
      <div className="hidden sm:block sm:flex-grow">
        {/* Middle space for extra components */}
      </div>
      <div>
        <button
          className="px-4 py-2 bg-gradient-to-r from-rose-300 to-rose-800 hover:text-fuchsia-200 text-[#fffffc] hover:from-rose-800 hover:to-rose-700 transition-all duration-300 rounded-md"
          onClick={() => logout(router)}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
