"use client";
import { useState, useRef } from "react";
import ShowMarkdown from "../Markdown/ShowMarkdown";

type Props = {
  rows: number;
  cols: number;
  uploadMarkdown: Function;
  discussionHandler: Function | null;
};

export default function Markdown(props: Props) {
  const mk_ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string | undefined>("");
  return (
    <div className="fixed left-0 top-0 h-[100vh] w-[100vw] bg-[rgba(50,50,50,0.7)] py-10 backdrop-blur-sm">
      <textarea
        name="markdown"
        cols={props.cols}
        rows={props.rows}
        placeholder="Enter the content here"
        className="mx-auto mb-3 block w-fit rounded-md border border-slate-300 bg-[rgba(250,250,250,0.8)] px-3 py-2 dark:border-slate-600 dark:bg-slate-700 sm:w-[70%]"
        ref={mk_ref}
        onChange={() => setText(mk_ref.current?.value)}
      ></textarea>
      <div>
        <h3 className="mb-5 text-center text-2xl text-slate-200">Preview</h3>
        <p className="markdown-wrapper mx-5 min-h-[30vh] rounded-lg border border-slate-300 bg-slate-300 px-3 py-2 dark:bg-slate-800">
          <ShowMarkdown data={text != undefined ? text : "preview"} />
        </p>
        <div className="flex">
          <button
            className="mx-auto mt-3 block w-fit rounded-lg bg-gradient-to-br from-rose-300 to-pink-200 px-2 py-1 text-lg text-pink-800 hover:from-rose-200 hover:to-pink-300"
            onClick={() => props.discussionHandler?.(false)}
          >
            Cancel
          </button>
          <button
            className="mx-auto mt-3 block w-fit rounded-lg bg-gradient-to-br from-rose-300 to-pink-200 px-2 py-1 text-lg text-pink-800 hover:from-rose-200 hover:to-pink-300"
            onClick={() => {
              props.uploadMarkdown(text);
              props.discussionHandler?.(false);
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
