"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { BarLoader } from "react-spinners";

function handleSubmit(
  nameRef: React.RefObject<HTMLInputElement>,
  emailRef: React.RefObject<HTMLInputElement>,
  passwordRef: React.RefObject<HTMLInputElement>,
  router: AppRouterInstance
) {
  if (
    nameRef.current != null &&
    emailRef.current != null &&
    passwordRef.current != null
  ) {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    fetch("/api/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    }).then(() => {
      fetch(`/api/getAccountByEmail/${email}`).then((acc) => {
        acc.json().then((json) => {
          localStorage.setItem("account", JSON.stringify(json));
          router.push(`/logged-in/${json._id}`);
        });
      });
    });
  }
}

export default function Signup() {
  const router = useRouter();
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

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
            <h1 className="font-merri text-center text-5xl mb-10">Signup</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                handleSubmit(name, email, password, router);
              }}
            >
              <div className="grid grid-rows-3 grid-cols-2 items-center gap-2">
                <label className="text-xl" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-fuchsia-200 text-fuchsia-800 font-semibold px-3 py-2 rounded-xl"
                  ref={name}
                />

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
            Already a user?{" "}
            <Link
              href="/login"
              className="text-fuchsia-200 hover:underline underline-offset-2"
            >
              login
            </Link>
            !
          </p>
        </div>
      </main>
    </div>
  );
}
