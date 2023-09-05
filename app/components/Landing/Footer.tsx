"use client";
import { useState } from "react";
import Link from "next/link";
import { LuDoorClosed, LuDoorOpen } from "react-icons/lu";

export default function Footer() {
  function setDoor(newState: "open" | "close") {
    setOpen(newState);
  }

  const [open, setOpen] = useState<"open" | "close">("close");

  return (
    <div>
      <div className="md:flex justify-between items-center px-5 bg-slate-800 max-w-[90%] my-5 min-w-fit mx-auto rounded-lg py-8 text-white">
        <h2 className="text-3xl text-center md:text-left">Begin the journey</h2>
        <Link
          href="/signup"
          className="flex items-center gap-3 w-fit mx-auto mt-5 md:mt-0 md:mr-0 px-5 py-3 rounded-lg border-2 border-emerald-400 hover:bg-emerald-400 hover:text-slate-900 transition-all duration-200 text-lg"
          onMouseEnter={() => setDoor("open")}
          onMouseLeave={() => setDoor("close")}
        >
          {open == "close" ? <LuDoorClosed /> : <LuDoorOpen />}
          Signup
        </Link>
      </div>
      <div className="py-20 px-5 bg-gradient-to-b from-white to-amber-400 text-black text-center text-3xl tracking-tighter">
        <footer>
          <p>Deep . Dive . Create</p>
          <div className="text-sm tracking-wider mt-5">
            <p>All rights reserved</p>
            <p>Lavya | Nikhil | Manikya</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
