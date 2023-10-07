"use client";

import Image from "next/image";

import Discussions from "@/app/components/Posts/Discussions";
import Markdown from "@/app/components/Posts/MarkdownInput";
import ShowMarkdown from "@/app/components/Markdown/ShowMarkdown";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { inter } from "@/custom-fonts/fonts";

import { useState, useEffect, useRef } from "react";
import { Turn as Hamburger } from "hamburger-react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Discussion, Post, Reply } from "@/types/post";
import { notFound } from "next/navigation";
import { v4 as uuid } from "uuid";

import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

type Params = {
  params: { id: string };
};

export default function Post({ params }: Params) {
  const { data: session, status } = useSession();

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
  useEffect(() => {
    async function getData() {
      try {
        const rawPost = await fetch(`/api/posts/getPost/${id}`);
        const post = (await rawPost.json()) as Post;
        if (post == null) {
          return notFound();
        }
        setPostData(post);
      } catch (e) {
        console.log(`Error: ${e}`);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

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

  let currentId = 0;

  const getId = () => {
    currentId += 1;
    return currentId;
  };

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

  // menu for small screens
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return loading ? (
    <SkeletonTheme
      baseColor={theme == "dark" ? "#333344" : "#aeaeae"}
      highlightColor={theme == "dark" ? "#aaa" : "#999"}
      duration={0.7}
    >
      <div className="mx-auto mb-3 w-[95%] pt-5">
        <Skeleton height={100} />
      </div>
      <div className="sm:flex">
        <div className="h-0 w-0 md:h-fit md:w-[30vw] md:pl-3">
          <div className="mb-1 w-[80%]">
            <Skeleton height={40} />
          </div>
          <div className="mb-1 w-[70%]">
            <Skeleton height={40} />
          </div>
          <div className="mb-1 w-[90%]">
            <Skeleton height={40} />
          </div>
          <div className="mb-1 w-[65%]">
            <Skeleton height={40} />
          </div>
        </div>
        <div className="sm:w-[80vw] sm:pr-3 md:w-[50vw]">
          <div className="mb-2 ml-3 mt-5 w-[90%]">
            <Skeleton height={80} />
          </div>
          <div className="ml-3 w-[88%]">
            <Skeleton height={170} />
          </div>
          <div className="mb-2 ml-3 mt-5 w-[70%]">
            <Skeleton height={80} />
          </div>
          <div className="ml-3 w-[88%]">
            <Skeleton height={130} />
          </div>
        </div>
        <div className="w-0 sm:w-[20vw] sm:pr-3">
          <Skeleton height={300} />
        </div>
      </div>
    </SkeletonTheme>
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
        <div
          className="fixed right-2 top-1 z-[200] w-fit cursor-pointer rounded-3xl bg-slate-100 px-3 py-2 dark:bg-slate-400 sm:absolute"
          onClick={(e) => {
            e.stopPropagation();
            handleTheme(theme == "dark" ? "light" : "dark");
          }}
        >
          <div>
            {
              <DarkModeSwitch
                checked={theme == "dark"}
                onChange={() => handleTheme(theme == "dark" ? "light" : "dark")}
                size={25}
              />
            }
          </div>
        </div>
        {/* Title */}
        <div className="relative mb-5 mt-10 dark:z-10 md:mt-0">
          <h1 className="text-center text-5xl">{postData?.title}</h1>
          {!loading && (
            <cite className="mt-3 block text-center text-lg text-slate-400">
              - {postData?.author}
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
          <ul
            className={
              "fixed left-0 top-[50px] z-[100] h-[100vh] w-[50vw] overflow-y-auto rounded-md bg-slate-800 px-3 py-2 text-slate-400 transition-transform duration-200 md:sticky md:left-2 md:top-10 md:mx-2 md:mr-2 md:inline-flex md:h-fit md:max-h-[70vh] md:w-[15vw] md:flex-col md:justify-start md:bg-[rgba(250,250,250,0.65)] md:p-2 md:text-inherit md:text-slate-600 md:dark:bg-[rgba(50,50,50,0.65)]" +
              (openMenu
                ? " translate-x-0"
                : " -translate-x-[80vw] md:translate-x-0")
            }
          >
            {headings.map((h) => {
              return (
                <li
                  key={h}
                  className="my-4 w-fit text-lg underline-offset-2 hover:underline dark:text-slate-300 md:my-2 md:text-sm"
                >
                  <p
                    className={`${getId()} cursor-pointer`}
                    onClick={(e) => {
                      const id = e.currentTarget.classList[0];
                      const heading = document.getElementById(id);
                      if (heading != null) {
                        heading.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    {h}
                  </p>
                </li>
              );
            })}
          </ul>

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

            <div className="my-3 flex flex-[1] flex-wrap items-center justify-center text-center text-slate-200 sm:flex-col sm:justify-start">
              <p className="mb-2 hidden text-lg text-slate-800 dark:text-slate-200 sm:block">
                Tags
              </p>
              {postData?.tags.map((tag) => {
                return (
                  <div
                    key={tag}
                    className="mx-[2px] my-[2px] rounded-xl bg-slate-600 px-[4px] py-[2px] dark:text-slate-300 sm:w-[80%]"
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
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
              cols={50}
              uploadMarkdown={submitData}
              discussionHandler={setTakeNewMarkdownInput}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
