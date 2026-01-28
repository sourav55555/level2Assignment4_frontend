"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

import slide1 from '@public/homepage/restoria-preview.mp4_20260127_200819.981.jpg'
import slide2 from '@public/homepage/restoria-preview.mp4_20260127_200845.928.jpg'
import slide3 from '@public/homepage/restoria-preview.mp4_20260127_200905.535.jpg'
import slide4 from '@public/homepage/restoria-preview.mp4_20260127_200917.871.jpg'

// import required modules
import { Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';

export default function BgSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className='max-h-[calc(100vh-5rem)]' >
          <Image src={slide1} unoptimized priority className='object-cover h-[calc(100vh-5rem)]' alt='bg slide' />
          {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
        </SwiperSlide>
        <SwiperSlide className='max-h-[calc(100vh-5rem)]'>
          <Image src={slide2} unoptimized priority className='object-cover h-[calc(100vh-5rem)]' alt='bg slide' />
          {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
        </SwiperSlide>
        <SwiperSlide className='max-h-[calc(100vh-5rem)]'>
          <Image src={slide3} unoptimized priority className='object-cover h-[calc(100vh-5rem)]' alt='bg slide' />
          {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
        </SwiperSlide>
        <SwiperSlide className='max-h-[calc(100vh-5rem)]'>
          <Image src={slide4} unoptimized priority className='object-cover h-[calc(100vh-5rem)]' alt='bg slide' />
          {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
        </SwiperSlide>

      </Swiper>
    </>
  );
}
