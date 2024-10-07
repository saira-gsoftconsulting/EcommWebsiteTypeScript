import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import * as React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { IconButton } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import gallery9 from "../../assests/svg/gallery11.svg";
import gallery11 from "../../assests/svg/gallery11.svg";
import gallery2 from "../../assests/svg/gallery11.svg";
import gallery5 from "../../assests/svg/gallery11.svg";

const CustomNavigation: React.FC = () => {
  const swiper = useSwiper();
  return (
    <>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slidePrev()}
        className="text-white !absolute left-12 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowLeft className="h-7 w-7 -translate-x-0.5 stroke-2 text-white" />
      </IconButton>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slideNext()}
        className="text-white !absolute right-12 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowRight className="h-7 w-7 translate-x-px stroke-2 text-white" />
      </IconButton>
    </>
  );
};

const customPagination = (
  index: number,
  className: string
): string => {
  return `<span class="${className} w-4 h-4 [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:[background:rgb(var(--color-background))] !opacity-50 ![background:rgb(var(--color-background))]"></span>`;
};

export const CarouselDemo: React.FC = () => {
  const images: string[] = [gallery9, gallery11, gallery2, gallery5];

  return (
    <div className="max-w-[686px]">
      <Swiper
        pagination={{
          enabled: true,
          clickable: true,
          dynamicBullets: true,
          renderBullet: customPagination,
        }}
        modules={[Navigation, Pagination]}
        className="relative [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="select-none">
            <img
              src={img}
              alt={`image-${index}`}
              className="w-[900px] h-[450px]"
            />
          </SwiperSlide>
        ))}
        <CustomNavigation />
      </Swiper>
    </div>
  );
};
