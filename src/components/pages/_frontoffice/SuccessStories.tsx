"use client";


import { ArrowRight2 } from "iconsax-react";
import { Link } from "react-router-dom";
import { NcImage } from "../../../frontoffice/components";
import { useAppDispatch, useAppSelector } from "../../../frontoffice/app/hooks";
import { useEffect } from "react";
import { getsEvent } from "./Event/Services/EventSlice";

const SuccessStories = () => {

  const dispatch = useAppDispatch();

  const { list: ref } = useAppSelector(
    (state) => state.referensi
  );

  const { list, isError } = useAppSelector(
    (state) => state.event
  );

  useEffect(() => {
    async function _getsInformation() {
      await dispatch(getsEvent({
        url: "/news",
        params: {
          filter: {
            Type: "NEWS",
            Status: "Publish"
          },
          pagination: {
            page: 1,
            perPage: 4,
          }
        }
      }));
    }

    _getsInformation();

    if (isError) {
      // 
    }

  }, [isError]);


  return (
    <>
      <div className="py-[50px] md:py-[60px] lg:py-[80px] xl:py-[100px]">
        <div className="container mx-auto">
          {/* Section Header */}
          <div
            className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 mb-[30px] md:mb-[40px] lg:mb-[50px]"

            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-once="true"
          >
            {
              ref && ref.data.map((value, index) => {
                if (value.Code == "INFORMATION_NEWS") {
                  return (
                    <div key={`header-news-${index}`} className="max-w-[470px">
                      {/* <h4 className="text-black text-[15px] md:text-[17px] font-medium mb-[15px]">
                        {value.Content}
                      </h4> */}
                      <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2]">
                        {value.Title}
                      </h2>
                    </div>

                  )
                }
              })
            }


            <div className="md:text-end ">
              <Link
                to="/news"
                className="bg-black text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[38px] transition duration-500 ease-in-out hover:bg-[#EF4335]"
              >
                Lihat semua
                <ArrowRight2
                  className="inline-block relative -top-[2px]"
                  size={20}
                />
              </Link>
            </div>
          </div>

          {/* Card */}
          <div className="grid gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {/* Card  */}

            {
              list &&
              list.data.map((value, index) => {
                return (
                  <div
                    key={`success-story-${index}`}
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="600"
                    data-aos-once="true"
                  >
                    <Link to={`/news/${value.Slug}`}>
                      <NcImage
                        src={`${import.meta.env.VITE_BASEURL}/images/event/${value.Image}`}
                        alt="Success Stories"
                        containerClassName="aspect-[6/4]"
                      />
                    </Link>

                    <div className="flex justify-between items-center mt-[20px]">
                      <div>
                        <h3 className="text-black text-[18px] md:text-[22px] font-semibold">
                          {value.Title?.substring(0, 20)}
                        </h3>
                      </div>

                      <Link
                        to={`/news/${value.Slug}`}
                        className="bg-[#232323] w-[50px] h-[50px] leading-[48px] rounded-full text-center shrink-0 hover:bg-[#000]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="31"
                          height="31"
                          viewBox="0 0 31 31"
                          fill="none"
                          className="inline-block"
                        >
                          <path
                            d="M9.04167 23.25C8.65417 23.25 8.39583 23.1208 8.1375 22.8625C7.62083 22.3458 7.62083 21.5708 8.1375 21.0542L21.0542 8.1375C21.5708 7.62083 22.3458 7.62083 22.8625 8.1375C23.3792 8.65417 23.3792 9.42917 22.8625 9.94583L9.94583 22.8625C9.6875 23.1208 9.42917 23.25 9.04167 23.25Z"
                            fill="#EF4335"
                          />
                          <path
                            d="M21.9583 21.9583C21.1833 21.9583 20.6666 21.4417 20.6666 20.6667V10.3333H10.3333C9.55829 10.3333 9.04163 9.81667 9.04163 9.04167C9.04163 8.26667 9.55829 7.75 10.3333 7.75H21.9583C22.7333 7.75 23.25 8.26667 23.25 9.04167V20.6667C23.25 21.4417 22.7333 21.9583 21.9583 21.9583Z"
                            fill="#EF4335"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessStories;
