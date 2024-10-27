"use client";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { useEffect, useState } from "react";
import { getsGalleryPhoto } from "../Service/GalleryImageSlice";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Refresh2, SearchNormal1 } from "iconsax-react";
import Pagination from "../../Profile/Page/Pagination";
type SearchForm = {
  q: string;
};
const PhotoCard = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(12)

  const dispatch = useAppDispatch();

  const { list, isError, isFetching } = useAppSelector(
    (state) => state.photo
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
    async function _getsPhoto() {
      await dispatch(getsGalleryPhoto({
        filter: {
          Status: "Publish",
        },
        pagination: {
          page: page,
          perPage: perPage,
        }
      }));
    }

    _getsPhoto();

    if (isError) {
      // 
    }

  }, [isError, page]);

  const doSearch = (data: SearchForm) => {
    dispatch(getsGalleryPhoto({
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
    dispatch(getsGalleryPhoto({
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

      <div className="grid gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {
          !isFetching ?
            list && list.data.map((value, index) => {
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

export default PhotoCard;
