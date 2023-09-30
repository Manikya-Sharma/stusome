"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { PropagateLoader, MoonLoader } from "react-spinners";
import LoginTile from "../components/Login/LoginTile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "authenticated") {
      router.replace("/explore");
    }
  }, [status, router]);

  return (
    <main>
      {status == "loading" || status == "authenticated" ? (
        <div className="flex h-screen items-center justify-center">
          <PropagateLoader />
        </div>
      ) : (
        <div className="gradient flex h-screen items-center">
          <div className="mx-auto flex h-fit w-fit flex-col gap-3 rounded-md px-5 py-8">
            <LoginTile type="github">Sign in with github</LoginTile>
            <LoginTile type="google">Sign in with google</LoginTile>
          </div>
        </div>
      )}
    </main>
  );
}
