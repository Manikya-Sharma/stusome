"use client";
import ShowMarkdown from "../Markdown/ShowMarkdown";
import { LuReply } from "react-icons/lu";
import { LiaPlusCircleSolid } from "react-icons/lia";
import { IconContext } from "react-icons";
import { Discussion } from "@/types/post";
import { useEffect, useState } from "react";
import Replies from "./Replies";

type Props = {
  discussionIds: string[];
  discussionHandler: Function;
};

export default function Discussions(props: Props) {
  const [discussions, SetDiscussions] = useState<Discussion[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      const promises = props.discussionIds.map((discussionId) => {
        return fetch(`/api/posts/getDiscussion/${discussionId}`);
      });
      const responses = await Promise.all(promises);
      const data = (await Promise.all(
        responses.map((response) => response.json()),
      )) as Discussion[];
      SetDiscussions(data);
    }
    fetchData();
  }, [props.discussionIds]);
  return (
    <div>
      {discussions?.map((elem) => {
        return (
          <div
            key={elem.id}
            className="mx-auto my-2 w-full min-w-fit rounded-md border border-slate-400 p-3 sm:max-w-[80%]"
          >
            <cite className="mr-auto block w-fit text-sm text-slate-400">
              -- {elem.author}
            </cite>
            <div className="markdown-wrapper">
              <ShowMarkdown data={elem.content} />
            </div>
            <div>
              <Replies replyIds={elem.replies} />
            </div>
            <div className="text-md font-semibold text-slate-800">
              <button
                className=" my-2 flex w-fit items-center justify-start gap-2 rounded-lg bg-gradient-to-t from-teal-100 to-teal-300 px-2 py-1 hover:from-teal-300 hover:to-teal-100"
                onClick={() => props.discussionHandler("reply", elem.id)}
                // onClick={() => {
                //   const arr = showReply;
                //   arr[elem.id - 1] = true;
                //   setShowReply(arr);
                // }}
              >
                <LuReply />
                Reply
                {/* {showReply[elem.id - 1] == true ? (
                  <Markdown rows={10} cols={10} uploadMarkdown={() => {}} />
                ) : (
                  ""
                )} */}
              </button>
            </div>
          </div>
        );
      })}

      <IconContext.Provider value={{ className: "shared-class", size: "20" }}>
        <button
          className="mx-auto my-5 flex w-fit items-center justify-around gap-2 rounded-md bg-gradient-to-tr from-rose-200 to-pink-300 px-3 py-2 text-pink-800 transition-all duration-200 hover:from-purple-200 hover:to-rose-300 hover:text-rose-950"
          onClick={() => {
            props.discussionHandler("discussion");
          }}
        >
          <LiaPlusCircleSolid />
          New discussion
        </button>
      </IconContext.Provider>
    </div>
  );
}
