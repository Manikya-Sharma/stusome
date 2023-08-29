type Props = {
  description: string;
  type: "normal" | "danger" | "warning";
};

export default function Tile(props: Props) {
  return (
    <section
      className={
        "cursor-pointer flex justify-between font-[450] w-[90%] sm:w-full min-w-fit py-5 px-3 rounded-lg  my-3 mx-auto border transition-all duration-200 " +
        (props.type == "normal" &&
          " bg-slate-200 text-slate-700 hover:bg-slate-100 hover:text-black") +
        (props.type == "warning" && " bg-slate-200 border-orange-500") +
        (props.type == "danger" &&
          " bg-slate-200 border-red-500 text-red-700 hover:bg-red-700 hover:text-white")
      }
    >
      <div>{props.description}</div>
      <div>&gt;</div>
    </section>
  );
}
