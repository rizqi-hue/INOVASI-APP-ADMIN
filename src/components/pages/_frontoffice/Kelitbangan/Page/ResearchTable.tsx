import { Refresh2, SearchNormal } from "iconsax-react";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import Pagination from "../../Profile/Page/Pagination";
import { getsResearchScope } from "../Services/ResearchScopeSlice";
import { getsResearch } from "../Services/ResearchSlice";

type SearchForm = {
    q: string;
    Year: number;
    ResearchScope: string;
};

const ResearchTable = () => {

    const [page, setPage] = useState(1)
    const [perPage] = useState(10)

    const dispatch = useAppDispatch();

    const { list, isError, isFetching } = useAppSelector(
        (state) => state.research
    );

    const { list: researchscope_list } = useAppSelector(
        (state) => state.researchscope
    );

    // const validationSchema = Yup.object().shape({
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
        async function _getsResearch() {
            await dispatch(getsResearch({
                filter: {
                    Status: "Publish",
                },
                pagination: {
                    page: page,
                    perPage: perPage,
                }
            }));
        }

        async function _getsResearchScope() {
            await dispatch(getsResearchScope({}));
        }

        _getsResearchScope();
        _getsResearch();

        if (isError) {
            // 
        }

    }, [isError, page]);

    const doSearch = (data: SearchForm) => {
        dispatch(getsResearch({
            filter: {
                Status: "Publish",
                Title: data.q,
                Year: data.Year,
                ResearchScope: (data.ResearchScope == "Pilih Lingkup") ? null : parseInt(data.ResearchScope)
            },
            pagination: {
                page: page,
                perPage: perPage,
            }
        }));
    }

    const doReset = () => {
        dispatch(getsResearch({
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
            <div className="w-full">
                <div className="bg-white rounded-2xl py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className='w-full flex justify-end'>
                        <form
                            onSubmit={handleSubmit(doSearch)}
                            className="search-form w-full justify-end flex flex-col md:flex-row mb-5 md:space-x-2 space-y-2"
                        >
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                            <select
                                className="block bg-[#F2F2F8] w-full md:w-64 rounded-full py-[14px] px-[30px] placeholder:text-[#4C4C4C] focus:outline-none"
                                id="ResearchScope"
                                {...register("ResearchScope")}
                            >
                                <option selected >Pilih Lingkup</option>
                                {
                                    researchscope_list && researchscope_list.data.map((value) => {
                                        return (
                                            <option value={value.id}>{value.Name}</option>
                                        )
                                    })
                                }
                            </select>

                            <input
                                className="block bg-[#F2F2F8] w-full md:w-32 rounded-full py-[14px] px-[30px] placeholder:text-[#4C4C4C] focus:outline-none"
                                placeholder="Tahun"
                                type="number"
                                id="Year"
                                {...register("Year")}
                            />

                            <label className="relative block xl:w-[180px] 2xl:w-[330px]">
                                <input
                                    className="block bg-[#F2F2F8] w-full rounded-full py-[14px] px-[30px] placeholder:text-[#4C4C4C] focus:outline-none"
                                    placeholder="Nama Penelitian"
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

                    <div className=" overflow-x-auto">
                        <table className="w-full">
                            <thead className="">
                                <tr className="border-0 mb-3 bg-primary-500 font-semibold text-white focus:outline-none h-16">
                                    <td className="rounded-l-full">
                                        <div className="flex items-center pl-5">
                                            <p className="text-md leading-none  mr-2">Nama</p>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="flex items-center pl-5">
                                            <p className="text-md leading-none mr-2">Lingkup</p>
                                        </div>
                                    </td>
                                    {/* <td className="">
                                        <div className="flex items-center pl-5">
                                            <p className="text-base font-medium leading-none  mr-2">Pelaksana</p>
                                        </div>
                                    </td> */}
                                    <td className="pl-5">
                                        <div className="flex items-center pl-5">
                                            <p className="text-base font-medium leading-none  mr-2">Tahun</p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center pl-5">
                                            <p className="text-base font-medium leading-none  mr-2">File</p>
                                        </div>
                                    </td>
                                    <td className="pl-4 rounded-r-full">
                                        Aksi
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !isFetching ?
                                        list && list.data.map((value, index) => {
                                            return (
                                                <tr key={`research-${index}`} className="mb-3 h-16 border-b-2 border-gray-100">
                                                    <td className="rounded-l-full">
                                                        <div className="flex items-center pl-5">
                                                            <p className="text-base font-bold leading-none text-gray-700 mr-2">{value.Title}</p>
                                                        </div>
                                                    </td>
                                                    <td className="">
                                                        <div className="flex items-center pl-5">
                                                            <p className="text-md leading-none text-gray-700 mr-2">{value.DataResearchScope?.Name}</p>
                                                        </div>
                                                    </td>
                                                    {/* <td className="">
                                                        <div className="flex items-center pl-5">
                                                            <p className="text-base font-medium leading-none text-gray-700 mr-2">{value.Executor}</p>
                                                        </div>
                                                    </td> */}
                                                    <td className="pl-5">
                                                        <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">{value.Year}</button>
                                                    </td>
                                                    <td className="pl-5">
                                                        <a
                                                            href={`${import.meta.env.VITE_BASEURL}/images/research/${value.File}`}
                                                        >
                                                            <div className="flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                    <path
                                                                        d="M12.5 5.83339L7.08333 11.2501C6.75181 11.5816 6.56556 12.0312 6.56556 12.5001C6.56556 12.9689 6.75181 13.4185 7.08333 13.7501C7.41485 14.0816 7.86449 14.2678 8.33333 14.2678C8.80217 14.2678 9.25181 14.0816 9.58333 13.7501L15 8.33339C15.663 7.67034 16.0355 6.77107 16.0355 5.83339C16.0355 4.8957 15.663 3.99643 15 3.33339C14.337 2.67034 13.4377 2.29785 12.5 2.29785C11.5623 2.29785 10.663 2.67034 10 3.33339L4.58333 8.75005C3.58877 9.74461 3.03003 11.0935 3.03003 12.5001C3.03003 13.9066 3.58877 15.2555 4.58333 16.2501C5.57789 17.2446 6.92681 17.8034 8.33333 17.8034C9.73985 17.8034 11.0888 17.2446 12.0833 16.2501L17.5 10.8334"
                                                                        stroke="#52525B"
                                                                        stroke-width="1.25"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    ></path>
                                                                </svg>
                                                                <p className="text-sm leading-none text-gray-600 ml-2">Unduh File</p>
                                                            </div>
                                                        </a>
                                                    </td>
                                                    <td className="pl-4 rounded-r-full">
                                                        <Link to={`/research_result/${value.id}`}>
                                                            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">Lihat Detail</button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <>
                                            {
                                                [1, 2].map(value => {
                                                    return (
                                                        <tr key={`loadding-${value}`} className="mb-3 focus:outline-none h-16 border border-gray-100 rounded">
                                                            <td colSpan={6} className="">
                                                                <div className="container mt-2 mx-auto">
                                                                    <div className="bg-[#f5f5f5] rounded-[20px]">
                                                                        <div className="rounded-md p-4 w-full mx-auto">
                                                                            <div className="animate-pulse flex space-x-4">
                                                                                <div className="flex-1 space-y-6 py-1">
                                                                                    <div className="space-y-3">
                                                                                        <div className="grid grid-cols-3 gap-4">
                                                                                            <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                                                                                            <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                                                                                        </div>
                                                                                        <div className="h-2 bg-slate-500 rounded"></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </>
                                }

                                {
                                    list && list.total < 1 && <>
                                        <tr key={`loadding`} className="mb-3 focus:outline-none h-16 border border-gray-100 rounded">
                                            <td colSpan={6} className="">
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
                                            </td>
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>

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
    )
}

export default ResearchTable