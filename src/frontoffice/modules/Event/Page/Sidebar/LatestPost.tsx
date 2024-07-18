"use client";

import { Link } from "react-router-dom";
import { NcImage } from "../../../../components";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useEffect } from "react";
import { getsEvent } from "../../Services/EventSlice";
import { toDate } from "../../../../../utils/date";

const LatestPost = () => {

  const dispatch = useAppDispatch();

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
          },
          pagination: {
            page: 1,
            perPage: 8,
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
      <div className="latest-post">
        <h2 className="text-[22px] font-semibold text-black mb-[25px] pb-[10px] border-b border-[#E1E1E1]">
          Terkini
        </h2>

        <div className="space-y-[20px]">
          {
            list && list.data.map((value, index) => {
              return (
                <div key={`LATEST_NEWS_${index}`} className="flex items-center space-x-[15px]">
                  <div className="shrink-0">
                    <Link to={`/news/${value.Slug}`}>
                      <NcImage
                        src={`${import.meta.env.VITE_BASEURL}/images/event/${value.Image}`}
                        className="w-[120px] rounded-[20px]"
                        alt="Post"
                      />
                    </Link>
                  </div>
                  <div>
                    <p className="text-[14px] mb-[10px] leading-none">
                      {value.StartEventDate && toDate(value.StartEventDate)}
                    </p>
                    <h3 className="text-[15px] sm:text-[18px] lg:text-[15px] xl:text-[18px] leading-6 font-semibold text-black">
                      <Link
                        to={`/news/${value.Slug}`}
                        className="hover:text-[#EF4335]"
                      >
                        {value.Title}
                      </Link>
                    </h3>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    </>
  );
};

export default LatestPost;
