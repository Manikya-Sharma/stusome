import Link from "next/link";
import Image from "next/image";
import { LuLogIn } from "react-icons/lu";

export default function Navbar() {
  return (
    <nav className="flex z-[100] fixed w-[100vw] justify-between items-center px-2 py-1 sm:px-8 sm:py-4 backdrop-blur-sm bg-[rgba(50,50,50,0.1)]">
      <div className="items-center sm:flex bg-[rgba(200,200,200,0.7)] rounded-lg px-2 hover:bg-white transition-all duration-200">
        <Image src="/logo-full-tx.png" alt="stusome" width={100} height={90} />
      </div>
      <div className="hidden sm:block sm:flex-grow">
        {/* Middle space for extra components */}
      </div>
      <div>
        <Link
          className="flex gap-2 items-center px-4 py-2 bg-[rgba(100,20,20,0.7)] hover:text-slate-700 text-red-100 hover:bg-rose-300 border-2 border-red-400 transition-all duration-300 rounded-2xl"
          href="login"
        >
          Login
          <LuLogIn />
        </Link>
      </div>
    </nav>
  );
}
