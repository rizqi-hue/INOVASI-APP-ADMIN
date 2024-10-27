"use client";

import { EditNoteRounded } from "@mui/icons-material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getsInovation } from "../../Kelitbangan/Services/InovationSlice";
import { Blur } from "iconsax-react";

const LatestInovation = () => {

    const dispatch = useAppDispatch();

    const { list, isError, isFetching } = useAppSelector(
        (state) => state.inovation
    );

    useEffect(() => {
        async function _getsInovation() {
            await dispatch(getsInovation({ filter: { Status: 'Publish' }, pagination: { page: 1, perPage: 5 } }));
        }

        _getsInovation();

        if (isError) {
            // 
        }

    }, [isError]);

    if (isFetching) {
        return (
            <div className="container mt-10 mx-auto">
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
            <div className="container mt-10 mx-auto">

                {/* Section Header */}
                {/* Section Header */}
                <div className="flex justify-start items-center mb-[40px] ">
                    <div className="relative text-primary-500  max-w-[336px] flex flex-row items-center gap-2">
                        <Blur size={25} />
                        <h2 className="text-primary-500 font-bold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px]">
                            Inovasi
                            <div className="h-2 w-40 bg-primary-500 rounded-full" ></div>
                        </h2>
                    </div>
                </div>


                {/* Section Header */}
                <div className="rounded-b-[20px]">
                    <Swiper
                        spaceBetween={5}
                        autoplay={{
                            delay: 5000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                        className="testimonial-slider-three"
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                        }}
                    >
                        {
                            list && list.data.map((value, index) => {
                                return (
                                    <SwiperSlide key={`slider-${index}`}>
                                        <div
                                            className="relative bg-white flex flex-col rounded-[20px] py-[50px] px-[40px] h-[370px] md:h-[420px] transition delay-100 duration-300 ease-in-out"

                                            data-aos="fade-up"
                                            data-aos-delay="100"
                                            data-aos-duration="600"
                                            data-aos-once="true"
                                        >
                                            <div className="bg-[#F2F2F8] p-2 rounded-full max-w-[50%] text-center mb-[15px] text-xs">
                                                {value.Digital}
                                            </div>

                                            <h3 className="text-black text-[20px] md:text-[22px] font-semibold mb-[10px]">
                                                {(value.Name && value.Name.toString().length >= 20) ? value.Name.toString().substring(0, 50) + " ..." : value.Name}
                                            </h3>
                                            <p>
                                                {(value.Result && value.Result.toString().length >= 20) ? value.Result.toString().substring(0, 50) + " ..." : value.Result}
                                            </p>

                                            <div className="absolute bottom-6">
                                                <Link
                                                    to={`/inovation/${value.id}`}
                                                    className=" bg-primary-500 hover:bg-primary-900 rounded-full p-2 px-5 flex flex-row items-center justify-center gap-2 text-white text-[14px] mt-[25px] font-medium transition duration-500 ease-in-out "
                                                >
                                                    Lihat Detail
                                                    <EditNoteRounded
                                                        className="inline-block relative "
                                                    />
                                                </Link>
                                            </div>

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

export default LatestInovation;
