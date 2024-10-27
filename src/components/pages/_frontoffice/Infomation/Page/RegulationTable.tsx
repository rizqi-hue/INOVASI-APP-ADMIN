"use client";

import { yupResolver } from '@hookform/resolvers/yup';
import { DocumentDownload, Refresh2, SearchNormal1 } from "iconsax-react";
import { useEffect } from "react";
import pdf from "../../../../src/assets/images/pdf.png";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { NcImage } from "../../../../atoms";
import { getsInformation } from "../Services/InformationSlice";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
type SearchForm = {
  q: string;
};

const RegulationTable = () => {
  const dispatch = useAppDispatch();

  const { list, isError } = useAppSelector(
    (state) => state.information
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
      await dispatch(getsInformation({
        url: "/regulasi",
        params: { filter: { Type: "REGULASI", Status: 'Publish' } }
      }));
    }

    _getsInformation();

    if (isError) {
      // 
    }

  }, [isError]);


  const doSearch = (data: SearchForm) => {
    dispatch(getsInformation({
      url: "/regulasi",
      params: { filter: { Type: "REGULASI", Status: 'Publish', Title: data.q } }
    }));
  }

  const doReset = () => {
    dispatch(getsInformation({
      url: "/regulasi",
      params: { filter: { Type: "REGULASI", Status: 'Publish' } }
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

          <div className="grid gap-[25px] grid-cols-1 ">

            {
              list && list.data.map((value, index) => {
                return (
                  <div key={`regulation-${index}`} className="flex flex-col md:flex-row bg-gray-100 rounded-[20px] py-[50px] px-[40px] hover:bg-[#eff0ec] transition delay-100 duration-300 ease-in-out">
                    <div className="bg-[#F2F2F8] w-[70px] h-[70px] leading-[70px] rounded-full text-center mb-[15px]">
                      <NcImage src={pdf} />
                    </div>

                    <h3 className="text-black text-[20px] md:text-[22px] font-semibold mb-[40px]">
                      {value.Title}
                    </h3>



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
        </div>
      </div>

    </>
  );
};

export default RegulationTable;
