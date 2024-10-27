import parse from 'html-react-parser'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import { getsProfile } from "../Services/ProfileSlice"
import { NcImage } from '../../../../atoms'

const OrganizationalSructure = () => {
    const dispatch = useAppDispatch();

    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    const { list, isError, isFetching } = useAppSelector(
        (state) => state.profile
    );

    useEffect(() => {
        async function _getsProfile() {
            await dispatch(getsProfile({ filter: { Type: "STRUKTURORGANISASI" } }));
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
                <div className="container mx-auto pt-10">
                    {
                        ref && ref.data.map((value, index) => {
                            if (value.Code == "PROFILE_ORGANIZATIONAL_STRUCTURE") {
                                return (
                                    <div
                                        key={`PROFILE_${index}`}
                                        className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[50px] md:py-[50px] lg:py-[50px] xl:py-[50px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}
                                        // className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}

                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-duration="600"
                                        data-aos-once="true"
                                    >
                                        {
                                            value.Image ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 items-center">
                                                    <div className="py-[20px] px-[40px]">
                                                        <h2 className="text-black text-center font-bold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] mb-[15px] md:mb-[30px]">
                                                            {value.Title}
                                                        </h2>
                                                    </div>

                                                    <div className="lg:col-span-2 xl:pl-[30px]">
                                                        <div className="relative">
                                                            <NcImage
                                                                className="object-cover w-full h-full rounded-b-2xl md:rounded-r-2xl"
                                                                containerClassName="aspect-[12/3] "
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

            <div className="container mx-auto pt-10">
                <div
                    className="bg-[#F2F2F8] rounded-[20px] py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"
                    // className="bg-[#F2F2F8] rounded-[20px] py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="600"
                    data-aos-once="true"
                >
                    {
                        list && list.data.map(value => {
                            return (
                                <>
                                    <div className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                                        <div>
                                            <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] max-w-[480px]">
                                                {value.Title}
                                            </h2>
                                        </div>

                                        <div className="lg:text-end lg:max-w-[412px] lg:ml-auto">
                                            <p className="mb-[20px]">
                                                {value.Content && (value.Content.substring(0, 4) == "&lt;" ? parse(parse(value.Content).toString()) : parse(value.Content))}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <NcImage
                                            src={`${import.meta.env.VITE_BASEURL}/images/profile/${value.Image}`}
                                        />
                                    </div>
                                </>
                            )
                        })
                    }


                </div>
            </div>
        </>
    )
}

export default OrganizationalSructure
