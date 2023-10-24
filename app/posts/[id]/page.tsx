"use client";

import Image from "next/image";

import Discussions from "@/app/components/Posts/Discussions";
import Markdown from "@/app/components/Posts/MarkdownInput";
import ShowMarkdown from "@/app/components/Markdown/ShowMarkdown";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { inter } from "@/custom-fonts/fonts";

import { useState, useEffect } from "react";
import { Turn as Hamburger } from "hamburger-react";

import "react-loading-skeleton/dist/skeleton.css";
import { Discussion, Post, Reply } from "@/types/post";
import { notFound } from "next/navigation";
import { v4 as uuid } from "uuid";

import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEdit, MdOutlineChat } from "react-icons/md";
import { State } from "@/types/user";
import { LuLogIn } from "react-icons/lu";
import Headings from "@/app/components/Posts/Headings";
import Tags from "@/app/components/Posts/Tags";
import LoadingSkeleton from "@/app/components/Posts/LoadingSkeleton";

type Params = {
  params: { id: string };
};

export default function Post({ params }: Params) {
  const router = useRouter();
  const { data: session } = useSession();

  // theme
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);
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
  // fetching data
  const id = params.id;
  const [postData, setPostData] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [headings, setHeadings] = useState<string[]>([]);
  const [author, setAuthor] = useState<State | null>(null);
  useEffect(() => {
    async function getData() {
      try {
        // get post data
        const rawPost = await fetch(`/api/posts/getPost/${id}`);
        const post = (await rawPost.json()) as Post;
        if (post == null) {
          return notFound();
        }
        if (post.published == false) {
          router.replace(`/posts/${id}/edit`);
        }
        setPostData(post);

        // get author info
        const rawAuthorInfo = await fetch(
          `/api/getAccountByEmail/${post.author}`,
        );
        const authorInfo = (await rawAuthorInfo.json()) as State;
        setAuthor(authorInfo);
      } catch (e) {
        console.log(`Error: ${e}`);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id, router]);

  // finding headings from data
  useEffect(() => {
    const arr = postData?.content
      .replaceAll(/```(.|\n)+```/gm, "")
      .split("\n")
      .filter((line) => line.startsWith("# "))
      .map((line) => line.replace(/#{1}/, "").trim());
    if (arr != null) {
      setHeadings(Array.from(arr));
    }
  }, [postData]);

  // post new discussion
  const [takeNewMarkdownInput, setTakeNewMarkdownInput] = useState(false);
  const [inputValueStatus, setInputValueStatus] = useState<
    string | { discussion: string; reply: string }
  >("");

  function handleInput(type: "discussion" | "reply", replyId?: string) {
    if (type == "discussion") {
      setTakeNewMarkdownInput(true);
      setInputValueStatus(id);
    } else if (type == "reply" && replyId != null) {
      setTakeNewMarkdownInput(true);
      setInputValueStatus({ discussion: id, reply: replyId });
    }
  }

  function submitData(inputValue: string) {
    if (!session || !session.user || !session.user.email) {
      return;
    }
    // new discussion
    async function uploadDiscussionData(newDiscussion: Discussion) {
      await fetch(`/api/posts/newDiscussion/${inputValueStatus}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiscussion),
      });
    }

    async function uploadReplyData(newReply: Reply) {
      if (typeof inputValueStatus == "string") {
        return;
      }
      await fetch(`/api/posts/newReply/${inputValueStatus.reply}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReply),
      });
    }

    if (typeof inputValueStatus == "string") {
      const newId = uuid();
      const newDiscussion: Discussion = {
        author: session.user.email,
        content: inputValue,
        id: newId,
        replies: [],
      };
      toast.promise(uploadDiscussionData(newDiscussion), {
        loading: "Uploading the discussion",
        success: "Posted",
        error: "Could not post your discussion",
      });
    }
    // new reply
    else {
      const newId = uuid();
      const newReply: Reply = {
        author: session.user.email,
        content: inputValue,
        id: newId,
      };
      toast.promise(uploadReplyData(newReply), {
        loading: "Uploading the reply",
        success: "Posted",
        error: "Could not post your reply",
      });
    }
  }

  function validUser(email: string | null | undefined): boolean {
    if (!email) {
      return false;
    }
    if (postData?.author == email) {
      return true;
    } else {
      return false;
    }
  }

  async function handleChat() {
    if (!session || !session.user || !session.user.email) {
      return;
    }
    const email = session.user.email;
    // get friends
    const rawExistingFriends = await fetch("/api/getFriends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    const rawExistingFriendIds = (await rawExistingFriends.json()) as string[];
    let existingFriendEmails = rawExistingFriendIds
      .filter((elem) => elem.includes(email))
      .map((emailBelonging) =>
        emailBelonging
          .split(":")
          .filter((email) => email != email && email != "friend"),
      );
    const existingFriends: State[] = [];

    const promises = existingFriendEmails.map((email) => {
      return fetch(`/api/getAccountByEmail/${email[0]}`)
        .then((rawData) => rawData.json())
        .then((data) => {
          existingFriends.push(data);
        })
        .catch((error) => console.log(`Error fetching friends data: ${error}`));
    });

    let friends: Array<State> = [];
    Promise.all(promises)
      .then(() => {
        friends = existingFriends.filter((elem) => elem != null);
      })
      .catch((error) => console.log(`Error occurred: ${error}`));

    const friendsEmails = friends.map((friend) => friend.email);
    if (author == null) {
      return;
    }
    if (friendsEmails.includes(author.email)) {
      router.push(`/chat/${author.email}`);
    } else {
      // we need to create a new friend
      const rawFriendAccount = await fetch(
        `/api/getAccountByEmail/${author.email}`,
      );
      const friendAccount = (await rawFriendAccount.json()) as State;
      await fetch("/api/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          friendEmail: friendAccount.email,
        }),
      });
      router.push(`/chat/${author.email}`);
    }
  }
  // menu for small screens
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <div className="dark:bg-slate-900 dark:text-slate-100">
      <Toaster position="top-center" />
      <div className="scroll-smooth p-4 font-fancy transition-colors duration-200">
        <nav className="fixed left-0 top-0 z-[100] flex h-fit max-h-[50px] w-[100vw] items-center justify-start overflow-hidden bg-[rgba(50,50,50,0.1)] backdrop-blur-md md:hidden">
          <div className="py-1 pl-3">
            <Hamburger
              toggled={openMenu}
              onToggle={() => setOpenMenu(!openMenu)}
              size={20}
            />
          </div>
        </nav>

        {session && session.user && session.user.email ? (
          validUser(session.user.email) ? (
            <div className="fixed right-20 top-1 z-[150] w-fit cursor-pointer rounded-3xl bg-slate-100 px-3 py-2 transition-all duration-200 hover:bg-slate-400 hover:text-slate-100 dark:bg-slate-400 dark:hover:bg-slate-100 dark:hover:text-slate-800 sm:absolute">
              <Link
                href={`/posts/${postData?.id}/edit`}
                className="flex w-fit items-center justify-center gap-2"
              >
                <MdEdit />
                <p>Edit</p>
              </Link>
            </div>
          ) : (
            <div className="fixed right-20 top-1 z-[150] w-fit cursor-pointer rounded-3xl bg-slate-100 px-3 py-2 transition-all duration-200 hover:bg-slate-400 hover:text-slate-100 dark:bg-slate-400 dark:hover:bg-slate-100 dark:hover:text-slate-800 sm:absolute">
              <button
                onClick={() => {
                  toast.promise(handleChat(), {
                    loading: "Please wait while we redirect",
                    error: "Could not start chat, please try again later",
                    success: "redirecting...",
                  });
                }}
                className="flex w-fit items-center justify-center gap-2"
              >
                <MdOutlineChat />
                <p>Chat</p>
              </button>
            </div>
          )
        ) : (
          <div className="fixed right-20 top-1 z-[150] w-fit cursor-pointer rounded-3xl bg-slate-100 px-3 py-2 transition-all duration-200 hover:bg-slate-400 dark:bg-slate-400 dark:hover:bg-slate-100 sm:absolute">
            <Link href="/login">
              <LuLogIn />
            </Link>
          </div>
        )}

        <div
          className="fixed right-2 top-1 z-[200] w-fit cursor-pointer rounded-3xl bg-slate-100 px-3 py-2 dark:bg-slate-400 sm:absolute"
          onClick={(e) => {
            e.stopPropagation();
            handleTheme(theme == "dark" ? "light" : "dark");
          }}
        >
          <div>
            <DarkModeSwitch
              checked={theme == "dark"}
              onChange={() => handleTheme(theme == "dark" ? "light" : "dark")}
              size={25}
            />
          </div>
        </div>
        {/* Title */}
        <div className="relative mb-5 mt-10 dark:z-10 md:mt-0">
          <h1 className="text-center text-5xl">{postData?.title}</h1>
          {!loading && (
            <cite className="mt-3 block text-center text-lg text-slate-400">
              - {author && author.name}
            </cite>
          )}
        </div>
        {/* Background Image */}
        {postData?.coverImgFull && (
          <div className="absolute left-0 top-0 -z-[100] h-[55vh] w-[100vw] dark:z-0">
            <div className="relative h-full w-full blur-sm filter">
              <Image src={postData.coverImgFull} alt="" fill />
              <div className="fixed z-0 h-full w-full bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,0,0,0.7)]"></div>
            </div>
          </div>
        )}
        <div className="relative">
          {/* Headings */}
          <Headings headings={headings} openMenu={openMenu} />

          <div className="sm:inline-flex md:max-w-[75vw]">
            <div className="flex-[3]">
              <div
                className={
                  "markdown-wrapper transition-colors duration-200 " +
                  inter.className
                }
              >
                {postData && <ShowMarkdown data={postData.content} />}
              </div>
            </div>
            <Tags tags={postData?.tags} />
          </div>
        </div>
        <div className={inter.className}>
          <div className="mx-auto my-5 h-[2px] w-[90%] bg-slate-600"></div>
          <h2 className="mb-3 mt-6 text-4xl sm:text-center">Discussions:-</h2>

          {postData && (
            <Discussions
              discussionIds={postData.discussions}
              discussionHandler={handleInput}
            />
          )}

          {takeNewMarkdownInput ? (
            <Markdown
              rows={10}
              cols={30}
              uploadMarkdown={submitData}
              discussionHandler={setTakeNewMarkdownInput}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
