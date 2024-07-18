import { useAppSelector } from "../../../app/hooks";
import { NcImage } from "../../../components";
import RegulationCard from "./RegulationCard";

const Regulation = () => {
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
                                        // className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}
                                        className={`relative bg-[#ededed] rounded-b-[20px] ${!value.Image && "py-[50px] md:py-[50px] lg:py-[50px] xl:py-[50px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}

                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-duration="600"
                                        data-aos-once="true"
                                    >
                                        {/* <div className="absolute inset-0 bg-[length:80px_100px] bg-center bg-custom-motif opacity-5 rounded-b-[20px]"></div> */}
                                        {
                                            value.Image ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 items-center">
                                                    <div className="py-[20px] px-[40px]">
                                                        <h2 className="text-black text-center font-bold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] mb-[15px] md:mb-[30px]">
                                                            {value.Title}
                                                        </h2>
                                                        <p className="font-xl">
                                                            {value.Content}
                                                        </p>
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
                                                        <p className="font-xl">
                                                            {value.Content}
                                                        </p>
                                                    </div>

                                                    <div className="lg:text-end lg:max-w-[412px] lg:ml-auto">
                                                        <p className="mb-[20px]">
                                                            {/* {value.Content} */}
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
                <RegulationCard />
            </div>
        </>
    )
}

export default Regulation