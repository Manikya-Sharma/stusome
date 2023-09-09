"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BarLoader from "react-spinners/BarLoader";
import { State } from "@/app/types/user";
import toast, { Toaster } from "react-hot-toast";

export default function ChangePassword({ params }: { params: { id: string } }) {
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

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const reNewPasswordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (
      newPasswordRef.current != null &&
      oldPasswordRef.current != null &&
      reNewPasswordRef.current != null
    ) {
      const newPassword = newPasswordRef.current.value;
      const reNewPassword = reNewPasswordRef.current.value;
      const oldPassword = oldPasswordRef.current.value;
      if (
        !newPassword.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
      ) {
        toast(
          "Password must contain at-least 8 characters with minimum one letter, one number and one special character",
          { duration: 6000 }
        );
        toast.error("Invalid password");
        setLoading(false);
        return;
      }
      if (reNewPassword !== newPassword) {
        toast.error("Passwords don't match");
        setLoading(false);
        return;
      }
      try {
        fetch(`/api/updateAccountByEmail/${state.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }).then(() => {
          const existing = localStorage.getItem("account");
          if (existing != null && newPassword != null) {
            const pwd = JSON.parse(existing).password;
            if (pwd != oldPassword) {
              toast.error("Incorrect password");
              setLoading(false);
              return;
            }
            const new_account = {
              ...JSON.parse(existing),
              password: newPassword,
            };
            localStorage.setItem("account", JSON.stringify(new_account));
            setLoading(false);
            router.push(`/logged-in/${state._id}`);
          }
        });
      } catch (e) {
        toast("An error occurred, please try again later");
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
      <main className="h-full flex items-center gradient font-fancy">
        <div className="w-fit mx-auto">
          <div className="max-w-[90%] gradient-sub w-fit mx-auto p-10 text-white rounded-lg">
            <h1 className="font-merri text-center text-5xl mb-10">
              Change Password
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                handleSubmit();
              }}
            >
              <div className="grid grid-rows-2 grid-cols-2 items-center gap-2">
                <label className="text-lg" htmlFor="password">
                  Enter old password
                </label>
                <input
                  type="password"
                  name="password"
                  id="old_password"
                  className="bg-fuchsia-200 text-fuchsia-800 font-semibold px-3 py-2 rounded-xl"
                  ref={oldPasswordRef}
                />
                <label className="text-lg" htmlFor="password">
                  Enter new password
                </label>
                <input
                  type="password"
                  name="password"
                  id="new_password"
                  className="bg-fuchsia-200 text-fuchsia-800 font-semibold px-3 py-2 rounded-xl"
                  ref={newPasswordRef}
                />
                <label className="text-lg" htmlFor="password">
                  Re-enter new password
                </label>
                <input
                  type="password"
                  name="password"
                  id="new_password"
                  className="bg-fuchsia-200 text-fuchsia-800 font-semibold px-3 py-2 rounded-xl"
                  ref={reNewPasswordRef}
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
