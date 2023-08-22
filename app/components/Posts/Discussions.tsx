import ShowMarkdown from "../Markdown/ShowMarkdown";

type Props = {
  discussion: {
    id: number;
    content: string;
    author: string;
    replies: { id: number; content: string; author: string }[];
  }[];
};

export default function Discussions(props: Props) {
  return (
    <div>
      {props.discussion.map((elem) => {
        return (
          <div
            key={elem.id}
            className="border border-slate-400 p-3 rounded-md my-2 mx-auto w-full sm:max-w-[80%] min-w-fit"
          >
            <cite className="text-sm w-fit block mr-auto text-slate-400">
              -- {elem.author}
            </cite>
            <ShowMarkdown data={elem.content} />
            <div>
              {elem.replies.map((reply) => {
                return (
                  <div
                    key={reply.id}
                    className="pl-3 border-2 border-transparent border-l-emerald-400 max-w-[80%] min-w-fit"
                  >
                    <ShowMarkdown data={reply.content} />
                    <cite className="text-sm w-fit block mr-auto text-slate-400">
                      - {reply.author}
                    </cite>
                  </div>
                );
              })}
            </div>
            <div className="text-md text-slate-800 font-semibold">
              <button className="w-fit px-2 py-1 my-2 rounded-lg bg-gradient-to-t from-teal-100 to-teal-300 hover:from-teal-300 hover:to-teal-100">
                Reply
              </button>
            </div>
          </div>
        );
      })}
      <button className="block w-fit mx-auto px-3 py-2 my-5 rounded-md bg-gradient-to-tr from-rose-200 to-pink-300 hover:from-purple-200 hover:to-rose-300 text-pink-800 hover:text-rose-950 transition-all duration-200">
        New discussion
      </button>
    </div>
  );
}
