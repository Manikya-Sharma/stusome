"use client";
import posts from "@/public/posts.json";
import Discussions from "@/app/components/Posts/Discussions";
import Markdown from "@/app/components/Posts/MarkdownInput";
import ShowMarkdown from "@/app/components/Markdown/ShowMarkdown";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { LuMenu, LuPanelLeftClose } from "react-icons/lu";
import { IconContext } from "react-icons";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Params = {
  params: { id: string };
};

export default function Post({ params }: Params) {
  // fetching data
  const id = parseInt(params.id);
  const [state, setState] = useState({
    id: id,
    title: "",
    author: "",
    content: "",
    discussions: [
      {
        id: 0,
        content: "",
        author: "",
        replies: [{ id: 0, content: "", author: "" }],
      },
    ],
    tags: [""],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [headings, setHeadings] = useState<string[]>([]);
  useEffect(() => {
    for (const post of posts) {
      if (post.id == id) {
        setState(post);
        setLoading(false);
      }
    }
  }, [id]);

  // finding headings from data
  useEffect(() => {
    const arr = state.content
      .replaceAll(/```(.|\n)+```/gm, "")
      .split("\n")
      .filter((line) => line.startsWith("# "))
      .map((line) => line.replace(/#{1}/, "").trim());
    if (arr != null) {
      setHeadings(Array.from(arr));
    }
  }, [state]);

  const [theme, setTheme] = useState<"dark" | "light">("light");
  // theme
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    }
  }, []);

  // post new discussion
  const [takeNewMarkdownInput, setTakeNewMarkdownInput] = useState(false);
  const [inputValueStatus, setInputValueStatus] = useState<
    number | { discussion: number; reply: number }
  >(0);

  let currentId = 0;
  const getId = () => {
    currentId += 1;
    return currentId;
  };

  function handleInput(type: "discussion" | "reply", replyId?: number) {
    if (type == "discussion") {
      setTakeNewMarkdownInput(true);
      setInputValueStatus(id);
    } else if (type == "reply" && replyId != null) {
      setTakeNewMarkdownInput(true);
      setInputValueStatus({ discussion: id, reply: replyId });
    }
  }

  function submitData(inputValue: string) {
    // new discussion
    if (typeof inputValueStatus == "number") {
      console.log(inputValue, inputValueStatus);
    }
    // new reply
    else {
      console.log(
        inputValue,
        inputValueStatus.discussion,
        inputValueStatus.reply
      );
    }
  }

  // menu for small screens
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <SkeletonTheme
      baseColor={theme == "dark" ? "#333344" : "#aeaeae"}
      highlightColor={theme == "dark" ? "#aaa" : "#999"}
      duration={0.7}
    >
      <div className="p-4 font-fancy dark:bg-slate-900 dark:text-slate-100 scroll-smooth">
        <IconContext.Provider value={{ className: "shared-class", size: "23" }}>
          <nav className="md:hidden pt-1 pb-3 fixed z-[100] top-0 left-0 w-[100vw] overflow-hidden bg-[rgba(50,50,50,0.1)] backdrop-blur-md flex items-center justify-start h-fit">
            {openMenu ? (
              <button onClick={() => setOpenMenu(false)} className="pl-3 py-1">
                <LuPanelLeftClose />
              </button>
            ) : (
              <button onClick={() => setOpenMenu(true)} className="pl-3 py-1">
                <LuMenu />
              </button>
            )}
          </nav>
        </IconContext.Provider>
        <div className="mb-5 mt-7 md:mt-0">
          {loading ? (
            <Skeleton height={80} />
          ) : (
            <h1 className="text-5xl text-center">{state.title}</h1>
          )}
          {!loading && (
            <cite className="block text-lg text-slate-400 text-center mt-3">
              - {state.author}
            </cite>
          )}
        </div>
        <div className="relative">
          {loading ? (
            <div className="w-[10vw] mr-2 hidden sm:inline-block">
              <Skeleton height={300} />
            </div>
          ) : (
            <ul
              className={
                "md:sticky md:top-10 md:mr-2 md:left-2 md:inline-flex md:flex-col md:justify-start md:w-[15vw] w-[50vw] md:p-0 fixed z-[100] px-3 py-2 rounded-md left-0 top-10 transition-transform duration-200 bg-slate-800 text-slate-200 md:bg-transparent md:text-inherit h-[100vh] md:h-fit md:pr-2 md:max-h-[70vh] overflow-y-auto" +
                (openMenu
                  ? " translate-x-0"
                  : " -translate-x-[80vw] md:translate-x-0")
              }
            >
              {headings.map((h) => {
                return (
                  <li
                    key={h}
                    className="w-fit md:text-sm text-slate-400 dark:text-slate-300 md:my-2 hover:underline underline-offset-2 text-lg my-4"
                  >
                    <Link href={`#${getId()}`}>{h}</Link>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="sm:inline-flex md:max-w-[75vw]">
            <div className="flex-[3]">
              {loading ? (
                <div className="mr-3">
                  <Skeleton height={400} width={400} />
                </div>
              ) : (
                <div className="markdown-wrapper">
                  <ShowMarkdown data={state.content} />
                </div>
              )}
            </div>

            <div className="flex-[1] sm:flex-col sm:justify-start my-3 flex flex-wrap text-slate-200 items-center text-center justify-center">
              {loading ? (
                <div className="hidden sm:block ml-[10vw]">
                  <Skeleton height={150} width={100} />
                </div>
              ) : (
                <>
                  <p className="hidden sm:block text-lg text-slate-800 dark:text-slate-200 mb-2">
                    Tags
                  </p>
                  {state.tags.map((tag) => {
                    return (
                      <div
                        key={tag}
                        className="bg-slate-600 px-[4px] py-[2px] rounded-xl mx-[2px] my-[2px] sm:w-[80%] dark:text-slate-300"
                      >
                        {tag}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <Skeleton height={200} />
        ) : (
          <>
            <div className="w-[90%] mx-auto h-[2px] bg-slate-600 my-5"></div>
            <h2 className="text-4xl mt-6 mb-3 sm:text-center">Discussions:-</h2>

            <Discussions
              discussion={state.discussions}
              discussionHandler={handleInput}
            />

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
          </>
        )}
      </div>
    </SkeletonTheme>
  );
}
