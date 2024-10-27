"use client";

import { ArrowRight2, Image } from "iconsax-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getsGalleryPhoto } from "../../Gallery/Service/GalleryImageSlice";

const PhotoCard = () => {

  const dispatch = useAppDispatch();

  const { list: ref } = useAppSelector(
    (state) => state.referensi
  );

  const { list, isError, isFetching } = useAppSelector(
    (state) => state.photo
  );

  useEffect(() => {
    async function _getsPhoto() {
      await dispatch(getsGalleryPhoto({ pagination: { page: 1, perPage: 4 } }));
    }

    _getsPhoto();

    if (isError) {
      // 
    }

  }, [isError]);

  return (
    <>
      {/* Section Header */}
      <div
        className=" grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 items-center mb-[40px] md:mb-[60px]"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="600"
        data-aos-once="true"
      >

        {/* Section Header */}

        {
          ref && ref.data.map((value, index) => {
            if (value.Code == "GALLERY_PHOTO") {
              return (
                <div key={`header-photo-home-${index}`} className="relative text-primary-500  max-w-[336px] flex flex-row items-center gap-2">
                  <Image size={25} />
                  <h2 className="text-primary-500 font-bold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px]">
                    {value.Title}
                    <div className="h-2 w-40 bg-primary-500 rounded-full" ></div>
                  </h2>
                </div>
              )
            }
          })
        }

        <div className="md:text-end">
          {/* hover:bg-[#EF4335] */}
          <Link
            to="/photo"
            className="bg-primary-500 hover:bg-primary-700 text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[38px] transition duration-500 ease-in-out "
          >
            Lihat semua
            <ArrowRight2
              className="inline-block relative -top-[2px]"
              size={20}
            />
          </Link>
        </div>
      </div>
      <div className="grid gap-[25px] grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {
          !isFetching ? list && list.data.map((value, index) => {
            return (
              <Link
                key={`photo-${index}`}
                to="#"
                className="relative block h-[290px] rounded-[20px] p-[30px] xl:p-[0px] bg-cover bg-center w-full"
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_BASEURL}/images/galleryimage/${value.Image})`,
                }}
              >
                <div className="bg-primary-500 rounded-[20px] absolute left-0 right-0 bottom-0 flex justify-between items-center px-[25px] py-[20px]">
                  <div>
                    <h3 className="text-white text-[16px] font-medium">
                      {value.Title?.substring(0, 30)}
                    </h3>
                  </div>
                </div>
              </Link>
            )
          })
            :
            [1, 2, 3, 4].map((value) => {
              return (
                <div key={`skeleton-loading-${value}`} className="container lg:max-w-[1710px] mx-auto">
                  <div className="bg-gray-100 rounded-[20px]">
                    {/*  */}
                    <div className="rounded-md p-4 w-full mx-auto">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-32 bg-gray-300 rounded"></div>
                          <div className="h-2 bg-gray-300 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                              <div className="h-2 bg-gray-300 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                  </div>
                </div>
              )
            })
        }
      </div>
    </>
  );
};

export default PhotoCard;
