export default function Tags(props: { tags?: Array<string> }) {
  return (
    <div className="my-3 flex flex-[1] flex-wrap items-center justify-center text-center text-slate-200 sm:flex-col sm:justify-start">
      {props.tags?.map((tag) => {
        return (
          <div
            key={tag}
            className="mx-[2px] my-[2px] rounded-xl bg-slate-600 px-[4px] py-[2px] dark:text-slate-300 sm:w-[80%]"
          >
            {tag}
          </div>
        );
      })}
    </div>
  );
}
