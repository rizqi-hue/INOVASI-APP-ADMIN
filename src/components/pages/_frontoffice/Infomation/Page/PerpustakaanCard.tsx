"use client";

import { yupResolver } from '@hookform/resolvers/yup';
import { DocumentDownload, Eye, Refresh2, SearchNormal1 } from "iconsax-react";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { NcImage } from "../../../../atoms";
import Pagination from "../../Profile/Page/Pagination";
import { getsPerpustakaan } from "../Services/PerpustakaanSlice";
type SearchForm = {
  q: string;
};
const PerpustakaanCard = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(15)

  const dispatch = useAppDispatch();

  const { list, isError, isFetching } = useAppSelector(
    (state) => state.perpustakaan
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
    async function _getsInformation() {
      await dispatch(getsPerpustakaan({
        filter: {
          Status: "Publish",
        },
        pagination: {
          page: page,
          perPage: perPage,
        }
      }));
    }

    _getsInformation();

    if (isError) {
      // 
    }

  }, [isError, page]);

  const doSearch = (data: SearchForm) => {
    dispatch(getsPerpustakaan({
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
    dispatch(getsPerpustakaan({
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
      <div className="pb-[50px] md:pb-[60px] lg:pb-[80px] xl:pb-[100px]">
        <div className="container mx-auto">
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

          {/* <div className="grid gap-[25px] grid-cols-2 md:grid-cols-1"> */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {
                !isFetching ? (
                  list && list.data.map((value, index) => {
                    return (
                      <div
                        key={`photo-${index}`}
                        className="relative aspect-w-3 aspect-h-4 rounded-3xl overflow-hidden group"
                      >
                        <div className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 ">
                          <div
                            className="sm:mt-[30px] md:mt-[40px] lg:mt-[0]"
                            data-aos="fade-up"
                            data-aos-delay="500"
                            data-aos-duration="600"
                          >
                            <NcImage
                              className="object-cover w-full h-full rounded-2xl"
                              containerClassName="aspect-[6/8]"
                              src={import.meta.env.VITE_BASEURL + "/images/perpustakaan/" + value.Image}
                              alt="Hero Image" />
                          </div>
                        </div>
                        <div>
                          <div className="absolute z-10 bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black"></div>
                        </div>
                        <div className=" bottom-0 absolute z-20 flex flex-col justify-end items-start text-xs text-neutral-300 space-y-2.5 p-2">
                          <h2 className="block text-lg font-semibold text-white ">
                            <span className="line-clamp-2">{value.Title}</span>
                          </h2>
                          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-1">
                            <a
                              href={`${import.meta.env.VITE_BASEURL}/images/perpustakaan/${value.File}`}
                              className=" bg-primary-500 hover:bg-primary-700 text-white text-[12px] font-medium inline-block rounded-full py-[10px] px-[20px] transition duration-500 ease-in-out "
                            >
                              Unduh
                              <DocumentDownload
                                className="inline-block relative -top-[2px] ml-3"
                                size={20}
                                color="#fff"
                              />
                            </a>

                            <Link
                              to={`/perpustakaan/${value.Slug}`}
                              className=" bg-gray-500 hover:bg-gray-700 text-white text-[12px] font-medium inline-block rounded-full py-[10px] px-[20px] transition duration-500 ease-in-out "
                            >
                              Lihat
                              <Eye
                                className="inline-block relative -top-[2px] ml-3"
                                size={20}
                                color="#fff"
                              />
                            </Link>
                          </div>

                        </div>
                        
                      </div>
                    )
                  })
                ) :
                  [1, 2, 3, 4, 5].map((value) => {
                    return (
                      <div key={`skeleton-loading-${value}`} className="container w-full mx-auto">
                        <div className="bg-gray-100 rounded-[20px]">
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
                        </div>
                      </div>
                    )
                  })
              }
            </div>
          {/* </div> */}

          {
            list && list.total < 1 && <>
              <div className="container lg:max-w-[1710px] mx-auto text-center">
                <div className="bg-[#ffffff] rounded-[20px] container mx-auto py-10 px-[12px] 2xl:px-0">

                  <h3 className="text-black text-[20px] md:text-[22px] lg:text-[30px] font-bold mt-[40px] mb-[15px] leading-[1.3]">
                    Oops! data tidak ditemukan
                  </h3>

                  <Link
                    to="#"
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
        </div>
      </div>
    </>
  );
};

export default PerpustakaanCard;
