import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { NcImage } from "../../../../atoms";
import { getInovation } from "../Services/InovationSlice";
import { Blur } from "iconsax-react";

const InovationDetail = () => {

    const { id } = useParams();

    const dispatch = useAppDispatch();

    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    const { data, isError } = useAppSelector(
        (state) => state.inovation
    );

    useEffect(() => {
        async function _getsInovationDetail() {
            await dispatch(getInovation({
                filter: {
                    id: id,
                }
            }));
        }

        _getsInovationDetail();

        if (isError) {
            // 
        }

    }, [isError, id]);

    return (
        <>
            <div className="gradient-bg">
                <div className="container mx-auto pb-10">
                    {
                        ref && ref.data.map((value, index) => {
                            if (value.Code == "INOVATION_RESEARCH") {
                                return (
                                    <div
                                        key={`INOVATION_RESEARCH_${index}`}
                                        // className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}
                                        className={`bg-[#fff] rounded-b-[20px] ${!value.Image && "py-[50px] md:py-[50px] lg:py-[50px] xl:py-[50px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}

                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-duration="600"
                                        data-aos-once="true"
                                    >
                                        {
                                            value.Image ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 items-center">
                                                    <div className="flex flex-row items-center gap-2 py-[20px] px-[40px]">
                                                        <Blur size={25} />
                                                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] ">
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
                                                <div className="flex flex-row items-center gap-[25px]">
                                                    <Blur size={40} />
                                                    <div>
                                                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] max-w-[480px]">
                                                            {value.Title}
                                                        </h2>
                                                        <p className="text-xl">
                                                            Platform Digital
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

                <div className="container mx-auto">
                    <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        <div className="w-full">
                            <div className="bg-white rounded-2xl py-4 md:py-7 px-4 md:px-8 xl:px-10">
                                <h1 className="font-semibold text-black text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px]">
                                    Judul
                                </h1>
                                <p>
                                    {data.Name}
                                </p>
                                <div className="h-5" ></div>
                                <h1 className="font-semibold text-black text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px]">
                                    Rancang Bangun
                                </h1>
                                <p>
                                    {data.Design}
                                </p>
                                <div className="h-5" ></div>
                                <h1 className="font-semibold text-black text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px]">
                                    Tujuan
                                </h1>
                                <p>
                                    {data.Objective}
                                </p>
                                <div className="h-5" ></div>
                                <h1 className="font-semibold text-black text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px]">
                                    Maanfaat yang diproleh
                                </h1>
                                <p>
                                    {data.Benefit}
                                </p>
                                <div className="h-5" ></div>
                                <h1 className="font-semibold text-black text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px]">
                                    Hasil Inovasi
                                </h1>
                                <p>
                                    {data.Result}
                                </p>
                                {/* <hr />
                                <div className="h-3" ></div>
                                <a
                                    href={`${import.meta.env.VITE_BASEURL}/images/research/${data.File}`}
                                >
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M12.5 5.83339L7.08333 11.2501C6.75181 11.5816 6.56556 12.0312 6.56556 12.5001C6.56556 12.9689 6.75181 13.4185 7.08333 13.7501C7.41485 14.0816 7.86449 14.2678 8.33333 14.2678C8.80217 14.2678 9.25181 14.0816 9.58333 13.7501L15 8.33339C15.663 7.67034 16.0355 6.77107 16.0355 5.83339C16.0355 4.8957 15.663 3.99643 15 3.33339C14.337 2.67034 13.4377 2.29785 12.5 2.29785C11.5623 2.29785 10.663 2.67034 10 3.33339L4.58333 8.75005C3.58877 9.74461 3.03003 11.0935 3.03003 12.5001C3.03003 13.9066 3.58877 15.2555 4.58333 16.2501C5.57789 17.2446 6.92681 17.8034 8.33333 17.8034C9.73985 17.8034 11.0888 17.2446 12.0833 16.2501L17.5 10.8334"
                                                stroke="#52525B"
                                                stroke-width="1.25"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></path>
                                        </svg>
                                        <p className="text-sm leading-none text-gray-600 ml-2">Unduh File</p>
                                    </div>
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default InovationDetail