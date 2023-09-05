import Link from "next/link";

import mostViewedPosts from "@/public/most-viewed.json";

export default function MostViewed() {
  return (
    <section className="w-fit sm:min-w-[30%] mx-auto text-center">
      <h2 className="text-3xl mt-7 mb-3 sm:text-5xl font-merri">
        Most Viewed Posts
      </h2>
      <div>
        <ul className="flex flex-col text-lg">
          {mostViewedPosts.map((post) => {
            return (
              <li key={post.id}>
                <Link
                  href={`/posts/${post.id}`}
                  className="block px-2 py-2 border my-2 border-teal-300 rounded-md hover:bg-teal-300 hover:text-blue-800 transition-all duration-150 dark:bg-zinc-700 dark:hover:bg-teal-300 dark:text-teal-100 dark:hover:text-teal-950"
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
