import Link from "next/link";
import Image from "next/image";
import { LuLogIn } from "react-icons/lu";

export default function Navbar() {
  return (
    <nav className="fixed z-[100] flex w-[100vw] items-center justify-between bg-[rgba(50,50,50,0.1)] px-2 py-1 backdrop-blur-sm sm:px-8 sm:py-4">
      <div className="items-center rounded-lg bg-[rgba(200,200,200,0.7)] px-2 transition-all duration-200 hover:bg-white sm:flex">
        <Image src="/logo-full-tx.png" alt="stusome" width={100} height={90} />
      </div>
      <div className="hidden sm:block sm:flex-grow">
        {/* Middle space for extra components */}
      </div>
      <div>
        <Link
          className="flex items-center gap-2 rounded-2xl border-2 border-red-400 bg-[rgba(100,20,20,0.7)] px-4 py-2 text-red-100 transition-all duration-300 hover:bg-rose-300 hover:text-slate-700"
          href="login"
        >
          Login
          <LuLogIn />
        </Link>
      </div>
    </nav>
  );
}
