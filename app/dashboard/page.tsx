"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { LuArrowLeft } from "react-icons/lu";

import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { Post } from "@/types/post";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  async function newPost() {
    if (session && session.user && session.user.email) {
      const newId = uuid();
      const post: Post = {
        author: session.user.email,
        content: "",
        coverImgFull: "",
        discussions: [],
        id: newId,
        published: false,
        tags: [],
        title: "",
      };
      try {
        await fetch("/api/posts/newPost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        });
        router.push(`/posts/${newId}/edit`);
      } catch (e) {
        console.log(`An error occurred: ${e}`);
      }
    }
  }
  return (
    <main className="px-4">
      <Toaster position="top-center" />
      <div className="h-10">
        <button
          onClick={() => {
            router.back();
          }}
        >
          <LuArrowLeft />
        </button>
      </div>
      <div className="h-screen bg-gray-100 dark:bg-slate-800">
        <div className="container mx-auto p-4">
          {/* <!-- Top navigation bar --> */}
          <nav className="bg-blue-500 p-4 text-slate-200 dark:bg-black">
            {/* <!-- User's name in the top left corner --> */}
            <div className="font-bold text-slate-200">
              Hello {session?.user?.name}
            </div>
          </nav>

          {/* <!-- Main content --> */}
          <div className="mt-4">
            {/* <!-- My Posts section --> */}
            <section className="rounded-lg bg-white p-4 shadow-lg dark:bg-black">
              <h2 className="mb-4 text-2xl font-semibold dark:text-slate-200">
                My Posts
              </h2>
              {/* <!-- Blog-style posts with responsive widths --> */}
              <div className="flex flex-col gap-2  sm:flex-row md:flex-nowrap">
                <div className="sm:w-47.5 md:w-47.5 lg:w-23.75 w-full rounded-lg bg-slate-200 p-4 transition-transform hover:scale-105">
                  <h3 className="text-xl font-semibold">Post 1</h3>
                  <p>This is the content of post 1.</p>
                </div>
                <div className="sm:w-47.5 md:w-47.5 lg:w-23.75 w-full rounded-lg bg-slate-200 p-4 transition-transform hover:scale-105">
                  <h3 className="text-xl font-semibold">Post 2</h3>
                  <p>This is the content of post 2.</p>
                </div>
                <div className="sm:w-47.5 md:w-47.5 lg:w-23.75 w-full rounded-lg bg-slate-200 p-4 transition-transform hover:scale-105">
                  <h3 className="text-xl font-semibold">Post 3</h3>
                  <p>This is the content of post 3.</p>
                </div>
                <div className="sm:w-47.5 md:w-47.5 lg:w-23.75 w-full rounded-lg bg-slate-200 p-4 transition-transform hover:scale-105">
                  <h3 className="text-xl font-semibold">Post 4</h3>
                  <p>This is the content of post 4.</p>
                </div>
              </div>
            </section>

            {/* <!-- Create New Post button --> */}
            <div className="mt-4">
              <button
                className="hover: scale-105 rounded border-2 border-green-400 bg-blue-500 px-4 py-2 font-bold text-slate-200 hover:scale-105 hover:bg-blue-700 dark:bg-black"
                onClick={() => {
                  toast.promise(newPost(), {
                    loading: "Creating new post",
                    error: "Error occurred, Please try again later",
                    success: "Created post successfully, please wait while we redirect",
                  });
                }}
              >
                Create New Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
