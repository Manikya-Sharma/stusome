export default function Navbar() {
  return (
    <nav className="sm:flex items-center px-2 py-1 sm:px-8 sm:py-4 bg-slate-300">
      <div className="w-fit mx-auto sm:flex items-center">
        <div className="mr-2 p-1 text-center bg-slate-800 text-slate-200 rounded-full">
          Logo
        </div>
        <div>ProductName</div>
      </div>
      <div className="hidden sm:block sm:flex-grow">
        {/* Middle space for extra components */}
      </div>
      <div className="w-fit mx-auto">
        <button className="px-4 py-2 bg-slate-600 text-slate-200 hover:bg-slate-800 transition-all duration-300 rounded-md">
          Login
        </button>
      </div>
    </nav>
  );
}
