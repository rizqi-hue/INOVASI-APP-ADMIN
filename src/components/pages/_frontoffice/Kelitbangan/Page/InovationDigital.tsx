import { Blur } from "iconsax-react";
import { useAppSelector } from "../../../../../app/hooks";
import { NcImage } from "../../../../atoms";
import InovationTable from "./InovationTable";

const InovationDigital = () => {
    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );
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
                        <InovationTable />
                    </div>
                </div>
            </div>

        </>
    )
}

export default InovationDigital