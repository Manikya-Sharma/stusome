"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import Navbar from "@/app/components/LoggedIn/Navbar";
import Welcome from "@/app/components/LoggedIn/Welcome";
import MostViewed from "@/app/components/LoggedIn/MostVeiwed";
import Frequents from "@/app/components/LoggedIn/Frequents";

type State = {
  id: number;
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
    async function fetchData() {
      const data = await fetch(`/api/getAccountByEmail/${email}`);
      const json = await data.json();
      console.log();
      setState(json);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
