"use client";

import React from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function CustomPropLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  useEffect(() => {
    async function getData() {
      const rawDisplayAccount = await fetch(
        `/api/getAccountByEmail/${session?.user?.email}`,
      );

      let displayAccount = await rawDisplayAccount.json();
      if (
        displayAccount == null &&
        session &&
        session.user &&
        session.user.email &&
        session.user.name &&
        session.user.image
      ) {
        // account does not exist
        await fetch(`/api/createAccount/`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            image_third_party: true,
            posts: [],
          }),
        });
        displayAccount = {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          image_third_party: true,
          posts: [],
        };
      }

      localStorage.setItem("account", JSON.stringify(displayAccount));
    }
    const acc = localStorage.getItem("account");
    if (!acc && session && session.user) {
      toast.promise(getData(), {
        loading: "Syncing your account",
        success: "Account synced successfully",
        error: "Could not sync your account",
      });
    }
  }, [session]);
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            border: "1px solid rgba(50,50,50, 0.3)",
          },
        }}
      />
      {children}
    </>
  );
}
