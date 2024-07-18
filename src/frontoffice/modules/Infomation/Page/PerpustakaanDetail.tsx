import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { NcImage } from "../../../components";
import { getPerpustakaan } from "../Services/PerpustakaanSlice";

const PerpustakaanDetail = () => {
 
    const { id } = useParams();

    const dispatch = useAppDispatch();

     const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    const { data, isError } = useAppSelector(
        (state) => state.perpustakaan
    );

    useEffect(() => {
        async function _getsInovationDetail() {
            await dispatch(getPerpustakaan({
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

    console.log(data)

    return (
        <>
            <div className="gradient-bg">
                <div className="container mx-auto pt-10 ">
                    {
                        ref && ref.data.map((value, index) => {
                            if (value.Code == "PERPUSTAKAAN") {
                                return (
                                    <div
                                        key={`PERPUSTAKAAN_${index}`}
                                        // className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}
                                        className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[50px] md:py-[50px] lg:py-[50px] xl:py-[50px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}

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
                                                                src={`${import.meta.env.VITE_BASEURL}/images/perpustakaan/${value.Image}`}
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

            <div className="mt-20">
                {/* <PerpustakaanCard /> */}

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
                                    {data.Title}
                                </p>
                                <div className="h-3" ></div>
                                <h1 className="font-semibold text-black text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px]">
                                    Deskripsi
                                </h1>
                                <p>
                                    {data.Content}
                                </p>
                                <div className="h-3" ></div>
                            </div>
                        </div>
                        <div>
                            <iframe 
                              src={`${import.meta.env.VITE_BASEURL}/images/perpustakaan/${data.File}`}
                            ></iframe>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default PerpustakaanDetail