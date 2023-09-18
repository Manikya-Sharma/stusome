"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { LuHome } from "react-icons/lu";
import { IconContext } from "react-icons";

export default function Signup() {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  function handleSubmit() {
    if (
      nameRef.current != null &&
      emailRef.current != null &&
      passwordRef.current != null
    ) {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      if (!name.match(/^[a-zA-Z0-9 ]*$/) || name.trim() === "") {
        toast.error("Invalid name");
        setLoading(false);
        return;
      }
      if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        toast.error("Invalid email");
        setLoading(false);
        return;
      }
      // 8 characters, 1 letter, 1 number, 1 special character
      if (
        !password.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        )
      ) {
        toast(
          "Password must contain at-least 8 characters with minimum one letter, one number and one special character",
          { duration: 6000 },
        );
        toast.error("Invalid password");
        setLoading(false);
        return;
      }

      try {
        fetch("/api/createAccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }).then(() => {
          fetch(`/api/getAccountByEmail/${email}`).then((acc) => {
            acc.json().then((json) => {
              localStorage.setItem("account", JSON.stringify(json));
              router.replace(`/logged-in/${json._id}`);
            });
          });
        });
      } catch (err) {
        toast.error(`Some error occurred, please try again later`);
        console.log(err);
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
        <Link
          href="/"
          className="absolute left-1 top-1 text-lg text-slate-200 underline-offset-2 hover:underline"
        >
          <IconContext.Provider
            value={{ className: "shared-class", size: "30" }}
          >
            <div className="flex items-center justify-start gap-2 ">
              <LuHome />
            </div>
          </IconContext.Provider>
        </Link>
        <div className="mx-auto w-fit">
          <div className="gradient-sub mx-auto w-fit max-w-[80%] rounded-lg p-10 text-white">
            <h1 className="mb-10 text-center font-merri text-5xl">Signup</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                handleSubmit();
              }}
            >
              <div className="grid grid-cols-2 grid-rows-3 items-center gap-2">
                <label className="text-xl" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="rounded-xl bg-fuchsia-200 px-3 py-2 font-semibold text-fuchsia-800"
                  ref={nameRef}
                />

                <label className="text-xl" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="rounded-xl bg-fuchsia-200 px-3 py-2 font-semibold text-fuchsia-800"
                  ref={emailRef}
                />

                <label className="text-xl" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="rounded-xl bg-fuchsia-200 px-3 py-2 font-semibold text-fuchsia-800"
                  ref={passwordRef}
                />
              </div>

              <button
                type="submit"
                className="mx-auto mt-5 block w-fit rounded-md bg-gradient-to-br from-fuchsia-300 to-fuchsia-500 px-4 py-2 transition-all duration-300 hover:from-fuchsia-100 hover:to-rose-300 hover:text-rose-900"
              >
                Continue
              </button>
            </form>
          </div>
          <p className="mt-10 text-center text-slate-100">
            Already a user?{" "}
            <Link
              href="/login"
              className="text-fuchsia-200 underline-offset-2 hover:underline"
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
