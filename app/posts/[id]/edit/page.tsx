"use client";

import { DarkModeSwitch } from "react-toggle-dark-mode";

import { useState, useEffect, useRef } from "react";

import "react-loading-skeleton/dist/skeleton.css";
import { Post } from "@/types/post";

import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { State } from "@/types/user";
import { notFound, useRouter } from "next/navigation";
import { inter } from "@/custom-fonts/fonts";
import LoadingSkeleton from "@/app/components/Posts/LoadingSkeleton";
import MkdnInput from "@/app/components/Posts/Edit/MkdnInput";
import TagsInput from "@/app/components/Posts/Edit/TagsInput";

type Params = {
  params: { id: string };
};

export default function Post({ params }: Params) {
  const { data: session } = useSession();

  const tagRef = useRef<HTMLInputElement>(null);

  const [tags, setTags] = useState<Array<string> | null>(null);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const [heading, setHeading] = useState<string | null>(null);

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
    <LoadingSkeleton />
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
        <MkdnInput
          currentTab={currentTab}
          markdown={markdown}
          setCurrentTab={setCurrentTab}
          setMarkdown={setMarkdown}
        />
        <div className="mx-auto sm:max-w-[80%] md:max-w-[70%]">
          <TagsInput setTags={setTags} tagRef={tagRef} tags={tags} />
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
