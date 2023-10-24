type Props = {
  currentTab: number;
  setCurrentTab: Function;
  markdown: string | null;
  setMarkdown: Function;
};

import Textarea from "react-textarea-autosize";
import ShowMarkdown from "../../Markdown/ShowMarkdown";
import { inter } from "@/custom-fonts/fonts";

export default function MkdnInput(props: Props) {
  return (
    <div>
      <div className="py-3">
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <div className="flex w-[80%] items-center justify-center gap-2">
            <button
              className={
                "block w-fit rounded-md px-4 py-2 transition-colors duration-200 " +
                (props.currentTab == 1
                  ? "bg-slate-800 text-slate-200 dark:bg-slate-200 dark:text-slate-700"
                  : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200")
              }
              onClick={() => props.setCurrentTab(1)}
            >
              Input
            </button>
            <button
              className={
                "block w-fit rounded-md px-4 py-2 transition-colors duration-200 " +
                (props.currentTab == 2
                  ? "bg-slate-800 text-slate-200 dark:bg-slate-200 dark:text-slate-700"
                  : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200")
              }
              onClick={() => props.setCurrentTab(2)}
            >
              Preview
            </button>
          </div>
          <div className="min-w-[70vw]">
            <div className={props.currentTab == 2 ? "hidden" : "block"}>
              <Textarea
                name="markdown"
                cols={20}
                placeholder="Enter the content here"
                className="mx-auto mb-3 block max-h-[50vh] w-fit max-w-full rounded-md border border-slate-300 bg-[rgba(250,250,250,0.8)] px-3 py-2 dark:border-slate-600 dark:bg-slate-700 sm:w-[70%]"
                onChange={(e) => props.setMarkdown(e.target.value)}
                defaultValue={props.markdown ? props.markdown : ""}
              ></Textarea>
            </div>
            <div className={props.currentTab == 1 ? "hidden" : "block"}>
              <div
                className={
                  "markdown-wrapper mx-5 max-h-[40vh] min-h-[30vh] w-full max-w-fit overflow-y-auto rounded-lg border border-slate-300 bg-slate-300 px-3 py-2 dark:bg-slate-800 " +
                  inter.className
                }
              >
                <ShowMarkdown
                  data={props.markdown ? props.markdown : "preview"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
