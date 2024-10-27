"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Bpjph from "../../../assets/images/bpjph.png"
import Halal from "../../../assets/images/halal_purple.png"
import Asean from "../../../assets/images/asean.png"
import Blu from "../../../assets/images/blu.png"
import Pusaka from "../../../assets/images/pusaka.png"

import { NcImage } from "../../../../atoms";

const BrandsSlider = () => {
    return (
        <>
            <div className="flex justify-center items-center mt-5">
                <div className="container">
                    <Swiper
                        autoplay={{
                            delay: 5000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: true,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                            },
                            576: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1200: {
                                slidesPerView: 5,
                            },
                        }}
                        modules={[Autoplay]}
                        className="brands-slider"
                    >
                        <SwiperSlide className="text-center">
                            <NcImage src={Bpjph} alt="brand" className="mx-auto object-cover h-14 rounded-2xl" />
                        </SwiperSlide>

                        <SwiperSlide className="text-center ">
                            <NcImage src={Halal} alt="brand" className="mx-auto object-cover h-14 rounded-2xl" />
                        </SwiperSlide>

                        <SwiperSlide className="text-center ">
                            <NcImage src={Pusaka} alt="brand" className="mx-auto object-cover h-14 rounded-2xl" />
                        </SwiperSlide>

                        <SwiperSlide className="text-center ">
                            <NcImage src={Blu} alt="brand" className="mx-auto object-cover h-14 rounded-2xl" />
                        </SwiperSlide>

                        <SwiperSlide className="text-center flex justify-end items-center">
                            <NcImage src={Asean} alt="brand" className="mx-auto object-cover h-14 rounded-2xl" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default BrandsSlider;
