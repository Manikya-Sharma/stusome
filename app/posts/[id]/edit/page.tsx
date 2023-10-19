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
import { notFound, useRouter } from "next/navigation";
import { inter } from "@/custom-fonts/fonts";

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
  const [errorState, setErrorState] = useState<boolean>(false);
  useEffect(() => {
    async function getData() {
      try {
        const rawPost = await fetch(`/api/posts/getPost/${id}`);
        const post = (await rawPost.json()) as Post;
        if (post == null) {
          return "notfound";
        }
        if (session && session.user && session.user.email) {
          if (post.author != session.user.email) {
            return "unauthorized";
          }
        } else {
          const rawUser = localStorage.getItem("account");
          if (rawUser) {
            const user = JSON.parse(rawUser) as State;
            if (post.author != user.email) {
              return "unauthorized";
            }
          } else {
            return "unauthorized";
          }
        }
        setPostData(post);
      } catch (e) {
        console.log(`Error: ${e}`);
      } finally {
        setLoading(false);
      }
    }
    getData().then((result) => {
      if (result == "notfound" || result == "unauthorized") {
        setErrorState(true);
      }
    });
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
    published: boolean;
  }) {
    try {
      await fetch("/api/posts/updatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      if (postData != null) {
        setPostData({ ...postData, published: state.published });
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  if (errorState == true) {
    return notFound();
  }

  function handleClick(type: "publish" | "draft") {
    if (heading == null || heading.trim() == "") {
      toast.error("Heading is missing");
      return;
    }
    if (tags == null || tags.length == 0) {
      toast.error("No tags provided");
      return;
    }

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
      published: type == "publish",
    };
    if (type == "publish") {
      toast.promise(postNow(state), {
        loading: "Uploading your post",
        error: "Could not publish, please try again",
        success: "Post published successfully",
      });
    } else {
      toast.promise(postNow(state), {
        loading: "Saving your post",
        error: "Could not save, please try again",
        success: "Post saved successfully",
      });
    }
  }

  return loading ? (
    <div className="h-screen bg-slate-200 dark:bg-slate-800">
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
    </div>
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
          <h1 className="text-center text-3xl sm:mb-10 sm:text-5xl md:text-7xl">
            Edit your post
          </h1>
        </div>
        <div className="mx-auto my-3 flex w-fit items-center justify-start gap-2">
          <h2 className="text-lg">Heading: </h2>
          <input
            type="text"
            className="mx-2 block min-w-fit rounded-md border-2 border-slate-200 px-3 py-1 placeholder:text-red-400 invalid:border-red-400 invalid:bg-red-100 dark:text-slate-700"
            required={true}
            placeholder="Your heading"
            onChange={(e) => setHeading(e.target.value)}
            defaultValue={heading != null ? heading : ""}
          />
        </div>
        <div className="mx-auto my-3 flex w-fit items-center justify-start gap-2">
          <h2 className="text-lg">Cover Image: </h2>
          <input
            type="url"
            className="mx-2 block rounded-md border-2 border-slate-200 px-3 py-1 placeholder:text-slate-400 invalid:border-red-400 invalid:bg-red-100 dark:text-slate-800 invalid:dark:text-rose-800"
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
                      ? "bg-slate-800 text-slate-200 dark:bg-slate-200 dark:text-slate-700"
                      : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200")
                  }
                  onClick={() => setCurrentTab(1)}
                >
                  Input
                </button>
                <button
                  className={
                    "block w-fit rounded-md px-4 py-2 transition-colors duration-200 " +
                    (currentTab == 2
                      ? "bg-slate-800 text-slate-200 dark:bg-slate-200 dark:text-slate-700"
                      : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200")
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
                  <div
                    className={
                      "markdown-wrapper mx-5 max-h-[40vh] min-h-[30vh] w-full max-w-fit overflow-y-auto rounded-lg border border-slate-300 bg-slate-300 px-3 py-2 dark:bg-slate-800 " +
                      inter.className
                    }
                  >
                    <ShowMarkdown data={markdown ? markdown : "preview"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto sm:max-w-[80%] md:max-w-[70%]">
          <h2 className="my-5 text-xl">Tags</h2>
          <div className="flex flex-wrap items-center gap-2 space-y-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTag();
              }}
              className="group my-2 flex cursor-pointer items-center justify-start gap-2 rounded-3xl border border-slate-300 bg-slate-200 px-2 py-1 text-slate-800 dark:border-black/30 dark:bg-slate-700 dark:text-slate-100"
              onClick={() => tagRef.current?.focus()}
            >
              <input
                type="text"
                placeholder="+New Tag"
                ref={tagRef}
                className="block h-fit max-w-[80px] cursor-pointer rounded-lg bg-inherit focus-visible:outline-none group-hover:placeholder:text-black/40 dark:group-hover:placeholder:text-slate-50"
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
                    className={
                      "group w-fit cursor-pointer rounded-3xl bg-slate-300 px-3 py-1 text-slate-800 transition-all duration-300 hover:bg-slate-500 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 " +
                      inter.className
                    }
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <button className="ml-2 inline-block rounded-full border-[1px] border-red-400 bg-rose-200 px-2 text-red-800 transition-opacity duration-300 dark:text-rose-400 md:opacity-0 md:group-hover:opacity-100">
                      x
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className={
            "max-auto mx-auto my-5 flex w-[90%] items-center justify-center gap-3 " +
            inter.className
          }
        >
          <button
            className="block w-fit rounded-md bg-rose-400 px-4 py-2 text-rose-100 transition-all duration-300 hover:bg-rose-200 hover:text-rose-950 dark:bg-rose-500 dark:text-slate-50 dark:hover:bg-rose-100 dark:hover:text-rose-900"
            onClick={() => {
              handleClick("draft");
            }}
          >
            {postData?.published == true
              ? "Convert to Private"
              : "Save as Draft"}
          </button>
          <button
            className="block w-fit rounded-md bg-rose-400 px-4 py-2 text-rose-100 transition-all duration-300 hover:bg-rose-200 hover:text-rose-950 dark:bg-rose-500 dark:text-slate-50 dark:hover:bg-rose-100 dark:hover:text-rose-900"
            onClick={() => {
              handleClick("publish");
            }}
          >
            {postData?.published == true ? "Update" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
