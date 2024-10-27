"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { NcImage } from "../../../../atoms";
import { getsInformation } from "../Services/InformationSlice";
import { ArrowRight2 } from "iconsax-react";


const SopCard = () => {

  const dispatch = useAppDispatch();

  const { list, isError, isFetching } = useAppSelector(
    (state) => state.information
  );

  useEffect(() => {
    async function _getsInformation() {
      await dispatch(getsInformation({
        url: "/sop",
        params: { filter: { Type: "SOP" } }
      }));
    }

    _getsInformation();

    if (isError) {
      // 
    }

  }, [isError]);

  if (isFetching) {
    return (
      <div className="container lg:max-w-[1710px] mx-auto">
        <div className="bg-[#e2e2de] rounded-[20px]">
          {/*  */}
          <div className="rounded-md p-4 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-500 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-500 rounded"></div>
                  <div className="h-6 w-20 bg-slate-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="pb-[50px] md:pb-[60px] lg:pb-[80px] xl:pb-[100px]">
        <div className="container mx-auto">
          {
            list && list.data.map((value, index) => {
              return (
                <>
                  <NcImage
                    key={`sop-${index}`}
                    src={`${import.meta.env.VITE_BASEURL}/images/information/${value.Image}`} />
                  {
                    value.File && (
                      <a
                        href={`${import.meta.env.VITE_BASEURL}/images/information/${value.File}`}
                        className="bg-black mt-5 text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[38px] transition duration-500 ease-in-out hover:bg-[#EF4335]"
                      >
                        Unduh File
                        <ArrowRight2
                          className="inline-block relative -top-[2px]"
                          size={20}
                        />
                      </a>
                    )
                  }

                  <h1 className="mt-5 mb-10 font-semibold text-black text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-[32px] md:leading-[40px] lg:leading-[48px]">
                    {value.Title}
                  </h1>
                  <p>
                    {value.Content}
                  </p>
                </>
              )
            })
          }


        </div>
      </div>
    </>
  );
};

export default SopCard;
