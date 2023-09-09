"use Client";
import { State } from "@/app/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FC, useRef } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  userEmail: string;
}

const Sidebar: FC<SidebarProps> = ({ userEmail }) => {
  const pathName = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [friends, setFriends] = useState<State[]>([]);

  useEffect(() => {
    async function fetchData() {
      const rawExistingFriends = await fetch("/api/getFriends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail),
      });
      const rawExistingFriendIds =
        (await rawExistingFriends.json()) as string[];
      const existingFriendIds = rawExistingFriendIds
        .filter((elem) => elem.includes(userEmail))
        .map((idBelonging) =>
          idBelonging
            .split(":")
            .filter((id) => id != userEmail && id != "friend")
        );
      const existingFriends: State[] = [];

      for (const id of existingFriendIds) {
        const friend = await fetch(`/api/getAccountByEmail/${id[0]}`);
        const parsedFriend = await friend.json();
        if (parsedFriend != null) {
          existingFriends.push(parsedFriend);
        }
      }
      setFriends(existingFriends);
    }
    fetchData();
  }, [userEmail]);

  async function handleSubmit() {
    if (inputRef.current != null) {
      const emailValue = inputRef.current.value;
      const rawFriendAccount = await fetch(
        `/api/getAccountByEmail/${emailValue}`
      );
      const friendAccount = (await rawFriendAccount.json()) as State;
      await fetch("/api/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: userEmail,
          friendEmail: friendAccount.email,
        }),
      });
      setFriends([...friends, friendAccount]);
    }
  }
  return (
    <div className="min-h-screen dark:bg-slate-900 dark:text-slate-200">
      <h1 className="text-center text-7xl py-5">Your Chats</h1>
      <div>
        {friends.map((elem) => {
          return (
            <Link
              href={pathName + `/${elem.email}`}
              key={elem._id}
              className="group tracking-wide flex gap-2 items-center justify-center max-w-[80%] min-w-fit mx-auto dark:bg-slate-700 bg-slate-300 py-4 px-3 rounded-lg text-xl font-fancy dark:hover:bg-slate-600 dark:hover:text-white hover:bg-slate-700 hover:text-slate-200 transition-colors duration-300"
            >
              <p>{elem.name}</p>
              <p className="dark:text-slate-500 text-slate-600 group-hover:text-slate-300 text-sm">
                ({elem.email})
              </p>
            </Link>
          );
        })}
      </div>
      <div>
        <h2 className="text-3xl text-center mt-8 mb-6">Add New Chat</h2>
        <div className="flex items-center justify-center gap-5">
          <input
            type="text"
            ref={inputRef}
            className="dark:bg-slate-200 bg-slate-300 dark:text-slate-950 py-2 px-3 leading-relaxed rounded-md dark:placeholder:text-slate-700 dark:hover:bg-slate-300 placeholder:text-slate-800"
            placeholder="Enter email of your friend"
            onKeyDown={(e) => {
              e.preventDefault();
              if (e.key == "Enter") {
                handleSubmit();
                e.currentTarget.value = "";
              }
            }}
          />
          <button
            onClick={handleSubmit}
            className="block w-fit px-3 py-2 dark:bg-slate-300 bg-emerald-500 text-slate-100 rounded-lg dark:text-emerald-800 dark:hover:bg-emerald-400 dark:hover:text-emerald-950 transition-colors duration-200 border-2 dark:border-emerald-400 hover:text-emerald-950 hover:bg-emerald-300 hover:border-emerald-950"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
