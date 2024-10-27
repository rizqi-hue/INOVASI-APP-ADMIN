import { Image } from "iconsax-react";
import { useAppSelector } from "../../../../../app/hooks";
import { NcImage } from "../../../../atoms";
import PhotoCard from "./PhotoCard";

const Photo = () => {

    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    return (
        <>
            <div className="gradient-bg">
                <div className="container mx-auto">
                    {
                        ref && ref.data.map((value, index) => {
                            if (value.Code == "GALLERY_PHOTO") {
                                return (
                                    <div
                                        key={`GALLERY_PHOTO_${index}`}
                                        className={`bg-white rounded-b-[20px] ${!value.Image && "py-[40px] md:py-[50px] lg:py-[50px] xl:py-[50px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}
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
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-row items-center gap-[25px]">
                                                    <Image size={40} />
                                                    <div>
                                                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] max-w-[480px]">
                                                            {value.Title}
                                                        </h2>
                                                        <p className="text-xl">
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

            <div className="mt-20 container mx-auto">
                <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="600"
                    data-aos-once="true"
                >
                    <PhotoCard />
                </div>
            </div>
        </>
    )
}

export default Photo