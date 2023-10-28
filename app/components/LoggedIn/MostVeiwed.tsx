"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { quicksand } from "@/custom-fonts/fonts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { randomColor } from "@/lib/utils";
import { Post } from "@/types/post";
import { State } from "@/types/user";
import LoadingSkeleton from "../LoggedIn/LoadingSkeleton";

type Props = {
  setLoader: Function;
};

export default function MostViewed(props: Props) {
  const [width, setWidth] = useState<number>(0);
  const [mostViewed, setMostViewed] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<{
    email: string;
    data: State;
  }> | null>(null);
  useEffect(() => {
    setWidth(() => window.innerWidth);
  }, []);
  useEffect(() => {
    async function fetchData() {
      // get posts
      const rawMostViewedPostIds = await fetch(
        "/api/posts/getMostViewedPosts",
        { cache: "no-cache" },
      );
      const mostViewedPostIds = (await rawMostViewedPostIds.json()) as Array<{
        id: string;
      }>;
      const requests = mostViewedPostIds.map((elem) => {
        return fetch(`/api/posts/getPost/${elem.id}`);
      });
      const responses = await Promise.all(requests);
      let data = (await Promise.all(
        responses.map((response) => response.json()),
      )) as Post[];

      data = data.filter((post) => post != null && post.published == true);
      setMostViewed(data);
      setLoading(false);

      // authors
      const authorEmails = data.map((post) => post.author);
      const EmailRequests = authorEmails.map((email) => {
        return fetch(`/api/getAccountByEmail/${email}`);
      });
      const emailResponses = await Promise.all(EmailRequests);
      const authors = (await Promise.all(
        emailResponses.map((account) => {
          return account.json();
        }),
      )) as State[];

      const authorsArray: Array<{
        email: string;
        data: State;
      }> = [];
      for (let i = 0; i < authorEmails.length; i += 1) {
        authorsArray.push({ email: authorEmails[i], data: authors[i] });
      }
      setUsers(authorsArray);

      props.setLoader(false);
    }
    fetchData();
  }, [props]);
  return (
    <section className="mb-20 mt-10">
      <h2 className="mb-5 mt-7 text-2xl font-semibold sm:text-5xl">
        Top Posts
      </h2>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className={quicksand.className}>
            <div className="text-lg">
              <Swiper
                allowTouchMove={true}
                slidesPerView={width < 600 ? 1 : 3}
                navigation={true}
                modules={[Navigation]}
                className="w-full [&>*:first-child]:ml-10 [&>*:last-child]:mr-10"
              >
                {mostViewed?.map((post) => {
                  return (
                    <SwiperSlide key={post.id}>
                      <Link
                        href={`/posts/${post.id}`}
                        className="mx-3 block rounded-md border border-teal-300 px-2 py-2 transition-all duration-150 hover:bg-teal-300 hover:text-blue-800 dark:bg-zinc-700 dark:text-teal-100 dark:hover:bg-teal-300 dark:hover:text-teal-950"
                      >
                        <div className="flex flex-col justify-start">
                          <div
                            className={"relative h-[30vh] w-full rounded-md "}
                            style={{
                              backgroundColor: !post.coverImgFull
                                ? randomColor(0.4)
                                : "",
                            }}
                          >
                            {post.coverImgFull ? (
                              <Image
                                src={post.coverImgFull}
                                alt=""
                                fill
                                className="rounded-md"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="pb-3 pt-5 text-center text-xl">
                            {post.title}
                          </div>
                          {users && (
                            <div className="text-right text-sm">
                              -
                              {
                                users
                                  .filter(
                                    (user) => user.email == post.author,
                                  )[0]
                                  .data.name.split(" ")[0]
                              }
                            </div>
                          )}
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
                <SwiperSlide></SwiperSlide>
              </Swiper>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
