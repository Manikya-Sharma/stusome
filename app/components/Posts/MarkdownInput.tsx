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
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(50,50,50,0.7)] backdrop-blur-sm py-10">
      <textarea
        name="markdown"
        cols={props.cols}
        rows={props.rows}
        placeholder="Enter the content here"
        className="border border-slate-300 bg-[rgba(250,250,250,0.8)] px-3 py-2 rounded-md mx-auto block w-fit mb-3 sm:w-[70%]"
        ref={mk_ref}
        onChange={() => setText(mk_ref.current?.value)}
      ></textarea>
      <div>
        <h3 className="text-center text-2xl text-slate-200 mb-5">Preview</h3>
        <p className="markdown-wrapper min-h-[30vh] px-3 py-2 text-slate-800 mx-5 border border-slate-300 bg-slate-300 rounded-lg">
          <ShowMarkdown data={text != undefined ? text : "preview"} />
        </p>
        <div className="flex">
          <button
            className="block w-fit mx-auto mt-3 px-2 py-1 rounded-lg bg-gradient-to-br from-rose-300 to-pink-200 hover:from-rose-200 hover:to-pink-300 text-pink-800 text-lg"
            onClick={() => props.discussionHandler?.(false)}
          >
            Cancel
          </button>
          <button
            className="block w-fit mx-auto mt-3 px-2 py-1 rounded-lg bg-gradient-to-br from-rose-300 to-pink-200 hover:from-rose-200 hover:to-pink-300 text-pink-800 text-lg"
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
