import { inter } from "@/custom-fonts/fonts";
import { RefObject, useState } from "react";

type Props = {
  tagRef: RefObject<HTMLInputElement>;
  tags: Array<string> | null;
  setTags: Function;
};
export default function TagsInput(props: Props) {
  const [typing, setTyping] = useState<boolean>(false);
  function addTag() {
    if (!props.tagRef.current) {
      return;
    }
    const value = props.tagRef.current.value;
    if (value.trim() == "") {
      return;
    }
    if (props.tags == null) {
      props.setTags([value]);
    } else {
      if (
        props.tags.map((tag) => tag.toLowerCase()).includes(value.toLowerCase())
      ) {
        return;
      }
      props.setTags([...props.tags, value.toLowerCase()]);
      props.tagRef.current.value = "";
    }
  }

  function removeTag(tag: string) {
    if (!props.tags) {
      return;
    }
    props.setTags(
      props.tags?.filter((currentTag) => {
        return tag != currentTag;
      }),
    );
  }

  return (
    <>
      <h2 className="my-5 text-xl">Tags</h2>
      <div className="flex flex-wrap items-center gap-2 space-y-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTag();
          }}
          className="group my-2 flex cursor-pointer items-center justify-start gap-2 rounded-3xl border border-slate-300 bg-slate-200 px-2 py-1 text-slate-800 dark:border-black/30 dark:bg-slate-700 dark:text-slate-100"
          onClick={() => props.tagRef.current?.focus()}
        >
          <input
            type="text"
            placeholder="+New Tag"
            ref={props.tagRef}
            className="block h-fit max-w-[80px] cursor-pointer rounded-lg bg-inherit focus-visible:outline-none group-hover:placeholder:text-black/40 dark:group-hover:placeholder:text-slate-50"
            onChange={(e) => {
              e.currentTarget.value.trim() == ""
                ? setTyping(false)
                : setTyping(true);
            }}
          />

          <button
            type="submit"
            className={typing ? "opacity-100" : "opacity-0"}
          >
            +
          </button>
        </form>
        {props.tags &&
          props.tags.map((tag) => {
            return (
              <div
                key={tag}
                className={
                  "group w-fit cursor-pointer rounded-3xl bg-slate-300 px-3 py-1 text-slate-800 transition-all duration-300 hover:bg-slate-500 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 " +
                  inter.className
                }
                onClick={() => removeTag(tag)}
              >
                {tag}
                <button className="ml-2 inline-block rounded-full border-[1px] border-red-400 bg-rose-200 px-2 text-red-800 transition-opacity duration-300 dark:text-rose-400 md:opacity-0 md:group-hover:opacity-100">
                  x
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
