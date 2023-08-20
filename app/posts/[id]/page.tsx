"use client";
import posts from "@/public/posts.json";
import Discussions from "@/app/components/Posts/Discussions";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
      <h1 className="text-5xl text-center mb-5">{state.title}</h1>
      <p>
        <div className="markdown-wrapper">
          <ReactMarkdown components={{ h1: "h2", h2: "h3", h3: "h4" }}>
            {state.content}
          </ReactMarkdown>
        </div>
      </p>
      <div className="w-[90%] mx-auto h-[2px] bg-slate-600 my-5"></div>
      <h2 className="text-4xl mt-6 mb-3">Discussions:-</h2>

      <Discussions discussion={state.discussions} />
    </div>
  );
}
