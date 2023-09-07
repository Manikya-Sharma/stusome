"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Tile from "@/app/components/Settings/Tile";
import { LuArrowLeft } from "react-icons/lu";

type Params = {
  params: { id: string };
};

export default function AccountSettings({ params }: Params) {
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
    <div className="pt-10">
      <Link href={`/logged-in/${state._id}/settings/account/changePicture`}>
        <Tile
          description="Change Profile Picture"
          type="normal"
          logo="addPhoto"
        />
      </Link>
      <Link href={`/logged-in/${state._id}/settings/account/changeUsername`}>
        <Tile description="Change Username" type="normal" logo="rename" />
      </Link>
      <Link href={`/logged-in/${state._id}/settings/account/changePassword`}>
        <Tile description="Change Password" type="normal" logo="password" />
      </Link>
    </div>
  );
}
