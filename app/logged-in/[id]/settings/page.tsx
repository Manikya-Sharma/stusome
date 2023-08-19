"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import accounts from "@/public/accounts.json";
import Link from "next/link";
import Image from "next/image";

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
    <main className="px-4">
      <div className="h-10">
        <Link href={`/logged-in/${state.id}`}>
          <Image
            src="/images/misc/back.svg"
            alt="back"
            width={28}
            height={28}
          />
        </Link>
      </div>
      <p>User settings for {state.name}</p>
    </main>
  );
}
