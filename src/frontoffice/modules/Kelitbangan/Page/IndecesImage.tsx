/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { NcImage } from "../../../components";
import { getsIndeces } from "../Services/IndicesSlice";
import parse from 'html-react-parser';
import { Refresh2, SearchNormal1 } from "iconsax-react";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';

type SearchForm = {
    q: string;
};

const IndecesImage = () => {
    const dispatch = useAppDispatch();

    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    const { list, isError } = useAppSelector(
        (state) => state.indices
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
        async function _getsIndices() {
            await dispatch(getsIndeces({
                filter: {
                    Status: "Publish",
                }
            }));
        }

        _getsIndices();

        if (isError) {
            // 
        }

    }, [isError]);


    const doSearch = (data: SearchForm) => {
        dispatch(getsIndeces({
            filter: {
                Status: "Publish",
                Title: data.q
            },
            // pagination: {
            //     page: page,
            //     perPage: perPage,
            // }
        }));
    }

    const doReset = () => {
        dispatch(getsIndeces({
            filter: {
                Status: "Publish",
            },
            // pagination: {
            //     page: page,
            //     perPage: perPage,
            // }
        }));
    }


    return (
        <>
            <div className="gradient-bg">
                <div className="container mx-auto pt-10 pb-10">

                    {
                        ref && ref.data.map((value, index) => {
                            if (value.Code == "KELITBANGAN_INDEX") {
                                return (
                                    <div
                                        key={`KELITBANGAN_INDEX_${index}`}
                                        // className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[50px] md:py-[90px] lg:py-[60px] xl:py-[90px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}
                                        className={`bg-[#d8d8d8] rounded-[20px] ${!value.Image && "py-[40px] md:py-[50px] lg:py-[50px] xl:py-[50px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]"}`}

                                        data-aos="fade-up"
                                        data-aos-delay="100"
                                        data-aos-duration="600"
                                        data-aos-once="true"
                                    >
                                        {
                                            value.Image ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 items-center">
                                                    <div className="py-[20px] px-[40px]">
                                                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] mb-[15px] md:mb-[30px]">
                                                            {value.Title}
                                                        </h2>
                                                    </div>

                                                    <div className="lg:col-span-2 xl:pl-[30px]">
                                                        <div className="relative">
                                                            <NcImage
                                                                containerClassName="aspect-[7/3] "
                                                                src={`${import.meta.env.VITE_BASEURL}/images/umum/${value.Image}`}
                                                                alt="Fun Facts Img"
                                                            // className="rounded-r-[20px]"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                                                    <div>
                                                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] max-w-[480px]">
                                                            {value.Title}
                                                        </h2>
                                                    </div>

                                                    <div className="lg:text-end lg:max-w-[412px] lg:ml-auto">
                                                        <p className="mb-[20px]">
                                                            {value.Content}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        })
                    }

                </div>

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

                    <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        {
                            list && list.data.map((value: any, index) => {
                                return (
                                    <>
                                        <div key={`data-indeks-${index}`} className="bg-[#F2F2F8] rounded-[20px] mb-10">
                                            <div className="grid grid-cols-1 items-center">
                                                <div className="py-[40px] md:py-[60px] px-[30px] md:px-[50px] lg:px-[30px] xl:px-[50px] space-y-[10px] md:space-y-[20px] ">
                                                    <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] max-w-[980px]">
                                                        {value.title}
                                                    </h2>
                                                    <p>
                                                        {
                                                            value.content && (value.content.substring(0, 4) == "&lt;" ? parse(parse(value.content).toString()) : parse(value.content))
                                                        }
                                                    </p>
                                                </div>

                                                <div className="lg:col-span-2 xl:pl-[30px] md:pr-2 xl:pr-10">
                                                    <div className="relative">

                                                        <NcImage
                                                            className="w-full"
                                                            containerClassName="px-10 md:px-32"
                                                            src={`${import.meta.env.VITE_BASEURL}/images/indices/${value.Image}`}
                                                            alt="Fun Facts Img"
                                                        // className="rounded-r-[20px]"
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndecesImage