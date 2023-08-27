type Props = {
  description: string;
  danger: boolean;
  warning: boolean;
};

export default function Tile(props: Props) {
  return (
    <section
      className={
        "cursor-pointer flex justify-between font-[450] w-[90%] sm:w-full min-w-fit py-5 px-3 rounded-lg bg-slate-200 text-slate-700 my-3 mx-auto border transition-all duration-200 hover:bg-slate-100 hover:text-black" +
        (props.warning && " border-orange-500") +
        (props.danger &&
          " border-red-500 text-red-700 hover:bg-red-700 hover:text-white")
      }
    >
      <div>{props.description}</div>
      <div>&gt;</div>
    </section>
  );
}
