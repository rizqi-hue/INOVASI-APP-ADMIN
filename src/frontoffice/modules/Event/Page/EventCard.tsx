import { ArrowRight2, Refresh2, SearchNormal } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Pagination from '../../Profile/Page/Pagination';
import { getsEvent } from '../Services/EventSlice';
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toDate } from '../../../../utils/date';

type SearchForm = {
    q: string;
};

export default function EventCard() {

    const [page, setPage] = useState(1)
    const [perPage] = useState(10)

    const dispatch = useAppDispatch();

    const { list, isError, isFetching } = useAppSelector(
        (state) => state.event
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
            await dispatch(getsEvent({
                url: "/agenda",
                params: {
                    filter: {
                        Type: "AGENDA",
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
            url: "/agenda",
            params: {
                filter: {
                    Type: "AGENDA",
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
            url: "/agenda",
            params: {
                filter: {
                    Type: "AGENDA",
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

            <div className="space-y-[30px]">
                {
                    !isFetching ?
                        list && list.data.map((value, index) => {
                            return (
                                <div key={`event-${index}`} className="bg-[#fff] border border-[#E3E3E3] rounded-[20px] py-[30px] md:py-[35px] px-[30px] md:px-[50px]">
                                    <div className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                        <div>
                                            <h3 className="text-black font-semibold text-[18px] md:text-[22px] lg:text-[24px] leading-[30px] md:leading-[35px] mb-[10px]">
                                                {value.Title}
                                            </h3>

                                            <div className='h-2 w-full bg-primary-500 rounded-full mb-[10px]'></div>

                                            <ul className="flex flex-col md:flex-row gap-2">
                                                <li className="inline-block">
                                                    <div className="flex items-center">
                                                        <div className="shrink-0 bg-[#E3E3E3] w-[32px] h-[32px] leading-[28px] text-center rounded-full text-[20px] mr-[10px]">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                className="inline-block"
                                                            >
                                                                <path
                                                                    d="M8 0C4.64 0 1.90625 2.73375 1.90625 6.09375C1.90625 7.42344 2.32625 8.68687 3.12188 9.74687L7.62437 15.811C7.63562 15.8257 7.65281 15.8313 7.66531 15.8444C7.89031 16.0853 8.215 16.0247 8.37531 15.811C9.67188 14.081 12.0484 10.85 12.9622 9.63125C12.9622 9.63125 12.9625 9.63031 12.9628 9.62969L12.9684 9.62219C13.7047 8.58781 14.0938 7.36781 14.0938 6.09375C14.0938 2.73375 11.36 0 8 0ZM8 9.38125C6.19094 9.38125 4.7125 7.90281 4.7125 6.09375C4.7125 4.28469 6.19094 2.80625 8 2.80625C9.80906 2.80625 11.2875 4.28469 11.2875 6.09375C11.2875 7.90281 9.80906 9.38125 8 9.38125Z"
                                                                    fill="black"
                                                                />
                                                            </svg>
                                                        </div>{" "}
                                                        {value.Location}
                                                    </div>
                                                </li>


                                                <li className="inline-block">
                                                    <div className="flex items-center">
                                                        <div className="shrink-0 bg-[#E3E3E3] w-[32px] h-[32px] leading-[28px] text-center rounded-full text-[20px] mr-[10px]">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                className="inline-block"
                                                            >
                                                                <g clipPath="url(#clip0_349_3042)">
                                                                    <path
                                                                        d="M4.5 7.78125H3.5C3.24112 7.78125 3.03125 7.99112 3.03125 8.25C3.03125 8.50888 3.24112 8.71875 3.5 8.71875H4.5C4.75888 8.71875 4.96875 8.50888 4.96875 8.25C4.96875 7.99112 4.75888 7.78125 4.5 7.78125Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        d="M4.5 9.78125H3.5C3.24112 9.78125 3.03125 9.99112 3.03125 10.25C3.03125 10.5089 3.24112 10.7188 3.5 10.7188H4.5C4.75888 10.7188 4.96875 10.5089 4.96875 10.25C4.96875 9.99112 4.75888 9.78125 4.5 9.78125Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        d="M4.5 11.7812H3.5C3.24112 11.7812 3.03125 11.9911 3.03125 12.25C3.03125 12.5089 3.24112 12.7188 3.5 12.7188H4.5C4.75888 12.7188 4.96875 12.5089 4.96875 12.25C4.96875 11.9911 4.75888 11.7812 4.5 11.7812Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        d="M8.5 7.78125H7.5C7.24112 7.78125 7.03125 7.99112 7.03125 8.25C7.03125 8.50888 7.24112 8.71875 7.5 8.71875H8.5C8.75888 8.71875 8.96875 8.50888 8.96875 8.25C8.96875 7.99112 8.75888 7.78125 8.5 7.78125Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        d="M8.5 9.78125H7.5C7.24112 9.78125 7.03125 9.99112 7.03125 10.25C7.03125 10.5089 7.24112 10.7188 7.5 10.7188H8.5C8.75888 10.7188 8.96875 10.5089 8.96875 10.25C8.96875 9.99112 8.75888 9.78125 8.5 9.78125Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        d="M8.5 11.7812H7.5C7.24112 11.7812 7.03125 11.9911 7.03125 12.25C7.03125 12.5089 7.24112 12.7188 7.5 12.7188H8.5C8.75888 12.7188 8.96875 12.5089 8.96875 12.25C8.96875 11.9911 8.75888 11.7812 8.5 11.7812Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        d="M12.5 7.78125H11.5C11.2411 7.78125 11.0312 7.99112 11.0312 8.25C11.0312 8.50888 11.2411 8.71875 11.5 8.71875H12.5C12.7589 8.71875 12.9688 8.50888 12.9688 8.25C12.9688 7.99112 12.7589 7.78125 12.5 7.78125Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        d="M12.5 9.78125H11.5C11.2411 9.78125 11.0312 9.99112 11.0312 10.25C11.0312 10.5089 11.2411 10.7188 11.5 10.7188H12.5C12.7589 10.7188 12.9688 10.5089 12.9688 10.25C12.9688 9.99112 12.7589 9.78125 12.5 9.78125Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        d="M12.5 11.7812H11.5C11.2411 11.7812 11.0312 11.9911 11.0312 12.25C11.0312 12.5089 11.2411 12.7188 11.5 12.7188H12.5C12.7589 12.7188 12.9688 12.5089 12.9688 12.25C12.9688 11.9911 12.7589 11.7812 12.5 11.7812Z"
                                                                        fill="black"
                                                                    />
                                                                    <path
                                                                        d="M14.5938 2.03125H13.4688V1.25C13.4688 0.991125 13.2589 0.78125 13 0.78125C12.7411 0.78125 12.5312 0.991125 12.5312 1.25V2.03125H8.46875V1.25C8.46875 0.991125 8.25887 0.78125 8 0.78125C7.74113 0.78125 7.53125 0.991125 7.53125 1.25V2.03125H3.46875V1.25C3.46875 0.991125 3.25887 0.78125 3 0.78125C2.74113 0.78125 2.53125 0.991125 2.53125 1.25V2.03125H1.40625C0.630844 2.03125 0 2.66209 0 3.4375V13.8125C0 14.5879 0.630844 15.2188 1.40625 15.2188H14.5938C15.3692 15.2188 16 14.5879 16 13.8125C16 13.5099 16 3.70078 16 3.4375C16 2.66209 15.3692 2.03125 14.5938 2.03125ZM0.9375 3.4375C0.9375 3.17903 1.14778 2.96875 1.40625 2.96875H2.53125V3.75C2.53125 4.00887 2.74113 4.21875 3 4.21875C3.25887 4.21875 3.46875 4.00887 3.46875 3.75V2.96875H7.53125V3.75C7.53125 4.00887 7.74113 4.21875 8 4.21875C8.25887 4.21875 8.46875 4.00887 8.46875 3.75V2.96875H12.5312V3.75C12.5312 4.00887 12.7411 4.21875 13 4.21875C13.2589 4.21875 13.4688 4.00887 13.4688 3.75V2.96875H14.5938C14.8522 2.96875 15.0625 3.17903 15.0625 3.4375V5.28125H0.9375V3.4375ZM14.5938 14.2812H1.40625C1.14778 14.2812 0.9375 14.071 0.9375 13.8125V6.21875H15.0625V13.8125C15.0625 14.071 14.8522 14.2812 14.5938 14.2812Z"
                                                                        fill="black"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_349_3042">
                                                                        <rect width="16" height="16" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </div>{" "}
                                                        {value.StartEventDate && toDate(value.StartEventDate)}
                                                    </div>
                                                </li>


                                                <li className="inline-block">
                                                    <div className="flex items-center">
                                                        <div className="shrink-0 bg-[#E3E3E3] w-[32px] h-[32px] leading-[28px] text-center rounded-full text-[20px] mr-[10px]">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                className="inline-block"
                                                            >
                                                                <g clipPath="url(#clip0_349_3058)">
                                                                    <path
                                                                        d="M14 2.5H11V1.5C11 0.947503 10.5525 0.5 10 0.5H6C5.4475 0.5 5 0.948 5 1.5V2.5H2C0.895503 2.5 0 3.3955 0 4.5V7H16V4.5C16 3.3955 15.1045 2.5 14 2.5ZM10 2.5H6V2C6 1.724 6.224 1.5 6.5 1.5H9.5C9.776 1.5 10 1.724 10 2V2.5ZM10 8.5C10 9.6045 9.1045 10.5 8 10.5C6.8955 10.5 6 9.6045 6 8.5C6 8.32601 6.02701 8.1595 6.07051 8H0V13.5C0 14.6045 0.895503 15.5 2 15.5H14C15.1045 15.5 16 14.6045 16 13.5V8H9.92952C9.97299 8.16 10 8.32601 10 8.5ZM9 8.5C9 8.31699 8.94701 8.1475 8.86149 8H7.13901C7.05299 8.1475 7 8.31699 7 8.5C7 9.0525 7.4475 9.5 8 9.5C8.5525 9.5 9 9.0525 9 8.5Z"
                                                                        fill="black"
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_349_3058">
                                                                        <rect width="16" height="16" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </div>{" "}
                                                        <a
                                                            href={`${import.meta.env.VITE_BASEURL}/images/event/${value.File}`}
                                                            className="text-black text-[14px]   font-medium inline-block transition duration-500 ease-in-out hover:text-[#EF4335]"
                                                        >
                                                            Unduh Lampiran
                                                        </a>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>

                                        <div className="lg:text-end">
                                            <Link
                                                to={`/event/${value.Slug}`}
                                                className="bg-primary-500 hover:bg-primary-700 text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[30px] transition duration-500 ease-in-out "
                                            >
                                                Detail{" "}
                                                <ArrowRight2
                                                    className="inline-block relative -top-[2px]"
                                                    size={20}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        (
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
    )
}
