import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../../app/hooks";
import { NcImage } from "../../../../atoms";
import { PresentionChart, Refresh2 } from "iconsax-react";
import RisetCard from "./RisetCard";

const RisetBahanGunaan = () => {
    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    return (
        <>
            <div className="gradient-bg">
                <div className="container mx-auto">
                    {
                        ref && ref.data.map((value, index) => {
                            if (value.Code == "INFORMATION_REGULATION") {
                                return (
                                    <div
                                        key={`INFORMATION_REGULATION_${index}`}
                                        className={`relative bg-white rounded-b-[20px] ${!value.Image && "py-[50px] md:py-[50px] lg:py-[50px] xl:py-[50px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}
                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-duration="600"
                                        data-aos-once="true"
                                    >
                                        {
                                            value.Image ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 items-center">
                                                    <div className="flex flex-row items-center gap-2 py-[20px] px-[40px]">
                                                        <PresentionChart size={25} />
                                                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] ">
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
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-row items-center gap-[25px]">
                                                    <PresentionChart size={40} />
                                                    <div>
                                                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] max-w-[480px]">
                                                            {value.Title}
                                                        </h2>
                                                        <p className="text-xl">
                                                            Bahan Gunaan
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

            <div className="mt-10">
                <RisetCard />
            </div>
        </>
    )
}

export default RisetBahanGunaan