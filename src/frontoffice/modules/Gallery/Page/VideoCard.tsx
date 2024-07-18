"use client";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { getsGalleryVideo } from "../Service/GalleryVideoSlice";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Refresh2, SearchNormal1 } from "iconsax-react";
import Pagination from "../../Profile/Page/Pagination";
type SearchForm = {
  q: string;
};
const VideoCard = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(12)

  const dispatch = useAppDispatch();

  const { list, isError, isFetching } = useAppSelector(
    (state) => state.video
  );

  const validationSchema = Yup.object().shape({
    q: Yup.string().required("Tidak boleh kosong"),
  });

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    async function _getsVideo() {
      await dispatch(getsGalleryVideo({
        filter: {
          Status: "Publish",
        },
        pagination: {
          page: page,
          perPage: perPage,
        }
      }));
    }

    _getsVideo();

    if (isError) {
      // 
    }

  }, [isError, page]);

  const getThumbnail = function (url: string, size: string) {

    if (url == null) {
      return '';
    }

    size = (size == null) ? 'big' : size;
    const results = url.match('[\\?&]v=([^&#]*)');
    const video = (results == null) ? url : results[1];

    if (size == 'small') {
      return `http://img.youtube.com/vi/${video}/2.jpg`;
    }

    return `http://img.youtube.com/vi/${video}/0.jpg`;
  };

  const doSearch = (data: SearchForm) => {
    dispatch(getsGalleryVideo({
      filter: {
        Status: "Publish",
        Title: data.q
      },
      pagination: {
        page: page,
        perPage: perPage,
      }
    }));
  }

  const doReset = () => {
    dispatch(getsGalleryVideo({
      filter: {
        Status: "Publish",
      },
      pagination: {
        page: page,
        perPage: perPage,
      }
    }));
  }

  return (
    <>
      <div className='w-full flex justify-end'>
        <form
          onSubmit={handleSubmit(doSearch)}
          className="search-form w-full xl:w-[180px] 2xl:w-[330px] mb-5"
        >
          <label className="relative block">
            <input
              className="block bg-[#F2F2F8] w-full rounded-full py-[14px] px-[30px] placeholder:text-[#4C4C4C] focus:outline-none"
              placeholder="Pencarian"
              type="text"
              id="q"
              {...register("q")}
            />

            <button
              type="submit"
              className="absolute bg-red-200 top-2 bottom-2 rounded-l-full px-3 text-red-500 hover:bg-red-300  inset-y-0 right-[60px] flex items-center"
            >
              <SearchNormal1 className='mr-1' />
              <span>Cari</span>
            </button>
            <button
              onClick={doReset}
              type="button"
              className="absolute bg-gray-200 top-2 bottom-2 rounded-r-full px-3 text-gray-500 hover:bg-gray-300  inset-y-0 right-[10px] flex items-center"
            >
              <Refresh2 className='mr-1' />
            </button>
          </label>
          <span className='text-red-500 ml-8'>
            {errors.q && errors.q?.message}
          </span>
        </form>
      </div>

      <div className="grid gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {
          !isFetching ?
            list && list.data.map((value, index) => {
              return (
                <Link
                  key={`video-${index}`}
                  to={`/video/${value.id}`}
                  className="relative block h-[290px] rounded-[20px] p-[30px] xl:p-[0px] bg-cover bg-center w-full"
                  style={{
                    backgroundImage: `url(${getThumbnail(value.Link, '')})`,
                  }}
                >
                  <div className="custom-black-bg-opacity-85 bg-opacity-85 rounded-[20px] absolute left-0 right-0 mx-[30px] bottom-[30px] flex justify-between items-center px-[25px] py-[20px]">
                    <div>
                      <h3 className="text-white text-[20px] font-medium">
                        {value.Title?.substring(0, 20)}
                      </h3>
                      {/* <p className="text-[#CACACA] text-[14px]">
                          Premium Themes
                        </p> */}
                    </div>

                    <div className="bg-[#232323] w-[50px] h-[50px] leading-[48px] rounded-full text-center shrink-0 hover:bg-[#000]">
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
                    </div>
                  </div>
                </Link>
              )
            }) :
            <>
              {[1, 2, 3, 4].map(value => {
                return (
                  <div key={`skeleton-${value}`} className="container lg:max-w-[1710px] mx-auto">
                    <div className="bg-[#f5f5f5] rounded-[20px]">
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
                    </div>
                  </div>
                )
              })}
            </>
        }


      </div>

      {
        list && list.total < 1 && <>
          <div className="container lg:max-w-[1710px] mx-auto text-center">
            <div className="bg-[#ffffff] rounded-[20px] container mx-auto py-10 px-[12px] 2xl:px-0">

              <h3 className="text-black text-[20px] md:text-[22px] lg:text-[30px] font-bold mt-[40px] mb-[15px] leading-[1.3]">
                Oops! data tidak ditemukan
              </h3>

              <Link
                to="/"
                className="bg-black text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[38px] transition duration-500 ease-in-out hover:bg-[#EF4335]"
              >
                Refresh <Refresh2
                  className="inline-block relative -top-[2px] ml-3"
                  size={20}
                />
              </Link>
            </div>
          </div>
        </>
      }

      {/* Pagination */}
      <Pagination
        total={list.total}
        page={page}
        perPage={perPage}
        onNextClick={() => {
          setPage(page + 1)
        }}
        onPreviousClick={() => {
          setPage(page - 1)
        }}
      />
    </>
  );
};

export default VideoCard;
