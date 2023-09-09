"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

import Tile from "@/app/components/Settings/Tile";
import UserInfoContainer from "@/app/components/Settings/UserInfoContainer";

type Params = {
  params: { id: string };
};

export default function Settings({ params }: Params) {
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
  return (
    <>
      <UserInfoContainer props={{ state: state }}>
        <div className="sm:min-w-[60vw] transition-colors duration-200">
          <div className="pt-5 mb-7">
            <h1 className="text-6xl text-center font-merri tracking-tighter">
              Settings
            </h1>
          </div>

          <div className="text-lg">
            <div className="">
              <div>
                <Link href={`/logged-in/${params.id}/settings/account`}>
                  <Tile description="Account" type="normal" logo={"user"} />
                </Link>
              </div>
              <div>
                <Link href={`/logged-in/${params.id}/settings/app`}>
                  <Tile
                    description="App Settings"
                    type="normal"
                    logo="settings"
                  />
                </Link>
              </div>
              <div>
                <Link href={`/logged-in/${params.id}/settings/privacy`}>
                  <Tile description="Privacy" type="normal" logo="lock" />
                </Link>
              </div>
            </div>
            <div
              onClick={() => {
                localStorage.clear();
                router.push("/");
              }}
            >
              <Tile description="Logout" type="danger" logo="logout" />
            </div>
          </div>
        </div>
      </UserInfoContainer>
    </>
  );
}
