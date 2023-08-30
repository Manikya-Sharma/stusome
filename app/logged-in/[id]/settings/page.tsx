"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

import Tile from "@/app/components/Settings/Tile";

type Params = {
  params: { id: string };
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
      router.push("/login");
    }
  }, [id, router, state._id]);
  return (
    <main className="px-4">
      <div className="mb-5">
        <Link
          href={`/logged-in/${state._id}/`}
          className="absolute top-1 left-1 text-slate-800 text-lg hover:underline underline-offset-2"
        >
          Back
        </Link>
      </div>
      <div className="mt-5 mb-7">
        <h1 className="text-6xl text-center font-merri tracking-tighter">
          Settings
        </h1>
      </div>

      <div className="text-lg">
        <div className="">
          <div>
            <Link href={`/logged-in/${params.id}/settings/account`}>
              <Tile description="Account" type="normal" />
            </Link>
          </div>
          <div>
            <Link href={`/logged-in/${params.id}/settings/app`}>
              <Tile description="App Settings" type="normal" />
            </Link>
          </div>
          <div>
            <Link href={`/logged-in/${params.id}/settings/privacy`}>
              <Tile description="Privacy" type="normal" />
            </Link>
          </div>
        </div>
        <div
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
        >
          <Tile description="Logout" type="danger" />
        </div>
      </div>
    </main>
  );
}
