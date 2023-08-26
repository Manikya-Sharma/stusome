import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex z-[100] fixed w-[100vw] justify-between items-center px-2 py-1 sm:px-8 sm:py-4 backdrop-blur-sm">
      <div className="items-center sm:flex bg-[rgba(200,200,200,0.7)] rounded-lg px-2 hover:bg-white transition-all duration-200">
        <Image src="/logo-full-tx.png" alt="stusome" width={100} height={90} />
      </div>
      <div className="hidden sm:block sm:flex-grow">
        {/* Middle space for extra components */}
      </div>
      <div>
        <button className="px-4 py-2 bg-gradient-to-r from-rose-300 to-rose-800 hover:text-fuchsia-200 text-[#fffffc] hover:from-rose-800 hover:to-rose-700 transition-all duration-300 rounded-md">
          <Link href="/login">Login</Link>
        </button>
      </div>
    </nav>
  );
}
