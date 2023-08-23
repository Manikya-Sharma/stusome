"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function About() {
  return (
    <div className="text-center w-[50%] mx-auto text-lg sm:text-2xl my-5 font-fancy">
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}
        loop={true}
      >
        <SwiperSlide>
          <div className="bg-gradient-to-br from-[rgba(52,211,253,0.6)] to-[rgba(50,70,100,0.8)] p-5 rounded-md text-[#fff] drop-shadow-md cursor-default">
            Tired of unsolved doubts?
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-gradient-to-br from-[rgba(52,211,253,0.6)] to-[rgba(50,70,100,0.8)] p-5 rounded-md text-[#fff] drop-shadow-md cursor-default">
            Want to have guidance from seniors?
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-gradient-to-br from-[rgba(52,211,253,0.6)] to-[rgba(50,70,100,0.8)] p-5 rounded-md text-[#fff] drop-shadow-md cursor-default">
            Want to expand your network?
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-gradient-to-br from-[rgba(52,211,253,0.6)] to-[rgba(50,70,100,0.8)] p-5 rounded-md text-[#fff] drop-shadow-md cursor-default">
            Need a social media without distractions?
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
