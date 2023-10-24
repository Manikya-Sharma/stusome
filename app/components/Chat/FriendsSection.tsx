"use Client";
import { State } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FC, useRef } from "react";
import { usePathname } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import { quicksand } from "@/custom-fonts/fonts";
// TODO: user photo might be stored as 3rd party link instead of BASE64

interface Props {
  userEmail: string;
}

const FriendsSection: FC<Props> = ({ userEmail }) => {
  const pathName = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);

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
      let existingFriendEmails = rawExistingFriendIds
        .filter((elem) => elem.includes(userEmail))
        .map((emailBelonging) =>
          emailBelonging
            .split(":")
            .filter((email) => email != userEmail && email != "friend"),
        );
      const existingFriends: State[] = [];

      const promises = existingFriendEmails.map((email) => {
        return fetch(`/api/getAccountByEmail/${email[0]}`)
          .then((rawData) => rawData.json())
          .then((data) => {
            existingFriends.push(data);
          })
          .catch((error) =>
            console.log(`Error fetching friends data: ${error}`),
          );
      });

      Promise.all(promises)
        .then(() => {
          setFriends(existingFriends.filter((elem) => elem != null));
          setLoadingData(false);
        })
        .catch((error) => console.log(`Error occured: ${error}`));
    }
    fetchData();
  }, [userEmail]);

  async function handleSubmit() {
    if (inputRef.current != null) {
      const emailValue = inputRef.current.value;
      const rawFriendAccount = await fetch(
        `/api/getAccountByEmail/${emailValue}`,
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
      inputRef.current.value = "";
    }
  }

  const [theme, setTheme] = useState<"dark" | "light">("light");
  // theme
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    }
  }, []);

  return (
    <SkeletonTheme
      baseColor={theme == "dark" ? "#333344" : "#aeaeae"}
      highlightColor={theme == "dark" ? "#aaa" : "#999"}
      duration={0.7}
    >
      <div className="min-h-screen dark:bg-slate-900 dark:text-slate-200">
        <h1 className="py-5 text-center text-7xl">Your Chats</h1>

        {loadingData ? (
          <div className="flex flex-col gap-2">
            <div className="mx-auto w-[80%]">
              <Skeleton height={50} />
            </div>
            <div className="mx-auto w-[80%]">
              <Skeleton height={50} />
            </div>
            <div className="mx-auto w-[80%]">
              <Skeleton height={50} />
            </div>
          </div>
        ) : (
          <div
            className={
              "flex flex-col items-center gap-2 " + quicksand.className
            }
          >
            {friends.map((elem) => {
              return (
                <Link
                  href={pathName + `/${elem.email}`}
                  key={elem.email}
                  className="group mx-auto flex w-full min-w-fit max-w-[80%] items-center justify-start gap-4 rounded-lg bg-slate-300 px-3 py-4 font-fancy text-xl tracking-wide transition-colors duration-300 hover:bg-slate-700 hover:text-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:hover:text-white"
                >
                  <div className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full bg-slate-300 align-middle dark:border-2 dark:border-slate-400">
                    {elem.image_third_party ? (
                      <Image src={elem.image} alt="" width={70} height={70} />
                    ) : (
                      <Image
                        src={`data:image/png;base64,${elem.image}`}
                        alt=""
                        width={70}
                        height={70}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>{elem.name}</p>
                    <p className="text-sm text-slate-600 group-hover:text-slate-300 dark:text-slate-500">
                      ({elem.email})
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div>
          <h2 className="mb-6 mt-8 text-center text-3xl">Add New Chat</h2>
          <div className="flex items-center justify-center gap-5">
            <input
              type="text"
              ref={inputRef}
              className={
                "min-w-[40%] rounded-md bg-slate-300 px-3 py-2 leading-relaxed placeholder:text-slate-800 dark:bg-slate-200 dark:text-slate-950 dark:placeholder:text-slate-700 dark:hover:bg-slate-300 " +
                quicksand.className
              }
              placeholder="Enter email of your friend"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <button
              onClick={handleSubmit}
              className="block w-fit rounded-lg border-2 bg-emerald-500 px-3 py-2 text-slate-100 transition-colors duration-200 hover:border-emerald-950 hover:bg-emerald-300 hover:text-emerald-950 dark:border-emerald-400 dark:bg-slate-300 dark:text-emerald-800 dark:hover:bg-emerald-400 dark:hover:text-emerald-950"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default FriendsSection;
