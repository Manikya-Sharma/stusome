"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import BarLoader from "react-spinners/BarLoader";
import { State } from "@/app/types/user";
import { LuTrash2 } from "react-icons/lu";

async function handleSubmit(
  picRef: React.RefObject<HTMLInputElement>,
  state: State,
  router: AppRouterInstance,
  loader: Function
) {
  if (picRef.current != null && picRef.current.files != null) {
    const pic = picRef.current.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      const data = reader.result;
      if (typeof data == "string") {
        const base64 = data.replace("data:", "").replace(/^.+,/, "");
        fetch(`/api/updateAccountByEmail/${state.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ picture: base64, hasPic: true }),
        }).then(() => {
          const existing = localStorage.getItem("account");
          if (existing != null && pic != null) {
            const new_account = {
              ...JSON.parse(existing),
              picture: base64,
              hasPic: true,
            };
            localStorage.setItem("account", JSON.stringify(new_account));
            loader(false);
            router.push(`/logged-in/${state._id}`);
          }
        });
      }
    };
    reader.readAsDataURL(pic);
  }
}

async function removeProfile(
  state: State,
  router: AppRouterInstance,
  loader: Function
) {
  fetch(`/api/updateAccountByEmail/${state.email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ picture: "", hasPic: false }),
  }).then(() => {
    const existing = localStorage.getItem("account");
    if (existing != null) {
      const new_account = {
        ...JSON.parse(existing),
        picture: "",
        hasPic: false,
      };
      localStorage.setItem("account", JSON.stringify(new_account));
      loader(false);
      router.push(`/logged-in/${state._id}`);
    }
  });
}

export default function Login({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;
  const [state, setState] = useState<State>({
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
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const new_pic = useRef<HTMLInputElement>(null);

  return (
    <div className="h-screen">
      <div className="absolute top-0">
        <BarLoader
          loading={loading}
          color={"#36d7b7"}
          speedMultiplier={1.5}
          width={width}
          cssOverride={{ backgroundColor: "rgba(0,0,255,0.3)" }}
        />
      </div>
      <main className="h-full flex items-center gradient font-fancy">
        <Link
          href={`/logged-in/${state._id}/settings/account`}
          className="absolute top-1 left-1 text-slate-200 text-lg hover:underline underline-offset-2"
        >
          Back
        </Link>
        <div className="w-fit mx-auto">
          <div className="max-w-[80%] gradient-sub w-fit mx-auto p-10 text-white rounded-lg">
            <h1 className="font-merri text-center text-5xl mb-3">
              Change Profile Picture
            </h1>
            <p className="text-center mb-10 text-sm">
              Only png images supported as of now
            </p>
            <div className="flex flex-col items-center">
              <label className="text-xl" htmlFor="pic">
                <div className="flex flex-col items-center align-middle justify-center cursor-pointer w-52 h-52 max-w-full max-h-full rounded-full bg-slate-400 overflow-hidden hover:grayscale">
                  {state.hasPic && (
                    <Image
                      src={`data:image/png;base64,${state.picture}`}
                      alt=""
                      width={260}
                      height={260}
                    />
                  )}
                </div>
              </label>
              <input
                type="file"
                accept=".png"
                name="pic"
                id="pic"
                className="hidden"
                ref={new_pic}
                onChange={() => {
                  setLoading(true);
                  handleSubmit(new_pic, state, router, setLoading);
                }}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  setLoading(true);
                  removeProfile(state, router, setLoading);
                }}
                className="px-3 py-2 flex justify-between gap-2 items-center w-fit mx-auto bg-red-600 hover:bg-red-100 hover:text-slate-800 mt-5 transition-all duration-200 rounded-md"
              >
                <LuTrash2 />
                Remove
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
