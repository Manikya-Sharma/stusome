"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import accounts from "@/public/accounts.json";

import Navbar from "@/app/components/LoggedIn/Navbar";
import Welcome from "@/app/components/LoggedIn/Welcome";

type State = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export default function LoggedIn() {
  const pathname = usePathname();
  const id = parseInt(pathname.split("/")[2]);
  const [state, setState] = useState({
    id: id,
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    for (const account of accounts) {
      if (account.id == id) {
        setState(account);
      }
    }
  }, [id]);
  return (
    <main>
      <Navbar id={id} />
      <div className="px-8 py-32">
        <Welcome name={state.name} />
      </div>
    </main>
  );
}
