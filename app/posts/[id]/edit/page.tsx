"use client";

import ShowMarkdown from "@/app/components/Markdown/ShowMarkdown";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Textarea from "react-textarea-autosize";

import { useState, useEffect, useRef } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Post } from "@/types/post";

import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { State } from "@/types/user";
import { useRouter } from "next/navigation";

type Params = {
  params: { id: string };
};

export default function Post({ params }: Params) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const tagRef = useRef<HTMLInputElement>(null);

  const [tags, setTags] = useState<Array<string> | null>(null);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const [heading, setHeading] = useState<string | null>(null);

  const [typing, setTyping] = useState<boolean>(false);

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
          console.error("No such post");
          return;
        }
        if (session && session.user && session.user.email) {
          if (post.author != session.user.email) {
            console.error("Unauthorized", post.author, session?.user?.email);
            return;
          }
        } else {
          const rawUser = localStorage.getItem("account");
          if (rawUser) {
            const user = JSON.parse(rawUser) as State;
            if (post.author != user.email) {
              console.error("Unauthorized", post.author, session?.user?.email);
              return;
            }
          } else {
            console.log("No account yet!");
            return;
          }
        }
        setPostData(post);
      } catch (e) {
        console.log(`Error: ${e}`);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [session, id]);

  useEffect(() => {
    if (postData) {
      setMarkdown(postData.content);
      setHeading(postData.title);
      setCoverImg(postData.coverImgFull);
      setTags(postData.tags);
    }
  }, [postData]);

  function addTag() {
    if (!tagRef.current) {
      return;
    }
    const value = tagRef.current.value;
    if (value.trim() == "") {
      return;
    }
    if (tags == null) {
      setTags([value]);
    } else {
      if (tags.map((tag) => tag.toLowerCase()).includes(value.toLowerCase())) {
        return;
      }
      setTags([...tags, value.toLowerCase()]);
      tagRef.current.value = "";
    }
  }

  function removeTag(tag: string) {
    if (!tags) {
      return;
    }
    setTags(
      tags?.filter((currentTag) => {
        return tag != currentTag;
      }),
    );
  }

  const [currentTab, setCurrentTab] = useState<1 | 2>(1);

  async function postNow(state: {
    id: string;
    title: string;
    author: string;
    coverImgFull: string;
    content: string;
    tags: Array<string>;
  }) {
    try {
      await fetch("/api/posts/updatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

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
            onChange={(e) => setHeading(e.target.value)}
            defaultValue={heading != null ? heading : ""}
          />
        </div>
        <div className="my-3 flex items-center justify-start gap-2">
          <h2 className="text-lg">Cover Image: </h2>
          <input
            type="url"
            className="mx-2 block rounded-md border-2 border-slate-200 px-3 py-1 placeholder:text-slate-400 invalid:border-red-400 invalid:bg-red-100"
            placeholder="Enter unsplash image url"
            onChange={(e) => setCoverImg(e.target.value)}
            defaultValue={coverImg ? coverImg : ""}
          />
        </div>
        <div>
          <div className="py-3">
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <div className="flex w-[80%] items-center justify-center gap-2">
                <button
                  className={
                    "block w-fit rounded-md px-4 py-2 transition-colors duration-200 " +
                    (currentTab == 1
                      ? "bg-slate-800 text-slate-200"
                      : "bg-slate-200 text-slate-700")
                  }
                  onClick={() => setCurrentTab(1)}
                >
                  Input
                </button>
                <button
                  className={
                    "block w-fit rounded-md px-4 py-2 transition-colors duration-200 " +
                    (currentTab == 2
                      ? "bg-slate-800 text-slate-200"
                      : "bg-slate-200 text-slate-700")
                  }
                  onClick={() => setCurrentTab(2)}
                >
                  Preview
                </button>
              </div>
              <div className="min-w-[70vw]">
                <div className={currentTab == 2 ? "hidden" : "block"}>
                  <Textarea
                    name="markdown"
                    cols={20}
                    placeholder="Enter the content here"
                    className="mx-auto mb-3 block max-h-[50vh] w-fit max-w-full rounded-md border border-slate-300 bg-[rgba(250,250,250,0.8)] px-3 py-2 dark:border-slate-600 dark:bg-slate-700 sm:w-[70%]"
                    onChange={(e) => setMarkdown(e.target.value)}
                    defaultValue={markdown ? markdown : ""}
                  ></Textarea>
                </div>
                <div className={currentTab == 1 ? "hidden" : "block"}>
                  <div className="markdown-wrapper mx-5 max-h-[40vh] min-h-[30vh] w-full overflow-y-auto rounded-lg border border-slate-300 bg-slate-300 px-3 py-2 dark:bg-slate-800">
                    <ShowMarkdown data={markdown ? markdown : "preview"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="my-5 text-xl">Tags</h2>
          <div className="flex flex-wrap items-center gap-2 space-y-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTag();
              }}
              className="my-2 flex cursor-pointer items-center justify-start gap-2 rounded-3xl border border-black/30 px-2 py-1"
            >
              <input
                type="text"
                placeholder="+New Tag"
                ref={tagRef}
                className="block max-w-[80px] hover:placeholder:text-black/40 focus-visible:outline-none"
                onChange={(e) => {
                  e.currentTarget.value.trim() == ""
                    ? setTyping(false)
                    : setTyping(true);
                }}
              />

              <button
                type="submit"
                className={typing ? "opacity-100" : "opacity-0"}
              >
                +
              </button>
            </form>
            {tags &&
              tags.map((tag) => {
                return (
                  <div
                    key={tag}
                    className="group w-fit cursor-pointer rounded-3xl bg-slate-300 px-3 py-1 text-slate-800 hover:bg-slate-500 hover:text-white"
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <button className="ml-2 inline-block h-fit w-fit rounded-full bg-rose-300 px-2 text-rose-600 group-hover:bg-rose-600 group-hover:text-rose-100">
                      x
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="max-auto my-5 flex w-[90%] items-center justify-center gap-3">
          <button
            className="block w-fit rounded-md bg-rose-400 px-4 py-2 text-rose-100 transition-all duration-300 hover:bg-rose-200 hover:text-rose-950"
            onClick={() => {
              let email;
              if (session && session.user && session.user.email) {
                email = session.user.email;
              } else {
                const rawAccount = localStorage.getItem("account");
                if (rawAccount) {
                  const account = JSON.parse(rawAccount) as State;
                  email = account.email;
                }
              }
              const state = {
                id: id,
                title: heading,
                author: email,
                coverImgFull: coverImg,
                content: markdown,
                tags: tags,
              };
              console.log(state);
            }}
          >
            Save as Draft
          </button>
          <button
            className="block w-fit rounded-md bg-rose-400 px-4 py-2 text-rose-100 transition-all duration-300 hover:bg-rose-200 hover:text-rose-950"
            onClick={() => {
              let email;
              if (session && session.user && session.user.email) {
                email = session.user.email;
              } else {
                const rawAccount = localStorage.getItem("account");
                if (rawAccount) {
                  const account = JSON.parse(rawAccount) as State;
                  email = account.email;
                }
              }
              if (
                heading == null ||
                coverImg == null ||
                markdown == null ||
                tags == null ||
                email == undefined
              ) {
                return;
              }
              const state = {
                id: id,
                title: heading,
                author: email,
                coverImgFull: coverImg,
                content: markdown,
                tags: tags,
              };
              toast.promise(postNow(state), {
                loading: "Uploading your post",
                error: "Could not publish, please try again",
                success: "Post published successfully",
              });
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
