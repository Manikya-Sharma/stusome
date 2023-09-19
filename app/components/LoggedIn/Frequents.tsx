import Link from "next/link";

import popularDoubts from "@/public/popular-doubts.json";

export default function PopularDoubts() {
  return (
    <section className="mx-auto w-fit text-center sm:min-w-[30%]">
      <h2 className="mb-3 mt-7 font-merri text-3xl sm:text-5xl">
        Popular Doubts
      </h2>
      <div>
        <ul className="flex flex-col text-lg">
          {popularDoubts.map((doubt) => {
            return (
              <li key={doubt.id}>
                <Link
                  href={`/doubts/${doubt.id}`}
                  className="my-2 block rounded-md border border-rose-300 px-2 py-2 transition-all duration-150 hover:bg-rose-300 hover:text-pink-800 dark:border-rose-300 dark:bg-zinc-700 dark:text-rose-100 dark:hover:bg-rose-200 dark:hover:text-rose-950"
                >
                  <p>{doubt.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
