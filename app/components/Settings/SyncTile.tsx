"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { LiaSyncAltSolid } from "react-icons/lia";

export default function SyncTile() {
  const [syncing, setSyncing] = useState(false);
  const { data: session } = useSession();
  async function syncData() {
    setSyncing(true);
    let synced = false;
    if (session && session.user && session.user.email) {
      try {
        const rawData = await fetch(
          `/api/getAccountByEmail/${session.user.email}`,
        );
        const dataFromCloud = await rawData.json();
        localStorage.setItem("account", JSON.stringify(dataFromCloud));
        synced = true;
      } catch {
        synced = false;
      }
    }
    setSyncing(false);
    if (synced) {
      toast.success("Account synced successfully");
    } else {
      toast.error("Could not sync account, please try again later");
    }
  }

  return (
    <div>
      {/* TODO: Add proper style */}
      <Toaster position="top-center" />
      <button
        className="my-3 flex w-fit items-center justify-center gap-2 rounded-md border border-green-500 px-4 py-2 text-green-900 transition-all duration-300 hover:bg-green-400"
        onClick={() => {
          syncData();
        }}
      >
        <p className={`${syncing ? "animate-spin" : "animate-none"}`}>
          <LiaSyncAltSolid />
        </p>
        <p>Sync Account</p>
      </button>
    </div>
  );
}
