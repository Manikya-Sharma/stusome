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
      <h1 className="text-3xl sm:text-5xl text-center sm:pb-4 font-merri">
        Welcome {props.user.name}!
      </h1>
      <div className="w-fit group mx-auto">
        <Link
          href={`/logged-in/${props.user._id}/dashboard`}
          className="relative flex gap-2 items-center text-lg py-2 px-3 my-2 border-2 border-dotted border-green-400 w-fit rounded-md group-hover:border-solid group-hover:bg-green-400 group-hover:text-emerald-900 transition-all duration-100 dark:bg-gradient-to-tr dark:from-emerald-900 dark:to-emerald-950 dark:border-green-800 dark:hover:bg-gradient-to-tr dark:hover:from-emerald-300 dark:hover:to-emerald-500"
        >
          <LuLayoutDashboard />
          <p>Your dashboard</p>
          <div className="group-hover:translate-x-1 transition-transform duration-100">
            <LuArrowRight />
          </div>
        </Link>
      </div>
    </section>
  );
}
