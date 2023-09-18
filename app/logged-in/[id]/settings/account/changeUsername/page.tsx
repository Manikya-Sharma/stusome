"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import BarLoader from "react-spinners/BarLoader";
import { State } from "@/app/types/user";
import toast, { Toaster } from "react-hot-toast";

export default function ChangeUsername({ params }: { params: { id: string } }) {
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
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current != null) {
      usernameRef.current.value = state.name;
    }
  }, [state.name]);

  async function handleSubmit() {
    if (usernameRef.current != null) {
      const username = usernameRef.current.value;
      if (!username.match(/^[a-zA-Z0-9 ]*$/) || username.trim() === "") {
        toast.error("Invalid name");
        setLoading(false);
        return;
      }
      try {
        fetch(`/api/updateAccountByEmail/${state.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: username }),
        }).then(() => {
          const existing = localStorage.getItem("account");
          if (existing != null && username != null) {
            const new_account = {
              ...JSON.parse(existing),
              name: username,
            };
            localStorage.setItem("account", JSON.stringify(new_account));
            setLoading(false);
            router.push(`/logged-in/${state._id}`);
          }
        });
      } catch (e) {
        toast.error("An error occurred, please try again later");
        console.log(e);
        setLoading(false);
      }
    }
  }

  return (
    <div className="h-screen">
      <Toaster />
      <div className="absolute top-0">
        <BarLoader
          loading={loading}
          color={"#36d7b7"}
          speedMultiplier={1.5}
          width={width}
          cssOverride={{ backgroundColor: "rgba(0,0,255,0.3)" }}
        />
      </div>
      <main className="gradient flex h-full items-center font-fancy">
        <div className="mx-auto w-fit">
          <div className="gradient-sub mx-auto w-fit max-w-[80%] rounded-lg p-10 text-white">
            <h1 className="mb-10 text-center font-merri text-5xl">
              Change Username
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                handleSubmit();
              }}
            >
              <div className="grid grid-cols-2 grid-rows-1 items-center gap-2">
                <label className="text-xl" htmlFor="username">
                  New Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="rounded-xl bg-fuchsia-200 px-3 py-2 font-semibold text-fuchsia-800"
                  ref={usernameRef}
                />
              </div>
              <button
                type="submit"
                className="mx-auto mt-5 block w-fit rounded-md bg-gradient-to-br from-fuchsia-300 to-fuchsia-500 px-4 py-2 transition-all duration-300 hover:from-fuchsia-100 hover:to-rose-300 hover:text-rose-900"
              >
                Change
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
