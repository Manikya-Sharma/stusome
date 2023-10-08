"use client";
import { useState } from "react";
import Link from "next/link";
import { LuDoorClosed, LuDoorOpen } from "react-icons/lu";
import { IconContext } from "react-icons";

export default function Footer() {
  function setDoor(newState: "open" | "close") {
    setOpen(newState);
  }

  const [open, setOpen] = useState<"open" | "close">("close");

  return (
    <div>
      <div className="mx-auto my-5 min-w-fit max-w-[90%] items-center justify-between rounded-lg bg-slate-800 px-5 py-8 text-white md:flex">
        <h2 className="text-center text-3xl md:text-left">Begin the journey</h2>
        <IconContext.Provider value={{ className: "shared-class", size: "30" }}>
          <Link
            href="/login"
            className="mx-auto mt-5 flex w-fit items-center gap-3 rounded-lg border-2 border-emerald-400 px-5 py-3 text-lg transition-all duration-200 hover:bg-emerald-400 hover:text-slate-900 md:mr-0 md:mt-0"
            onMouseEnter={() => setDoor("open")}
            onMouseLeave={() => setDoor("close")}
          >
            {open == "close" ? <LuDoorClosed /> : <LuDoorOpen />}
            Signin
          </Link>
        </IconContext.Provider>
      </div>
      <div className="bg-gradient-to-b from-white to-amber-400 px-5 py-20 text-center text-3xl tracking-tighter text-black">
        <footer>
          <p>Deep . Dive . Create</p>
          <div className="mt-5 text-sm tracking-wider">
            <p>All rights reserved</p>
            <p>Lavya | Nikhil | Manikya</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
