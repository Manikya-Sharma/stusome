import Link from "next/link";
import { quicksand } from "@/custom-fonts/fonts";

import mostViewedPosts from "@/public/most-viewed.json";

export default function MostViewed() {
  return (
    <section className="mx-auto w-fit text-center sm:min-w-[30%]">
      <h2 className="mb-3 mt-7 font-merri text-3xl sm:text-5xl">
        Most Viewed Posts
      </h2>
      <div className={quicksand.className}>
        <ul className="flex flex-col text-lg">
          {mostViewedPosts.map((post) => {
            return (
              <li key={post.id}>
                <Link
                  href={`/posts/${post.id}`}
                  className="my-2 block rounded-md border border-teal-300 px-2 py-2 transition-all duration-150 hover:bg-teal-300 hover:text-blue-800 dark:bg-zinc-700 dark:text-teal-100 dark:hover:bg-teal-300 dark:hover:text-teal-950"
                >
                  <div className="flex justify-between space-x-1">
                    <div>{post.title}</div>
                    <div>({post.author})</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
