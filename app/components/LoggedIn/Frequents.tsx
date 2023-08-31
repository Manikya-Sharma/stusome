import Link from "next/link";

import popularDoubts from "@/public/popular-doubts.json";

export default function PopularDoubts() {
  return (
    <section className="w-fit sm:min-w-[30%] mx-auto text-center">
      <h2 className="text-3xl mt-7 mb-3 sm:text-5xl font-merri">
        Popular Doubts
      </h2>
      <div>
        <ul className="flex flex-col text-lg">
          {popularDoubts.map((doubt) => {
            return (
              <li key={doubt.id}>
                <Link
                  href={`/doubts/${doubt.id}`}
                  className="block px-2 py-2 border my-2 border-rose-300 rounded-md hover:bg-rose-300 hover:text-pink-800 transition-all duration-150 dark:bg-gradient-to-tr dark:from-rose-800 dark:to-rose-950 dark:border-rose-950 dark:hover:from-rose-300 dark:hover:to-rose-400"
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
