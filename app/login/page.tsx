"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import BarLoader from "react-spinners/BarLoader";

async function handleSubmit(
  emailRef: React.RefObject<HTMLInputElement>,
  passwordRef: React.RefObject<HTMLInputElement>,
  router: AppRouterInstance,
  loader: Function
) {
  if (emailRef.current != null && passwordRef.current != null) {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const user = await fetch(`/api/getAccountByEmail/${email}`);
    const userData = await user.json();
    if (userData == null || userData.password != password) {
      console.log("Invalid username or password");
      loader(false);
      return;
    } else {
      localStorage.setItem("account", JSON.stringify(userData));
      router.push(`/logged-in/${userData._id}`);
    }
  }
}

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const router = useRouter();
  useEffect(() => {
    const userData = localStorage.getItem("account");
    setLoading(false);
    if (userData != null) {
      const jsonUserData = JSON.parse(userData);
      router.push(`/logged-in/${jsonUserData._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  return (
    <div className="h-screen">
      <div className="overflow-hidden">
        <BarLoader
          loading={loading}
          color={"#36d7b7"}
          speedMultiplier={1.5}
          width={width}
          cssOverride={{ backgroundColor: "cadetblue" }}
        />
      </div>
      <main className="h-full flex items-center gradient font-fancy">
        <Link
          href="/"
          className="absolute top-1 left-1 text-slate-200 text-lg hover:underline underline-offset-2"
        >
          Home
        </Link>
        <div className="w-fit mx-auto">
          <div className="max-w-[80%] gradient-sub w-fit mx-auto p-10 text-white rounded-lg">
            <h1 className="font-merri text-center text-5xl mb-10">Login</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                handleSubmit(email, password, router, setLoading);
              }}
            >
              <div className="grid grid-rows-2 grid-cols-2 items-center gap-2">
                <label className="text-xl" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-fuchsia-200 text-fuchsia-800 font-semibold px-3 py-2 rounded-xl"
                  ref={email}
                />

                <label className="text-xl" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-fuchsia-200 text-fuchsia-800 font-semibold px-3 py-2 rounded-xl"
                  ref={password}
                />
              </div>
              <button
                type="submit"
                className="block w-fit mx-auto px-4 py-2 rounded-md mt-5 bg-gradient-to-br from-fuchsia-300 to-fuchsia-500 hover:from-fuchsia-100 hover:to-rose-300 hover:text-rose-900 transition-all duration-300"
              >
                Continue
              </button>
            </form>
          </div>
          <p className="mt-10 text-center text-slate-100">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-fuchsia-200 hover:underline underline-offset-2"
            >
              signup
            </Link>
            !
          </p>
        </div>
      </main>
    </div>
  );
}
