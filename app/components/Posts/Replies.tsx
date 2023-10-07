"use client";
import { Reply } from "@/types/post";
import { useState, useEffect } from "react";
import ShowMarkdown from "../Markdown/ShowMarkdown";

type Props = {
  replyIds: string[];
};

export default function Replies(props: Props) {
  const [replies, setReplies] = useState<Array<Reply | null> | null>(null);
  useEffect(() => {
    async function fetchData() {
      const promises = props.replyIds.map((replyId) => {
        return fetch(`/api/posts/getReplies/${replyId}`);
      });
      const responses = await Promise.all(promises);
      const data = (await Promise.all(
        responses.map((response) => response.json()),
      )) as Array<Reply | null> | null;
      setReplies(data);
    }
    fetchData();
  }, [props.replyIds]);
  return replies?.map((reply) => {
    return (
      <div
        key={reply?.id}
        className="markdown-wrapper min-w-fit max-w-[80%] border-2 border-transparent border-l-emerald-400 pl-3"
      >
        {reply && <ShowMarkdown data={reply.content} />}
        <cite className="mr-auto block w-fit text-sm text-slate-400">
          - {reply?.author}
        </cite>
      </div>
    );
  });
}
