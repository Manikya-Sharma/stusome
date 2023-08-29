"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import BarLoader from "react-spinners/BarLoader";

type State = {
  _id: string;
  email: string;
  name: string;
  password: string;
};

async function handleSubmit(
  passwordRef: React.RefObject<HTMLInputElement>,
  state: State,
  router: AppRouterInstance,
  loader: Function
) {
  if (passwordRef.current != null) {
    const password = passwordRef.current.value;
    fetch(`/api/updateAccountByEmail/${state.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    }).then(() => {
      const existing = localStorage.getItem("account");
      if (existing != null && password != null) {
        const new_account = {
          ...JSON.parse(existing),
          password: password,
        };
        localStorage.setItem("account", JSON.stringify(new_account));
        loader(false);
        router.push(`/logged-in/${state._id}`);
      }
    });
  }
}

export default function Login({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;
  const [state, setState] = useState<State>({
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
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const new_password = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (new_password.current != null) {
      new_password.current.value = state.password;
    }
  }, [state.password]);

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
            <h1 className="font-merri text-center text-5xl mb-10">
              Change Password
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                handleSubmit(new_password, state, router, setLoading);
              }}
            >
              <div className="grid grid-rows-1 grid-cols-2 items-center gap-2">
                <label className="text-xl" htmlFor="password">
                  New Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="bg-fuchsia-200 text-fuchsia-800 font-semibold px-3 py-2 rounded-xl"
                  ref={new_password}
                />
              </div>
              <button
                type="submit"
                className="block w-fit mx-auto px-4 py-2 rounded-md mt-5 bg-gradient-to-br from-fuchsia-300 to-fuchsia-500 hover:from-fuchsia-100 hover:to-rose-300 hover:text-rose-900 transition-all duration-300"
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