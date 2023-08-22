"use client";
import posts from "@/public/posts.json";
import Discussions from "@/app/components/Posts/Discussions";
import Markdown from "@/app/components/Posts/MarkdownInput";
import ShowMarkdown from "@/app/components/Markdown/ShowMarkdown";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Post() {
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
  useEffect(() => {
    for (const post of posts) {
      if (post.id == id) {
        setState(post);
      }
    }
  }, [id]);
  return (
    <div className="p-4 font-fancy">
      <div className="mb-5">
        <h1 className="text-5xl text-center">{state.title}</h1>
        <cite className="block text-lg text-slate-400 text-center mt-3">
          - {state.author}
        </cite>
      </div>
      <p>
        <div className="markdown-wrapper">
          <ShowMarkdown data={state.content} />
        </div>
      </p>

      <div className="my-3 flex flex-wrap text-slate-200 items-center text-center justify-center">
        {state.tags.map((tag) => {
          return (
            <div
              key={tag}
              className="bg-slate-600 px-[4px] py-[2px] rounded-xl mx-[2px] my-[2px]"
            >
              {tag}
            </div>
          );
        })}
      </div>

      <div className="w-[90%] mx-auto h-[2px] bg-slate-600 my-5"></div>
      <h2 className="text-4xl mt-6 mb-3">Discussions:-</h2>

      <Discussions discussion={state.discussions} />

      <Markdown rows={10} cols={30} />
    </div>
  );
}
