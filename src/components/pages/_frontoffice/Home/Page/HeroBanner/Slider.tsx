"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { NcImage } from "../../../../../atoms";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { getsSlider } from "../../Services/Slider";
import { useEffect } from "react";

const Slider = () => {

  const dispatch = useAppDispatch();

  const { list, isError, isFetching } = useAppSelector(
    (state) => state.slider
  );

  useEffect(() => {
    async function _getsSlider() {
      await dispatch(getsSlider({ filter: { Status: 'Publish', Type: "Beranda" } }));
    }

    _getsSlider();

    if (isError) {
      // 
    }

  }, [isError]);

  if (isFetching) {
    return (
      <div className="container lg:max-w-[1710px] mx-auto">
        <div className="bg-[#e2e2de] rounded-b-[20px]">
          {/*  */}
          <div className="rounded-md p-4 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-500 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="lg:container lg:max-w-[1710px] mx-auto">
        <div className=" rounded-b-[20px]">
          <Swiper
            autoplay={{
              delay: 5000,
              pauseOnMouseEnter: true,
              disableOnInteraction: true,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="testimonial-slider-three"
          >
            {
              list && list.data.map((value, index) => {
                return (
                  <SwiperSlide key={`slider-${index}`}>
                    {/* <div className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 "> */}
                    <div
                      data-aos="fade-up"
                      data-aos-delay="500"
                      data-aos-duration="600"
                    >
                      <NcImage
                        className="object-cover w-full h-full rounded-b-2xl"
                        src={`${import.meta.env.VITE_BASEURL}/images/slider/${value.Image}`}
                        alt="Hero Image" />
                    </div>
                    {/* </div> */}
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Slider;
