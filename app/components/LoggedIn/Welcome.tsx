import Link from "next/link";
import Image from "next/image";
import { LuLayoutDashboard, LuArrowRight } from "react-icons/lu";

import { State } from "@/app/types/user";

type Props = {
  user: State;
};

export default function Welcome(props: Props) {
  return (
    <section className="font-fancy">
      <h1 className="text-center font-merri text-3xl sm:pb-4 sm:text-5xl">
        Welcome {props.user.name}!
      </h1>
      <div className="group mx-auto w-fit">
        <Link
          href={`/logged-in/${props.user._id}/dashboard`}
          className="relative my-2 flex w-fit items-center gap-2 rounded-md border-2 border-dotted border-green-400 px-3 py-2 text-lg transition-all duration-200 group-hover:border-solid group-hover:bg-green-400 group-hover:text-emerald-900 dark:border-transparent dark:bg-slate-500 dark:hover:bg-emerald-300 dark:hover:text-green-950"
        >
          <LuLayoutDashboard />
          <p>Your dashboard</p>
          <div className="transition-transform duration-100 group-hover:translate-x-1">
            <LuArrowRight />
          </div>
        </Link>
      </div>
    </section>
  );
}
