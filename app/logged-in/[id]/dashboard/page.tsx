"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

type State = {
  name: string;
  email: string;
  password: string;
};

export default function LoggedIn() {
  const pathname = usePathname();
  const email = pathname.split("/")[2];
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    fetch(`/api/getAccountByEmail/${email}`).then((data) => {
      data.json().then((json) => {
        setState(json);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="px-4">
      <div className="h-10">
        <Link href={`/logged-in/${state.email}`}>
          <Image
            src="/images/misc/back.svg"
            alt="back"
            width={28}
            height={28}
          />
        </Link>
      </div>
      <p>User dashboard for {state.name}</p>
    </main>
  );
}
