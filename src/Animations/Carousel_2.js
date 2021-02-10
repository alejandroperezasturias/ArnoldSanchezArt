import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import boxingGloves from '../images/carousel/gloves.svg';
import apple from '../images/carousel/apple.svg';
import eye from '../images/carousel/eye.svg';
import skull from '../images/carousel/skull.svg';
import hand from '../images/carousel/hand.svg';

SwiperCore.use([ Pagination]);

function Carousel_2() {


  const pictures = [boxingGloves, apple, eye,skull,hand ]
  const slides = [];
  pictures.forEach((x, i)=> {
    slides.push(
      <SwiperSlide key={`slide-${i}`} >
        <img
          src={x}
          style={{ listStyle: 'none' }}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>
    );
  })


  return (
    <div className="swiper-container">
      <Swiper
        id="main"
        tag="section"
        direction='vertical'
        pagination
        spaceBetween={1.5}
        slidesPerView={1}
        onInit={(swiper) => console.log('Swiper initialized!', swiper)}
        onSlideChange={(swiper) => {
          console.log('Slide index changed to: ', swiper.activeIndex);
        }}
        onReachEnd={() => console.log('Swiper end reached')}
      >
        {slides}
      </Swiper>

    </div>
  );
}

export default Carousel_2;

