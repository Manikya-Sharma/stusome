"use client";
import posts from "@/public/posts.json";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Post() {
  const pathname = usePathname();
  const id = parseInt(pathname.split("/")[2]);
  const [state, setState] = useState({
    id: id,
    title: "",
    author: "",
  });
  useEffect(() => {
    for (const post of posts) {
      if (post.id == id) {
        setState(post);
      }
    }
  }, [id]);
  return <h1>{state.title}</h1>;
}
