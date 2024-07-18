import parse from 'html-react-parser';
import { FC, ImgHTMLAttributes } from "react";
import { NcImage } from "../../../components";
import { ProfileInterface } from "../Services/ProfileSlice";

interface DefinisiContentProps extends ImgHTMLAttributes<HTMLImageElement> {
    containerClassName?: string;
    list?: ProfileInterface[] | undefined
}

const DefinisiContent: FC<DefinisiContentProps> = ({ list }) => {

    return (
        <>
            <div className="container mx-auto ">
                <div
                    className="bg-[#F2F2F8] rounded-[20px] py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"

                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="600"
                    data-aos-once="true"
                >
                    {
                        list && list.map((value, index) => {
                            return (
                                <div key={`selayang-${index}`} className='mb-10'>
                                    <div className="mb-5 grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
                                        <div>
                                            <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2]">
                                                {value.Title}
                                            </h2>
                                            <div className="bg-black rounded-full w-32 h-2 mt-2"></div>
                                        </div>
                                    </div>

                                    {
                                        value.Image && (
                                            <NcImage
                                                className="object-cover w-full h-full rounded-b-2xl md:rounded-2xl"
                                                containerClassName="aspect-[6/3] "
                                                src={`${import.meta.env.VITE_BASEURL}/images/profile/${value.Image}`}
                                                alt="Fun Facts Img"
                                            />
                                        )
                                    }

                                    <div className="mt-5">
                                        <h2 className="text-black text-[18px] md:text-[18px] lg:text-[20px] xl:text-[25px] leading-[1.2]">
                                            {value.Content && (value.Content.substring(0, 4) == "&lt;" ? parse(parse(value.Content).toString()) : parse(value.Content))}
                                        </h2>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default DefinisiContent