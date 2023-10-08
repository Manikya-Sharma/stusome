"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import toast, { Toaster } from "react-hot-toast";

export default function ChangeUsername() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);
  const [state, setState] = useState({ name: "", email: "" });
  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) {
      setState(JSON.parse(account));
    }
  }, []);
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
            router.push(`/explore`);
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
              Change Display Name
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
                  New Name
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
