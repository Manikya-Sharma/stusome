"use client";
import posts from "@/public/posts.json";
import Discussions from "@/app/components/Posts/Discussions";
import Markdown from "@/app/components/Posts/MarkdownInput";
import ShowMarkdown from "@/app/components/Markdown/ShowMarkdown";

import { useState, useEffect, useRef } from "react";

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
        inputValueStatus.reply,
      );
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
    <div className="scroll-smooth p-4 font-fancy dark:bg-slate-900 dark:text-slate-100">
      <IconContext.Provider value={{ className: "shared-class", size: "23" }}>
        <nav className="fixed left-0 top-0 z-[100] flex h-fit w-[100vw] items-center justify-start overflow-hidden bg-[rgba(50,50,50,0.1)] pb-3 pt-1 backdrop-blur-md md:hidden">
          {openMenu ? (
            <button onClick={() => setOpenMenu(false)} className="py-1 pl-3">
              <LuPanelLeftClose />
            </button>
          ) : (
            <button onClick={() => setOpenMenu(true)} className="py-1 pl-3">
              <LuMenu />
            </button>
          )}
        </nav>
      </IconContext.Provider>
      <div className="mb-5 mt-7 md:mt-0">
        <h1 className="text-center text-5xl">{state.title}</h1>

        {!loading && (
          <cite className="mt-3 block text-center text-lg text-slate-400">
            - {state.author}
          </cite>
        )}
      </div>
      <div className="relative">
        <ul
          className={
            "fixed left-0 top-10 z-[100] h-[100vh] w-[50vw] overflow-y-auto rounded-md bg-slate-800 px-3 py-2 text-slate-200 transition-transform duration-200 md:sticky md:left-2 md:top-10 md:mr-2 md:inline-flex md:h-fit md:max-h-[70vh] md:w-[15vw] md:flex-col md:justify-start md:bg-transparent md:p-0 md:pr-2 md:text-inherit" +
            (openMenu
              ? " translate-x-0"
              : " -translate-x-[80vw] md:translate-x-0")
          }
        >
          {headings.map((h) => {
            return (
              <li
                key={h}
                className="my-4 w-fit text-lg text-slate-400 underline-offset-2 hover:underline dark:text-slate-300 md:my-2 md:text-sm"
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
            <div className="markdown-wrapper">
              <ShowMarkdown data={state.content} />
            </div>
          </div>

          <div className="my-3 flex flex-[1] flex-wrap items-center justify-center text-center text-slate-200 sm:flex-col sm:justify-start">
            <p className="mb-2 hidden text-lg text-slate-800 dark:text-slate-200 sm:block">
              Tags
            </p>
            {state.tags.map((tag) => {
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

      <>
        <div className="mx-auto my-5 h-[2px] w-[90%] bg-slate-600"></div>
        <h2 className="mb-3 mt-6 text-4xl sm:text-center">Discussions:-</h2>

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
    </div>
  );
}
