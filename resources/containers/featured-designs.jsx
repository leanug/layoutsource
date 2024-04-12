import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'

import fallbackImg from '@/assets/images/default.png'

export function FeaturedDesigns({ featuredDesigns }) {
  return (
    <Swiper
      spaceBetween={40}
      slidesPerView={1}
      keyboard={true}
      freeMode={true}
      autoPlay={true}
      loop={true}
      breakpoints={{
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3,
        },
        // when window width is >= 1280px
        1280: {
          slidesPerView: 4,
        },
      }}
    >
      {featuredDesigns.map((item) => (
        <SwiperSlide key={item.id}>
          {item?.cover ? (
            <Image
              src={
                item?.cover && item.cover?.url ? item.cover.url : fallbackImg
              }
              alt={item.title}
              className="w-full max-w-xl h-full max-h-80 object-cover origin-top rounded-xl"
              width="0"
              height="0"
              sizes="100%"
              priority={true}
            />
          ) : null}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
