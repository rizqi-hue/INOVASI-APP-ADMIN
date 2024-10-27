import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getGalleryVideo } from "../Service/GalleryVideoSlice";
import { useParams } from "react-router-dom";

const VideoDetail = () => {
    const { id } = useParams();

    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    const dispatch = useAppDispatch();

    const { data, isError } = useAppSelector(
        (state) => state.video
    );

    useEffect(() => {
        async function _getVideo() {
            await dispatch(getGalleryVideo({ filter: { id: id } }));
        }

        _getVideo();

        if (isError) {
            // 
        }

    }, [isError, id]);

    const getId = (url: string) => {
        const id = url && url.toString().split('v=')[1]
        return id
    }

    return (
        <>
            <div className="gradient-bg">
                <div className="container mx-auto pt-10">
                    <div
                        className="bg-[#d8d8d8] rounded-[20px] py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"

                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        {
                            ref && ref.data.map((value, index) => {
                                if (value.Code == "GALLERY_VIDEO") {
                                    return (
                                        <div key={`header-video-${index}`} className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
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
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="mt-20 container mx-auto">
                <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="600"
                    data-aos-once="true"
                >
                    <div className='aspect-video' >
                        <iframe
                            className='h-full w-full rounded-lg'
                            src={`https://www.youtube.com/embed/${getId(data.Link)}`}
                            // src={data.Link + "&output=embed"}
                            width="100%"
                            title={data.Title}
                            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        >
                        </iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoDetail