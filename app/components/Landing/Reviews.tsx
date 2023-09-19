"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import reviews from "@/public/reviews.json";

export default function Reviews() {
  return (
    <div className="max-w-full overflow-hidden">
      <section className="body-font relative mx-auto text-gray-600">
        <div className="absolute -top-28 left-0 -z-50 h-56 w-[100vw] bg-gradient-to-b from-amber-300 to-white"></div>
        <h2 className="my-5 text-center font-merri text-3xl tracking-tight text-slate-700 md:text-5xl">
          Reviews from our Users
        </h2>
        <Swiper
          centeredSlides={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          allowTouchMove={true}
          slidesPerView={1}
          className="w-full"
        >
          {reviews.map(
            (elem: {
              image: string;
              content: string;
              name: string;
              position: string;
            }) => {
              return (
                <SwiperSlide key={elem.name}>
                  <div className="container mx-auto mb-7">
                    <div className="mx-auto mb-6 p-4 lg:mb-0 lg:w-1/3">
                      <div className="h-full text-center">
                        <Image
                          alt=""
                          className="mb-8 inline-block h-20 w-20 rounded-full border-2 border-gray-200 bg-gray-100 object-cover object-center"
                          src={elem.image}
                          width={300}
                          height={300}
                        />
                        <p className="leading-relaxed md:text-lg">
                          {elem.content}
                        </p>
                        <span className="mb-4 mt-6 inline-block h-1 w-10 rounded bg-red-500"></span>
                        <h2 className="title-font md:text-md text-sm font-medium tracking-wider text-gray-900">
                          {elem.name.toUpperCase()}
                        </h2>
                        <p className="text-gray-500">{elem.position}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            },
          )}
        </Swiper>
      </section>
    </div>
  );
}
