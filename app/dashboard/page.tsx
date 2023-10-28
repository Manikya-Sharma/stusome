"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { LuArrowLeft } from "react-icons/lu";

import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { State } from "@/types/user";
import { IconContext } from "react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import LoadingSkeleton from "../components/LoggedIn/LoadingSkeleton";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  const [loadingDoubts, setLoadingDoubts] = useState<boolean>(true);
  const [posts, setPosts] = useState<Array<Post> | null>(null);
  const [doubts, setDoubts] = useState<Array<Doubt> | null>(null);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(() => window.innerWidth);
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      if (!session || !session.user || !session.user.email) {
        return;
      }
      const rawAccount = await fetch(
        `/api/getAccountByEmail/${session.user.email}`,
      );

      let account = (await rawAccount.json()) as State;
      const postIds = account.posts;

      const requests = postIds.map((elem) => {
        return fetch(`/api/posts/getPost/${elem}`, { cache: "no-cache" });
      });
      const responses = await Promise.all(requests);
      const data = (await Promise.all(
        responses.map((response) => response.json()),
      )) as Post[];
      setPosts(data.filter((post) => post != null));
    }

    async function fetchDoubts() {
      if (!session || !session.user || !session.user.email) {
        return;
      }
      const rawAccount = await fetch(
        `/api/getAccountByEmail/${session.user.email}`,
      );

      let account = (await rawAccount.json()) as State;
      const doubtIds = account.doubts;

      const requests = doubtIds.map((elem) => {
        return fetch(`/api/doubts/getDoubt/${elem}`, { cache: "no-cache" });
      });
      const responses = await Promise.all(requests);
      const data = (await Promise.all(
        responses.map((response) => response.json()),
      )) as Doubt[];
      setDoubts(data.filter((post) => post != null));
    }

    async function getData() {
      await Promise.all([fetchPosts(), fetchDoubts()]);
      setLoadingPosts(false);
      setLoadingDoubts(false);
    }
    getData();
  }, [session]);

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

  async function newDoubt() {
    if (session && session.user && session.user.email) {
      const newId = uuid();
      const doubt: Doubt = {
        author: session.user.email,
        content: "",
        id: newId,
        tags: [],
        title: "",
        answers: [],
      };
      try {
        await fetch("/api/doubts/newDoubt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doubt),
        });
        router.push(`/doubts/${newId}/edit`);
      } catch (e) {
        console.log(`An error occurred: ${e}`);
      }
    }
  }

  return (
    <main className="relative">
      <IconContext.Provider value={{ className: "shared-class", size: "23" }}>
        <div className="absolute left-2 top-2 z-[100]">
          <button
            onClick={() => router.back()}
            className="text-lg text-slate-800 underline-offset-2 hover:underline dark:text-slate-200"
          >
            <LuArrowLeft />
          </button>
        </div>
      </IconContext.Provider>

      <Toaster position="top-center" />
      <div className="min-h-screen bg-gray-100 pt-10 dark:bg-slate-800">
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
              {loadingPosts ? (
                <LoadingSkeleton />
              ) : (
                <Swiper
                  allowTouchMove={true}
                  slidesPerView={width < 600 ? 1 : 3}
                  navigation={true}
                  modules={[Navigation]}
                  className="w-full [&>*:first-child]:ml-10 [&>*:last-child]:mr-10"
                >
                  {posts &&
                    posts.map((post) => {
                      return (
                        <SwiperSlide key={post.title}>
                          <div
                            className="mx-3 my-5 cursor-pointer overflow-hidden rounded-lg bg-slate-200 p-4 py-5 transition-transform hover:scale-105"
                            onClick={() => router.push(`/posts/${post.id}`)}
                          >
                            <h3 className="mb-2 text-xl font-semibold">
                              {post.title}
                              {post.published == false && " - draft"}
                            </h3>
                            <p>{post.content.slice(0, 150)} ...</p>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  <SwiperSlide></SwiperSlide>
                </Swiper>
              )}
            </section>

            {/* <!-- Create New Post button --> */}
            <div className="mt-4">
              <button
                className="hover: mb-5 scale-105 rounded border-2 border-green-400 bg-blue-500 px-4 py-2 font-bold text-slate-200 transition-all duration-200 hover:scale-105 hover:bg-blue-700 dark:bg-black dark:hover:bg-green-400 dark:hover:text-black/80"
                onClick={() => {
                  toast.promise(newPost(), {
                    loading: "Creating new post",
                    error: "Error occurred, Please try again later",
                    success:
                      "Created post successfully, please wait while we redirect",
                  });
                }}
              >
                Create New Post
              </button>
            </div>

            {/* <!-- My Doubts section --> */}
            <section className="rounded-lg bg-white p-4 shadow-lg dark:bg-black">
              <h2 className="mb-4 text-2xl font-semibold dark:text-slate-200">
                My Doubts
              </h2>
              {/* <!-- Blog-style posts with responsive widths --> */}
              {loadingDoubts ? (
                <LoadingSkeleton />
              ) : (
                <Swiper
                  allowTouchMove={true}
                  slidesPerView={width < 600 ? 1 : 3}
                  navigation={true}
                  modules={[Navigation]}
                  className="w-full [&>*:first-child]:ml-10 [&>*:last-child]:mr-10"
                >
                  {doubts &&
                    doubts.map((doubt) => {
                      return (
                        <SwiperSlide key={doubt.title}>
                          <div
                            className="mx-3 my-5 cursor-pointer overflow-hidden rounded-lg bg-slate-200 p-4 py-5 transition-transform hover:scale-105"
                            onClick={() => router.push(`/doubts/${doubt.id}`)}
                          >
                            <h3 className="mb-2 text-xl font-semibold">
                              {doubt.title}
                            </h3>
                            <p>{doubt.content.slice(0, 150)} ...</p>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  <SwiperSlide></SwiperSlide>
                </Swiper>
              )}
            </section>
            <button
              className="hover: my-5 scale-105 rounded border-2 border-green-400 bg-blue-500 px-4 py-2 font-bold text-slate-200 transition-all duration-200 hover:scale-105 hover:bg-blue-700 dark:bg-black dark:hover:bg-green-400 dark:hover:text-black/80"
              onClick={() => {
                router.push("/newdoubt");
              }}
            >
              Create New Doubt
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
