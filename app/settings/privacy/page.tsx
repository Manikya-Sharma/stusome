"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Params = {
  params: { id: string };
};

export default function PrivacySettings({ params }: Params) {
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
      router.replace("/login");
    } else {
      setState(() => JSON.parse(account));
    }
  }, [router]);
  useEffect(() => {
    if (id != state._id && state._id != "") {
      router.push("/login");
    }
  }, [id, router, state._id]);
  return <main className="px-4">Hi {state.name}</main>;
}