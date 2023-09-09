"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BarLoader from "react-spinners/BarLoader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { LuHome } from "react-icons/lu";
import { LiaKeySolid } from "react-icons/lia";

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
      router.replace(`/logged-in/${jsonUserData._id}`);
    }
  }, [router]);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  async function handleSubmit() {
    if (emailRef.current != null && passwordRef.current != null) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        toast.error("Invalid email");
        setLoading(false);
        return;
      }
      // 8 characters, 1 letter, 1 number, 1 special character
      if (
        !password.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
      ) {
        toast.error("Invalid password");
        setLoading(false);
        return;
      }

      try {
        const user = await fetch(
          `/api/getAccountByEmail/${email == "" ? "a" : email}`
        );
        const userData = await user.json();
        if (userData == null || userData.password != password) {
          toast.error("Incorrect username or password");
          setLoading(false);
          return;
        } else {
          localStorage.setItem("account", JSON.stringify(userData));
          router.replace(`/logged-in/${userData._id}`);
        }
      } catch (e) {
        toast.error(`Some error occurred, please try again later`);
        console.log(e);
        setLoading(false);
      }
    }
  }

  return (
    <div className="h-screen">
      <Toaster position="top-center" reverseOrder={false} />
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
          href="/"
          className="absolute top-1 left-1 text-slate-200 text-lg hover:underline underline-offset-2"
        >
          <div className="flex items-center justify-start gap-2 ">
            <LuHome />
            Home
          </div>
        </Link>
        <div className="w-fit mx-auto">
          <div className="max-w-[80%] gradient-sub w-fit mx-auto p-10 text-white rounded-lg">
            <h1 className="font-merri text-center text-5xl mb-10">Login</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                handleSubmit();
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
                  ref={emailRef}
                />

                <label className="text-xl" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-fuchsia-200 text-fuchsia-800 font-semibold px-3 py-2 rounded-xl"
                  ref={passwordRef}
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-between gap-2 w-fit mx-auto px-4 py-2 rounded-md mt-5 bg-gradient-to-br from-fuchsia-300 to-fuchsia-500 hover:from-fuchsia-100 hover:to-rose-300 hover:text-rose-900 transition-all duration-300"
              >
                <LiaKeySolid />
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
