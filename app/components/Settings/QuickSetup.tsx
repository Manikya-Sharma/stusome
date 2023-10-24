import { LiaSyncAltSolid } from "react-icons/lia";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { quicksand } from "@/custom-fonts/fonts";

export default function QuickSetup() {
  const [syncing, setSyncing] = useState(false);
  const { data: session } = useSession();

  const syncedData = useRef<string | null>(null);
  useEffect(() => {
    syncedData.current = localStorage.getItem("account");
  });
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  function handleTheme(mode: "light" | "dark") {
    localStorage.setItem("theme", mode);
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add(mode);
    setTheme(mode);
  }
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
        syncedData.current = JSON.stringify(dataFromCloud);
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
    <>
      <h2 className="text-lg">Quick Setup</h2>
      <ul>
        <li>
          <div
            className="mx-auto w-[80px] cursor-pointer rounded-3xl bg-slate-300 px-3 py-2 dark:bg-slate-500"
            onClick={(e) => {
              e.stopPropagation();
              handleTheme(theme == "dark" ? "light" : "dark");
            }}
          >
            <div
              className={
                "transition-transform duration-200 " +
                (theme == "dark" ? "translate-x-[30px]" : "translate-x-0")
              }
            >
              {
                <DarkModeSwitch
                  checked={theme == "dark"}
                  onChange={() =>
                    handleTheme(theme == "dark" ? "light" : "dark")
                  }
                  size={25}
                />
              }
            </div>
          </div>
        </li>
        <li>
          <button
            className="my-3 flex w-fit items-center justify-center gap-2 rounded-md border border-green-500 bg-green-200 px-4 py-2 text-green-900 transition-all duration-300 hover:bg-green-400"
            onClick={() => {
              syncData();
            }}
          >
            <p className={`${syncing ? "animate-spin" : "animate-none"}`}>
              <LiaSyncAltSolid />
            </p>
            <p className={quicksand.className}>Sync Account</p>
          </button>
        </li>
      </ul>
    </>
  );
}
