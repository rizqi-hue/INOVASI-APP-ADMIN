"use client";

import { Buildings, Diagram, Paperclip } from "iconsax-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getsInovationProposal } from "../Services/InovationProposalSlice";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Refresh2, SearchNormal1 } from "iconsax-react";
import Pagination from "../../Profile/Page/Pagination";
import { Link } from "react-router-dom";
type SearchForm = {
  q: string;
};
const InovationProposalList = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(12)

  const dispatch = useAppDispatch();

  const { list, isError, isFetching } = useAppSelector(
    (state) => state.inovationproposal
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
    async function _getsInovationProposal() {
      await dispatch(getsInovationProposal({
        filter: {
          // 
        },
        pagination: {
          page: page,
          perPage: perPage,
        }
      }));
    }

    _getsInovationProposal();

    if (isError) {
      // 
    }

  }, [isError, page]);

  const doSearch = (data: SearchForm) => {
    dispatch(getsInovationProposal({
      filter: {
        Title: data.q
      },
      pagination: {
        page: page,
        perPage: perPage,
      }
    }));
  }

  const doReset = () => {
    dispatch(getsInovationProposal({
      filter: {
        // Status: "Publish",
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

      <div className="space-y-[30px]">
        {
          !isFetching ?
            list && list.data.map((value, index) => {
              return (
                <div key={`research-propsal-${index}`} className="bg-[#fff] border border-[#E3E3E3] rounded-[20px] py-[30px] md:py-[35px] px-[30px] md:px-[50px]">
                  <div className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 ">
                    <div>
                      <h3 className="text-black font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-[30px] md:leading-[35px] mb-[10px]">
                        {value.Title}
                      </h3>

                      <ul className="space-x-[20px] space-y-[10px] md:space-y-[0]">
                        <li className="inline-block">
                          <div className="flex items-center ">
                            <div className="p-2 flex justify-center items-center shrink-0 bg-[#E3E3E3] w-[32px] h-[32px] leading-[28px] text-center rounded-full text-[20px] mr-[10px]">
                              <Diagram />
                            </div>{" "}
                            {value.Status}
                          </div>
                        </li>

                        <li className="inline-block">
                          <div className="flex items-center">
                            <div className="flex justify-center items-center shrink-0 bg-[#E3E3E3] w-[32px] h-[32px] leading-[28px] text-center rounded-full text-[20px] mr-[10px]">
                              <Buildings />
                            </div>{" "}
                            {value.Instansi}
                          </div>
                        </li>


                        <li className="inline-block">
                          <div className="flex items-center">
                            <div className="flex justify-center items-center shrink-0 bg-[#E3E3E3] w-[32px] h-[32px] leading-[28px] text-center rounded-full text-[20px] mr-[10px]">
                              <Paperclip className="nline-block" />
                            </div>{" "}
                            <a
                              href={`${import.meta.env.VITE_BASEURL}/images/usulan/${value.Tor}`}
                              className="text-black text-[14px]   font-medium inline-block transition duration-500 ease-in-out hover:text-[#EF4335]"
                            >
                              Unduh TOR
                            </a>
                          </div>
                        </li>


                        <li className="inline-block">
                          <div className="flex items-center">
                            <div className="flex justify-center items-center shrink-0 bg-[#E3E3E3] w-[32px] h-[32px] leading-[28px] text-center rounded-full text-[20px] mr-[10px]">
                              <Paperclip className="nline-block" />
                            </div>{" "}
                            <a
                              href={`${import.meta.env.VITE_BASEURL}/images/usulan/${value.Icp}`}
                              className="text-black text-[14px]   font-medium inline-block transition duration-500 ease-in-out hover:text-[#EF4335]"
                            >
                              Unduh ICP
                            </a>
                          </div>
                        </li>

                      </ul>
                    </div>

                  </div>
                </div>
              )
            }) :
            <>
              {[1, 2].map(value => {
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

        {
          list && list.total < 1 && <>
            <div className="container lg:max-w-[1710px] mx-auto text-center">
              <div className="bg-[#ffffff] rounded-[20px] container mx-auto py-10 px-[12px] 2xl:px-0">

                <h3 className="text-black text-[20px] md:text-[22px] lg:text-[30px] font-bold mt-[40px] mb-[15px] leading-[1.3]">
                  Oops! data tidak ditemukan
                </h3>

                <Link
                  to="#"
                  onClick={doReset}
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

      </div>

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

export default InovationProposalList;
