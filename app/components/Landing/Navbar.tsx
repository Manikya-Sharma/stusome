import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex fixed w-[100vw] justify-between items-center px-2 py-1 sm:px-8 sm:py-4 bg-[#04173a] backdrop-blur-lg">
      <div className="items-center sm:flex">
        <div className="mr-2 p-1 text-center bg-slate-800 text-slate-200 rounded-full">
          Logo
        </div>
      </div>
      <div className="hidden sm:block sm:flex-grow">
        {/* Middle space for extra components */}
      </div>
      <div>
        <button className="px-4 py-2 bg-[#beb7a4] text-slate-900 hover:bg-[#ff4365] hover:text-[#fffffc] transition-all duration-300 rounded-md">
          <Link href="/login">Login</Link>
        </button>
      </div>
    </nav>
  );
}
