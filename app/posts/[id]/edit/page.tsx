"use client";

import Image from "next/image";

import Markdown from "@/app/components/Posts/MarkdownInput";
import ShowMarkdown from "@/app/components/Markdown/ShowMarkdown";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Textarea from "react-textarea-autosize";

import { inter } from "@/custom-fonts/fonts";

import { useState, useEffect, useRef } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Post } from "@/types/post";
import { notFound } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

type Params = {
  params: { id: string };
};

export default function Post({ params }: Params) {
  const { data: session, status } = useSession();

  const mk_ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string | undefined>("");

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
  useEffect(() => {
    async function getData() {
      try {
        const rawPost = await fetch(`/api/posts/getPost/${id}`);
        const post = (await rawPost.json()) as Post;
        if (post == null) {
          return notFound();
        }
        if (post.author != session?.user?.email) {
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
  }, [id, session?.user]);

  useEffect(() => {
    if (postData && mk_ref.current) {
      console.log(postData.content);
      mk_ref.current.value = postData.content;
    }
  }, [postData]);

  const [currentTab, setCurrentTab] = useState<1 | 2>(1);

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
        <div className="my-3">
          <h1 className="text-center text-3xl">New Post</h1>
        </div>
        <div className="my-3 flex items-center justify-start gap-2">
          <h2 className="text-lg">Heading: </h2>
          <input
            type="text"
            className="mx-2 block rounded-md border-2 border-slate-200 px-3 py-1 placeholder:text-red-400 invalid:border-red-400 invalid:bg-red-100"
            required={true}
            placeholder="Your heading"
          />
        </div>
        <div className="my-3 flex items-center justify-start gap-2">
          <h2 className="text-lg">Cover Image: </h2>
          <input
            type="url"
            className="mx-2 block rounded-md border-2 border-slate-200 px-3 py-1 placeholder:text-slate-400 invalid:border-red-400 invalid:bg-red-100"
            placeholder="Enter unsplash image url"
          />
        </div>
        <div>
          <div className="bg-slate-300 py-3">
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <div className="flex w-[80%] items-center justify-center gap-2">
                <button
                  className={
                    "block w-fit rounded-md px-4 py-2 transition-colors duration-200 " +
                    (currentTab == 1
                      ? "bg-slate-200 text-slate-700"
                      : "bg-slate-800 text-slate-200")
                  }
                  onClick={() => setCurrentTab(1)}
                >
                  Input
                </button>
                <button
                  className={
                    "block w-fit rounded-md px-4 py-2 transition-colors duration-200 " +
                    (currentTab == 2
                      ? "bg-slate-200 text-slate-700"
                      : "bg-slate-800 text-slate-200")
                  }
                  onClick={() => setCurrentTab(2)}
                >
                  Preview
                </button>
              </div>
              <div className="min-h-[50vh] min-w-[70vw]">
                <div className={currentTab == 2 ? "hidden" : "block"}>
                  <Textarea
                    name="markdown"
                    cols={20}
                    placeholder="Enter the content here"
                    className="mx-auto mb-3 block max-h-[50vh] w-fit max-w-full rounded-md border border-slate-300 bg-[rgba(250,250,250,0.8)] px-3 py-2 dark:border-slate-600 dark:bg-slate-700 sm:w-[70%]"
                    ref={mk_ref}
                    onChange={() => setText(mk_ref.current?.value)}
                  ></Textarea>
                </div>
                <div className={currentTab == 1 ? "hidden" : "block"}>
                  <p className="markdown-wrapper mx-5 max-h-[40vh] min-h-[30vh] w-full overflow-y-auto rounded-lg border border-slate-300 bg-slate-300 px-3 py-2 dark:bg-slate-800">
                    <ShowMarkdown data={text != undefined ? text : "preview"} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
