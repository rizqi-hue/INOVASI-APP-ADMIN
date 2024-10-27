"use client";

import { yupResolver } from '@hookform/resolvers/yup';
import { DocumentDownload, Refresh2, SearchNormal1, User } from "iconsax-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getsInformation } from "../Services/InformationSlice";

import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { getsResearch } from '../../Kelitbangan/Services/ResearchSlice';
import { Link } from 'react-router-dom';
type SearchForm = {
  q: string;
};

const RisetCard = () => {
  const dispatch = useAppDispatch();

  const { list, isError, isFetching } = useAppSelector(
    (state) => state.research
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
    async function _getsResearch() {

      const hash = window.location.hash;
      const p = hash.replace(/^#\//, "");

      let digital = 0
      if (p == "alat-deteksi") {
        digital = 3
      }

      if (p == "bahan-gunaan") {
        digital = 4
      }

      if (p == "prilaku-konsumen") {
        digital = 5
      }

      await dispatch(getsResearch(
        { filter: { Status: 'Publish', ResearchScope: digital } }
      ));
    }

    _getsResearch();

    if (isError) {
      // 
    }

  }, [isError]);

  const doSearch = (data: SearchForm) => {

    const hash = window.location.hash;
    const p = hash.replace(/^#\//, "");

    let digital = 0
    if (p == "alat-deteksi") {
      digital = 3
    }

    if (p == "bahan-gunaan") {
      digital = 4
    }

    if (p == "prilaku-konsumen") {
      digital = 5
    }

    dispatch(getsResearch(
      { filter: { Status: 'Publish', Title: data.q, ResearchScope: digital } }
    ));
  }

  const doReset = () => {
    dispatch(getsResearch(
      { filter: { Status: 'Publish' } }
    ))
  }

  if (isFetching) {
    return (
      <div className="container lg:max-w-[1710px] mx-auto">
        <div className="bg-[#e2e2de] rounded-[20px]">
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
                  className="block bg-white w-full rounded-full py-[14px] px-[30px] placeholder:text-[#4C4C4C] focus:outline-none"
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

          <div className="grid gap-[25px] grid-cols-1 ">

            {
              list && list.data.map((value, index) => {
                return (
                  <div key={`regulation-${index}`} className=" bg-white rounded-[20px] py-[50px] px-[40px] transition delay-100 duration-300 ease-in-out">
                    <h3 className="text-black text-[20px] md:text-[22px] font-semibold mb-[10px]">
                      {value.Title}
                    </h3>

                    <h5 className="flex flex-row gap-2 items-center text-primary-500 text-[20px] md:text-[22px] mb-[40px]">
                      <User />
                      {value.Executor}
                    </h5>

                    <h5 className="text-black font-thin text-[14px] md:text-[18px] mb-[40px] text-justify">
                      {value.Abstract}
                    </h5>

                    <a
                      href={`${import.meta.env.VITE_BASEURL}/images/information/${value.File}`}
                      className=" bg-primary-500 hover:bg-primary-700 text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[30px] transition duration-500 ease-in-out "
                    >
                      Unduh
                      <DocumentDownload
                        className="inline-block relative -top-[2px] ml-3"
                        size={20}
                        color="#fff"
                      />
                    </a>
                  </div>
                )
              })
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

        </div>
      </div>

    </>
  );
};

export default RisetCard;
