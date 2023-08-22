"use client";
import { useState, useRef } from "react";
import ShowMarkdown from "../Markdown/ShowMarkdown";

type Props = {
  rows: number;
  cols: number;
};

export default function Markdown(props: Props) {
  const mk_ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string | undefined>("");
  return (
    <div>
      <textarea
        name="markdown"
        cols={props.cols}
        rows={props.rows}
        placeholder="Enter the content here"
        className="border border-slate-300 px-3 py-2 rounded-md mx-auto block w-fit mb-3 sm:w-full"
        ref={mk_ref}
        onChange={() => setText(mk_ref.current?.value)}
      ></textarea>
      <div>
        <h3 className="text-center text-2xl">Preview</h3>
        <p className="markdown-wrapper w-[280.8px] h-[240px] sm:w-full max-w-full px-3 py-2 text-slate-800 mx-auto border border-slate-300">
          <ShowMarkdown data={text != undefined ? text : "preview"} />
        </p>
        <button
          type="submit"
          className="block w-fit mx-auto mt-3 px-2 py-1 rounded-lg bg-gradient-to-br from-rose-300 to-pink-200 hover:from-rose-200 hover:to-pink-300 text-pink-800 text-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
}
