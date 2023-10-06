"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { quicksand } from "@/custom-fonts/fonts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import popularDoubts from "@/public/popular-doubts.json";

export default function PopularDoubts() {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    setWidth(() => window.innerWidth);
  }, []);
  return (
    <section className="my-20">
      <h2 className="mb-5 mt-7 text-2xl font-semibold sm:text-5xl">
        Common Doubts
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
            {popularDoubts.map((doubt) => {
              return (
                <SwiperSlide key={doubt.id}>
                  <Link
                    href={`/doubts/${doubt.id}`}
                    className="mx-3 block h-[30vh] rounded-md border border-rose-300 px-2 py-2 text-center transition-all duration-150 hover:bg-rose-300 hover:text-pink-800 dark:border-rose-300 dark:bg-zinc-700 dark:text-rose-100 dark:hover:bg-rose-200 dark:hover:text-rose-950"
                  >
                    <p>{doubt.title}</p>
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
