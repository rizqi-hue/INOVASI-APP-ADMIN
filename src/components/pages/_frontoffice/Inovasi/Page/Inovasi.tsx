import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
// import HeroBanner from "./HeroBanner";
// import Partner from "./Partner";
import { getsProfile } from "../Services/ProfileSlice";
import DefinisiContent from "./DefinisiContent";
import { NcImage } from "../../../../atoms";

export default function Inovation() {
    const dispatch = useAppDispatch();

    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    const { list, isError, isFetching } = useAppSelector(
        (state) => state.profile
    );

    useEffect(() => {
        async function _getsProfile() {
            await dispatch(getsProfile({ filter: { Type: "DEFINISI" } }));
        }

        _getsProfile();

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
            <div className="gradient-bg">
                <div className="container mx-auto pt-10 pb-10">
                    {
                        ref && ref.data.map((value, index) => {
                            if (value.Code == "PROFILE_DEFINITION") {
                                return (
                                    <div
                                        key={`PROFILE_DEFINITION_${index}`}
                                        // className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}
                                        className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[40px] md:py-[50px] lg:py-[50px] xl:py-[50px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}

                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-duration="600"
                                        data-aos-once="true"
                                    >
                                        {
                                            value.Image ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 items-center">
                                                    <div className="py-[20px] px-[40px]">
                                                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] mb-[15px] md:mb-[30px]">
                                                            {value.Title}
                                                        </h2>
                                                    </div>

                                                    <div className="lg:col-span-2 xl:pl-[30px]">
                                                        <div className="relative">
                                                            <NcImage
                                                                containerClassName="aspect-[7/3] "
                                                                src={`${import.meta.env.VITE_BASEURL}/images/umum/${value.Image}`}
                                                                alt="Fun Facts Img"
                                                            // className="rounded-r-[20px]"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                                                    <div>
                                                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] max-w-[480px]">
                                                            {value.Title}
                                                        </h2>
                                                    </div>

                                                    <div className="lg:text-end lg:max-w-[412px] lg:ml-auto">
                                                        <p className="mb-[20px]">
                                                            {value.Content}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        })
                    }

                </div>
            </div>
            <DefinisiContent list={list.data} />
            {/* <HeroBanner list={list.data} />
            <Partner /> */}
        </>
    )
}
