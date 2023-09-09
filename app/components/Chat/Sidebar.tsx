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
      if (rawFriendAccount != null) {
      }
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
    <div className="min-h-screen bg-slate-500">
      <div>
        {friends.map((elem) => {
          return (
            <div key={elem._id}>
              <Link href={pathName + `/${elem._id}`}>{elem.name}</Link>
            </div>
          );
        })}
      </div>
      <div>Add new Chat</div>
      <div className="flex items-center justify-between">
        <input type="text" ref={inputRef} />
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default Sidebar;
