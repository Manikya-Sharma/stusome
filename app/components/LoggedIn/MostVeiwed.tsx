"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { quicksand } from "@/custom-fonts/fonts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import mostViewedPostIds from "@/public/most-viewed.json";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Image from "next/image";
import { randomColor } from "@/lib/utils";
import { Post } from "@/types/post";

export default function MostViewed() {
  const [width, setWidth] = useState<number>(0);
  const [mostViewed, setMostViewed] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setWidth(() => window.innerWidth);
  }, []);
  useEffect(() => {
    async function fetchData() {
      const requests = mostViewedPostIds.map((id) => {
        return fetch(`/api/posts/getPost/${id}`);
      });
      const responses = await Promise.all(requests);
      const data = (await Promise.all(
        responses.map((response) => response.json()),
      )) as Post[];
      setMostViewed(data);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <section className="mb-20 mt-10">
      <h2 className="mb-5 mt-7 text-2xl font-semibold sm:text-5xl">
        Top Posts
      </h2>
      <div className={quicksand.className}>
        <div className="text-lg">
          <Swiper
            allowTouchMove={true}
            slidesPerView={width < 600 ? 1 : 3}
            navigation={true}
            modules={[Navigation]}
            className="w-full [&>*:first-child]:ml-10 [&>*:last-child]:mr-10"
          >
            {loading && (
              <SwiperSlide>
                <Skeleton
                  height={200}
                  width={width - 150}
                  baseColor="#333344"
                  highlightColor="#aaa"
                  duration={0.7}
                />
              </SwiperSlide>
            )}
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
                      <div className="text-right text-sm">-{post.author}</div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
            <SwiperSlide></SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
