"use client";

import { useState, useRef } from "react";

import Textarea from "react-textarea-autosize";

import TagsInput from "../components/Posts/Edit/TagsInput";
import Tags from "../components/Posts/Tags";
import ShowMarkdown from "../components/Markdown/ShowMarkdown";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

export default function NewDoubt() {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);
  const tagRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function handleSubmit() {
    if (title.trim() == "") {
      toast.error("Title needed");
      return;
    } else if (desc.trim() == "") {
      toast.error("Doubt description needed");
      return;
    } else if (tags.length == 0) {
      toast.error("At-least one tag is needed");
      return;
    }
    if (!session || !session.user || !session.user.email) {
      return;
    }

    const newId = uuid();
    const doubt: Doubt = {
      answers: [],
      author: session.user.email,
      content: desc,
      id: newId,
      tags: tags,
      title: title,
    };

    await fetch(`/api/doubts/newDoubt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doubt),
    });

    router.replace(`/doubts/${newId}`);
  }

  return (
    <main className="min-h-screen px-8 dark:bg-slate-800 dark:text-slate-200">
      <Toaster position="top-center" />
      <h1 className="mb-10 pt-5 text-center text-3xl">New Doubt</h1>

      {/* title */}
      <div className="mb-5 flex items-center justify-start gap-5">
        <label htmlFor="title" className="text-2xl">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="border-1 block rounded-lg border border-blue-300 px-1 py-2 dark:text-slate-800"
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
      </div>

      {/* description */}
      <div className="mb-5 flex items-center justify-start gap-5">
        <label htmlFor="desc" className="text-2xl">
          Description
        </label>
        <Textarea
          name="desc"
          id="desc"
          className="border-1 min-h-[50px] rounded-lg border border-blue-300 p-2 dark:text-slate-800"
          onChange={(e) => setDesc(e.currentTarget.value)}
        ></Textarea>
      </div>

      <div className="mx-3 my-5 max-w-full rounded-lg bg-slate-300 p-3">
        <h2 className="mb-4 text-3xl">Preview</h2>
        <div className="markdown-wrapper">
          <ShowMarkdown data={desc} />
        </div>
      </div>

      {/* tags */}
      <TagsInput setTags={setTags} tagRef={tagRef} tags={tags} />
      <Tags />

      <div>
        <button
          className="mx-auto block w-fit rounded-xl bg-emerald-400 px-4 py-2 text-2xl text-emerald-50 transition hover:bg-emerald-200 hover:text-emerald-800 md:text-5xl"
          onClick={(e) => {
            toast.promise(handleSubmit(), {
              error: "Could not post your doubt, please try again later",
              loading: "Posting your doubt",
              success:
                "Doubt posted successfully, please wait while we redirect",
            });
          }}
        >
          Post
        </button>
      </div>
    </main>
  );
}
