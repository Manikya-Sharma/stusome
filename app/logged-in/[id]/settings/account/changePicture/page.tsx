"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BarLoader from "react-spinners/BarLoader";
import { State } from "@/app/types/user";
import { LuTrash2 } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";
import { IconContext } from "react-icons";

export default function ChangePicture({ params }: { params: { id: string } }) {
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

  const picRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (picRef.current != null && picRef.current.files != null) {
      try {
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
                setLoading(false);
                router.push(`/logged-in/${state._id}`);
              }
            });
          }
        };
        reader.readAsDataURL(pic);
      } catch (e) {
        toast.error("An error occurred, please try again later");
        console.log(e);
        setLoading(false);
      }
    }
  }

  async function removeProfile() {
    try {
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
        {" "}
        <div className="mx-auto w-fit">
          <div className="gradient-sub mx-auto w-fit max-w-[80%] rounded-lg p-10 text-white">
            <h1 className="mb-3 text-center font-merri text-5xl">
              Change Profile Picture
            </h1>
            <p className="mb-10 text-center text-sm">
              Only png images supported as of now
            </p>
            <div className="flex flex-col items-center">
              <label className="text-xl" htmlFor="pic">
                <div className="flex h-52 max-h-full w-52 max-w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full bg-slate-400 align-middle hover:grayscale">
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
                ref={picRef}
                onChange={() => {
                  setLoading(true);
                  handleSubmit();
                }}
              />
            </div>
            <div>
              <IconContext.Provider
                value={{ className: "shared-class", size: "18" }}
              >
                <button
                  onClick={() => {
                    setLoading(true);
                    removeProfile();
                  }}
                  className="mx-auto mt-5 flex w-fit items-center justify-between gap-2 rounded-md bg-red-600 px-3 py-2 transition-all duration-200 hover:bg-red-100 hover:text-slate-800"
                >
                  <LuTrash2 />
                  Remove
                </button>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
