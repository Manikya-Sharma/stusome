"use client";
import posts from "@/public/posts.json";
import Discussions from "@/app/components/Posts/Discussions";
import Markdown from "@/app/components/Posts/MarkdownInput";
import ShowMarkdown from "@/app/components/Markdown/ShowMarkdown";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Script from "next/script";

export default function Post() {
  // fetching data
  const pathname = usePathname();
  const id = parseInt(pathname.split("/")[2]);
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
  const [headings, setHeadings] = useState<string[]>([]);
  useEffect(() => {
    for (const post of posts) {
      if (post.id == id) {
        setState(post);
      }
    }
  }, [id]);

  // finding headings from data
  useEffect(() => {
    const arr = state.content
      .replaceAll(/```(.|\n)+```/gm, "")
      .split("\n")
      .filter((line) => line.startsWith("#"))
      .map((line) => line.replace(/#{1,6}/, "").trim());
    if (arr != null) {
      setHeadings(Array.from(arr));
    }
  }, [state]);

  // post new discussion
  const [newDiscussion, setNewDiscussion] = useState(false);

  return (
    <div className="p-4 font-fancy">
      <div className="mb-5">
        <h1 className="text-5xl text-center">{state.title}</h1>
        <cite className="block text-lg text-slate-400 text-center mt-3">
          - {state.author}
        </cite>
      </div>
      <div className="sm:flex justify-around">
        <ul className="hidden md:flex md:flex-col md:justify-start flex-1">
          {headings.map((h) => {
            return (
              <li key={h} className="text-sm text-slate-400 my-2">
                {h}
              </li>
            );
          })}
        </ul>

        <div className="flex-[3]">
          <div className="markdown-wrapper">
            <ShowMarkdown data={state.content} />
          </div>
        </div>

        <div className="flex-1 sm:flex-col sm:justify-start my-3 flex flex-wrap text-slate-200 items-center text-center justify-center">
          <p className="hidden sm:block text-lg text-slate-800 mb-2">Tags</p>
          {state.tags.map((tag) => {
            return (
              <div
                key={tag}
                className="bg-slate-600 px-[4px] py-[2px] rounded-xl mx-[2px] my-[2px] sm:w-[80%]"
              >
                {tag}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-[90%] mx-auto h-[2px] bg-slate-600 my-5"></div>
      <h2 className="text-4xl mt-6 mb-3 sm:text-center">Discussions:-</h2>

      <Discussions
        discussion={state.discussions}
        setNewDiscussion={setNewDiscussion}
      />

      {newDiscussion ? (
        <Markdown rows={10} cols={30} uploadMarkdown={handleNewDiscussion} />
      ) : (
        ""
      )}
    </div>
  );
}

function handleNewDiscussion(data: string | undefined) {
  console.log(data);
}
