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
  const [currentTab, setCurrentTab] = useState<1 | 2>(1);
  return (
    <div className="fixed left-0 top-0 z-[150] h-[100vh] w-[100vw] bg-[rgba(50,50,50,0.7)] py-16 backdrop-blur-sm">
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <div className="flex w-[80%] items-center justify-center gap-2">
          <button
            className={
              "block w-fit rounded-md px-4 py-2 transition-colors duration-200 " +
              (currentTab == 1
                ? "bg-slate-200 text-slate-700"
                : "bg-slate-800 text-slate-200")
            }
            onClick={() => setCurrentTab(1)}
          >
            Input
          </button>
          <button
            className={
              "block w-fit rounded-md px-4 py-2 transition-colors duration-200 " +
              (currentTab == 2
                ? "bg-slate-200 text-slate-700"
                : "bg-slate-800 text-slate-200")
            }
            onClick={() => setCurrentTab(2)}
          >
            Preview
          </button>
        </div>
        <div className="min-h-[50vh] min-w-[70vw]">
          <div className={currentTab == 2 ? "hidden" : "block"}>
            <textarea
              name="markdown"
              cols={props.cols}
              rows={props.rows}
              placeholder="Enter the content here"
              className="mx-auto mb-3 block w-fit rounded-md border border-slate-300 bg-[rgba(250,250,250,0.8)] px-3 py-2 dark:border-slate-600 dark:bg-slate-700 sm:w-[70%]"
              ref={mk_ref}
              onChange={() => setText(mk_ref.current?.value)}
            ></textarea>
          </div>
          <div className={currentTab == 1 ? "hidden" : "block"}>
            <p className="markdown-wrapper mx-5 max-h-[40vh] min-h-[30vh] w-full overflow-y-auto rounded-lg border border-slate-300 bg-slate-300 px-3 py-2 dark:bg-slate-800">
              <ShowMarkdown data={text != undefined ? text : "preview"} />
            </p>
          </div>
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
    </div>
  );
}
