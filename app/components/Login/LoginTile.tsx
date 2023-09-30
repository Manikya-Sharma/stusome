"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { ReactNode, PropsWithChildren } from "react";
import { MoonLoader } from "react-spinners";
import { LiaGithub } from "react-icons/lia";
import { IconContext } from "react-icons";
import { LuMail } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export default function LoginTile(
  props: PropsWithChildren<{ type: "github" | "email" | "google" }>,
) {
  const [loading, setLoading] = useState<boolean>(false);
  async function loadSigning(via: "github" | "google") {
    setLoading(true);
    const load = await signIn(via);
    if (load?.ok) {
      setLoading(false);
    }
  }
  return (
    <IconContext.Provider value={{ className: "shared-class", size: "30" }}>
      <div
        className="w-git h-fit cursor-pointer rounded-md bg-[rgba(255,255,255,0.6)] px-5 py-3 transition-all duration-200 hover:bg-[rgba(50,50,50,0.8)] hover:text-slate-300"
        onClick={() => {
          if (props.type != "email") {
            loadSigning(props.type);
          }
        }}
      >
        <div className="flex items-center justify-around gap-2">
          <div>
            {loading ? (
              <MoonLoader size={18} color={"#dd99aa"} />
            ) : (
              <div>
                {props.type == "github" && <LiaGithub />}
                {props.type == "google" && <FcGoogle />}
                {props.type == "email" && <LuMail />}
              </div>
            )}
          </div>
          <p>{props.children}</p>
        </div>
      </div>
    </IconContext.Provider>
  );
}
