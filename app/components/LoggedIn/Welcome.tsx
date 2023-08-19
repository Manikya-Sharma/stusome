import Link from "next/link";
import Image from "next/image";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type Props = {
  user: User;
};

export default function Welcome(props: Props) {
  return (
    <section className="font-fancy">
      <h1 className="text-3xl sm:text-5xl text-center sm:pb-4 font-merri">
        Welcome {props.user.name}!
      </h1>
      <div className="w-fit group mx-auto">
        <Link
          href={`/logged-in/${props.user.id}/dashboard`}
          className="block text-lg py-2 px-3 my-2 border-2 border-dotted border-green-400 w-fit rounded-md group-hover:border-solid group-hover:bg-green-400 group-hover:text-emerald-900 transition-all duration-100"
        >
          Your dashboard{" "}
          <Image
            src="/images/misc/back.svg"
            alt="->"
            width={20}
            height={20}
            className="inline-block rotate-180 group-hover:translate-x-1 transition-all duration-100"
          />
        </Link>
      </div>
    </section>
  );
}
