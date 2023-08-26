"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

type Params = {
  params: { id: string };
};

type State = {
  name: string;
  email: string;
  password: string;
};

export default function LoggedIn({ params }: Params) {
  const router = useRouter();
  const id = params.id;
  const [state, setState] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account == null) {
      localStorage.removeItem("account");
      router.push("/login");
    } else {
      setState(() => JSON.parse(account));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (id != state._id && state._id != "") {
      console.log(id, state._id);
      router.push("/login");
    }
  }, [id, router, state._id]);
  return (
    <main className="px-4">
      <div className="h-10">
        <Link href={`/logged-in/${state._id}`}>
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
