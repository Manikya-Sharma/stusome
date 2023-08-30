"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Navbar from "@/app/components/LoggedIn/Navbar";
import Welcome from "@/app/components/LoggedIn/Welcome";
import MostViewed from "@/app/components/LoggedIn/MostVeiwed";
import Frequents from "@/app/components/LoggedIn/Frequents";

type Params = {
  params: { id: string };
};

type State = {
  id: number;
  name: string;
  email: string;
  password: string;
  picture: string;
  hasPic: boolean;
};

export default function LoggedIn({ params }: Params) {
  const router = useRouter();
  const id = params.id;
  const [state, setState] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    picture: "",
    hasPic: false,
  });
  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account == null) {
      router.push("/login");
    } else {
      setState(() => JSON.parse(account));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // different user
    if (id != state._id && state._id != "") {
      localStorage.removeItem("account");
      router.push("/login");
    }
  }, [id, router, state._id]);

  return (
    <main>
      <Navbar state={state} />
      <div className="px-8 py-16 sm:py-20">
        <Welcome user={state} />

        <div className="sm:flex justify-around">
          <MostViewed />
          <Frequents />
        </div>
      </div>
    </main>
  );
}
