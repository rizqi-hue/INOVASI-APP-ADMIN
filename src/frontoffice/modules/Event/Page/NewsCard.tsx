import { ArrowRight2, Refresh2, SearchNormal } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { NcImage } from '../../../components';
import Pagination from '../../Profile/Page/Pagination';
import { getsEvent } from '../Services/EventSlice';

type SearchForm = {
    q: string;
};

export default function NewsCard() {
    const [page, setPage] = useState(1)
    const [perPage] = useState(10)

    const dispatch = useAppDispatch();

    const { list, isError, isFetching } = useAppSelector(
        (state) => state.event
    );

    // const validationSchema = yupResolver.object().shape({
    //     q: Yup.string().required("Tidak boleh kosong"),
    // });

    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors },
    } = useForm<SearchForm>({
        // resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        async function _getsInformation() {
            await dispatch(getsEvent({
                url: "/news",
                params: {
                    filter: {
                        Type: "NEWS",
                    },
                    pagination: {
                        page: page,
                        perPage: perPage,
                    }
                }
            }));
        }

        _getsInformation();

        if (isError) {
            // 
        }

    }, [isError, page]);

    const doSearch = (data: SearchForm) => {
        dispatch(getsEvent({
            url: "/news",
            params: {
                filter: {
                    Type: "NEWS",
                    Title: data.q
                },
                pagination: {
                    page: page,
                    perPage: perPage,
                }
            }
        }));
    }

    const doReset = () => {
        dispatch(getsEvent({
            url: "/news",
            params: {
                filter: {
                    Type: "NEWS",
                },
                pagination: {
                    page: page,
                    perPage: perPage,
                }
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
                            <SearchNormal className='mr-1' />
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

            {/* Blog Post 1 */}
            {
                !isFetching ?
                    list && list.data.map((value, index) => {
                        if (index == 0) {
                            return (
                                <div key={`news-${index}`} className="bg-[#ffffff] rounded-[20px] py-[40px] px-[20px] md:px-[40px] lg:px-[40px] xl:px-[65px] mb-[30px] lg:mb-[50px]">
                                    <div className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                                        <div>
                                            <div className="flex items-center space-x-[15px] mb-[30px]">
                                                <div>
                                                    <p className="leading-none text-[15px] mb-[9px]">
                                                        Posted by
                                                    </p>
                                                    <h4 className="text-black font-medium text-[15px] md:text-[18px] leading-none">
                                                        Admin
                                                    </h4>
                                                </div>
                                            </div>

                                            <Link to={`/news/${value.Slug}`}>
                                                <h3 className="text-black text-[20px] sm:text-[22px] lg:text-[25px] xl:text-[30px] 2xl:text-[36px] font-semibold md:leading-[32px] lg:leading-[35px] xl:leading-[40px] 2xl:leading-[48px] hover:text-[#EF4335]">
                                                    {value.Title}
                                                </h3>
                                            </Link>

                                            <Link
                                                to={`/news/${value.Slug}`}
                                                className="bg-primary-500 hover:bg-primary-700 text-white text-[14px] mt-[20px] md:mt-[25px] lg:mt-[30px] xl:mt-[40px] font-medium inline-block uppercase rounded-full py-[15px] px-[30px] transition duration-500 ease-in-out "
                                            >
                                                Lihat Detail
                                                <ArrowRight2
                                                    className="inline-block relative -top-[2px]"
                                                    size={20}
                                                />
                                            </Link>
                                        </div>

                                        <div className="xl:pl-[100px]">
                                            <Link to={`/news/${value.Slug}`}>
                                                <NcImage
                                                    src={`${import.meta.env.VITE_BASEURL}/images/event/${value.Image}`}
                                                    alt="Post"
                                                    containerClassName="aspect-[6/4]"
                                                // className="rounded-[20px]"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                    :
                    <>
                        <div className="container lg:max-w-[1710px] mx-auto mb-10">
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
                    </>
            }

            {/* Blog Post */}
            <div className="grid gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                {/* Blog Post 2 */}
                {
                    !isFetching ?
                        list && list.data.map((value, index) => {
                            if (index >= 1) {
                                return (
                                    <div key={`news-${index}`} className="bg-[#ffffff] rounded-[20px] p-[20px] sm:p-[45px]">
                                        <div className="flex items-center space-x-[15px] mb-[30px]">
                                            <div>
                                                <p className="leading-none text-[15px] mb-[9px]">Posted by</p>
                                                <h4 className="text-black font-medium text-[15px] md:text-[18px] leading-none">
                                                    Admin
                                                </h4>
                                            </div>
                                        </div>

                                        <Link to={`/news/${value.Slug}`}>
                                            <NcImage
                                                src={`${import.meta.env.VITE_BASEURL}/images/event/${value.Image}`}
                                                alt="Post"
                                                className="rounded-[20px] mb-[25px]"
                                            />
                                        </Link>

                                        <Link to={`/news/${value.Slug}`}>
                                            <h3 className="text-black text-[20px] sm:text-[22px] font-semibold mb-[20px] hover:text-[#EF4335]">
                                                {value.Title}
                                            </h3>
                                        </Link>


                                        <Link
                                            to={`/news/${value.Slug}`}
                                            className="bg-primary-500 hover:bg-primary-700 text-white text-[14px] mt-[20px] md:mt-[25px] lg:mt-[30px] xl:mt-[40px] font-medium inline-block uppercase rounded-full py-[15px] px-[30px] transition duration-500 ease-in-out "
                                        >
                                            Lihat Detail
                                            <ArrowRight2
                                                className="inline-block relative -top-[2px]"
                                                size={20}
                                            />
                                        </Link>

                                    </div>
                                )
                            }
                        }) :
                        <>
                            {[1, 2, 3].map((value) => {
                                return (
                                    <div key={`skeleeton-${value}`} className="container lg:max-w-[1710px] mx-auto mb-10">
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
    )
}
