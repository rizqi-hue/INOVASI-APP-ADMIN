"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { NcImage } from "../../../../components";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
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
      <div className="container lg:max-w-[1710px] mx-auto">
        {/* Section Header */}
        {/* pt-[50px] md:pt-[80px] lg:pt-[80px] xl:pt-[107px] pb-[50px] md:pb-[50px] lg:pb-[80px] xl:pb-[109px] pl-[20px] md:pl-[58px] lg:pl-[30px] xl:pl-[50px] 2xl:pl-[110px] pr-[20px] md:pr-[58px] lg:pr-[30px] xl:pr-[50px] 2xl:pr-[58px] */}
        <div className="bg-[#e2e2de] rounded-b-[20px]">
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
                    <div className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 ">
                      {/* Hero Image */}
                      <div
                        className=" md:mt-[40px] lg:mt-[0]"
                        data-aos="fade-up"
                        data-aos-delay="500"
                        data-aos-duration="600"
                      >
                        <NcImage
                          className="object-cover w-full h-full rounded-b-2xl"
                          // containerClassName="aspect-[6/2] md:aspect-[6/2]"
                          src={`${import.meta.env.VITE_BASEURL}/images/slider/${value.Image}`}
                          alt="Hero Image" />
                      </div>

                      {/* <div className="custom-black-bg-opacity-85 bg-opacity-85 rounded-b-[20px] absolute left-0 right-0 bottom-0 flex justify-between items-center px-[25px] py-[20px]">
                        <div className="">
                          <h1
                            className="text-white text-[20px] md:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[35px] leading-[30px] md:leading-[35px] lg:leading-[40px] xl:leading-[40px] 2xl:leading-[40px] font-semibold mb-[20px] sm:mb-[20px] max-w-[700px] "

                            data-aos="fade-up"
                            data-aos-delay="100"
                            data-aos-duration="600"
                          >
                            {value.Title}
                          </h1>

                          <p
                            className="text-white  text-[16px] md:text-[20px] lg:text-[16px] xl:text-[20px] font-medium mb-[10px] md:mb-[15px] lg:mb-[20px] xl:mb-[20px] leading-[28px]"

                            data-aos="fade-up"
                            data-aos-delay="200"
                            data-aos-duration="600"
                          >
                            {value.Content}
                          </p>
                        </div>
                      </div> */}
                    </div>
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
