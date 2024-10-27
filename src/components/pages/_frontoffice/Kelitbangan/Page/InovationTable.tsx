import { Refresh2, SearchNormal1 } from "iconsax-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { toDate } from "../../../../../utils/date";
import Pagination from "../../Profile/Page/Pagination";
import { getsDataForm } from "../Services/DataFromSlice";
import { getsInovation } from "../Services/InovationSlice";

type SearchForm = {
    q: string;
    Digital: string;
    Form: string;
    Year: number;
};

const InovationTable = () => {
    const [page, setPage] = useState(1)
    const [perPage] = useState(10)

    const dispatch = useAppDispatch();

    const { list, isError, isFetching } = useAppSelector(
        (state) => state.inovation
    );

    const { list: dataform_list } = useAppSelector(
        (state) => state.dataform
    );


    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors },
    } = useForm<SearchForm>({
        // resolver: yupResolver(validationSchema),
    });

    useEffect(() => {


        async function _getsInovation() {

            const hash = window.location.hash;
            const p = hash.replace(/^#\//, "");

            let digital = ''
            if (p == "platform-digital") {
                digital = "Platform Digital"
            }

            if (p == "produk-jasa") {
                digital = "Produk Jasa"
            }

            if (p == "produk-barang") {
                digital = "Produk Barang"
            }

            await dispatch(getsInovation({
                filter: {
                    Status: "Publish",
                    Digital: digital,
                },
                pagination: {
                    page: page,
                    perPage: perPage
                }
            }));
        }

        async function _getsDataForm() {
            await dispatch(getsDataForm({}));
        }

        _getsDataForm();
        _getsInovation();

        if (isError) {
            // 
        }

    }, [isError, page]);

    const doSearch = (data: SearchForm) => {

        const hash = window.location.hash;
        const p = hash.replace(/^#\//, "");

        let digital = ''
        if (p == "platform-digital") {
            digital = "Platform Digital"
        }

        if (p == "produk-jasa") {
            digital = "Produk Jasa"
        }

        if (p == "produk-barang") {
            digital = "Produk Barang"
        }

        dispatch(getsInovation({
            filter: {
                Status: "Publish",
                Name: data.q,
                Digital: digital,
                Year: data.Year,
                Form: data.Form
            },
            pagination: {
                page: page,
                perPage: perPage,
            }
        }));
    }

    const doReset = () => {
        dispatch(getsInovation({
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
                            className="search-form w-full justify-end flex flex-col md:flex-row mb-5 md:space-x-2 space-y-2 md:space-y-0"
                        >
                            {/* <select
                                className="block bg-[#F2F2F8] w-full md:w-64 rounded-full py-[14px] px-[30px] placeholder:text-[#4C4C4C] focus:outline-none"
                                id="Form"
                                {...register("Form")}
                            >
                                <option selected >Pilih Bentuk Inovasi</option>
                                {
                                    dataform_list && dataform_list.data.map(value => {
                                        return (
                                            <option value={value.Ref} >{value.Name}</option>
                                        )
                                    })
                                }
                            </select> */}

                            {/* <select
                                className="block bg-[#F2F2F8] w-full md:w-64 rounded-full py-[14px] px-[30px] placeholder:text-[#4C4C4C] focus:outline-none"
                                id="Digital"
                                {...register("Digital")}
                            >
                                <option selected >Pilih Jenis Inovasi</option>
                                <option value={"Digital"} >Digital</option>
                                <option value={"Non Digital"} >Non Digital</option>
                            </select> */}

                            <input
                                className="block bg-[#F2F2F8] w-full md:w-32 rounded-full py-[14px] px-[30px] placeholder:text-[#4C4C4C] focus:outline-none"
                                placeholder="Tahun"
                                type="number"
                                id="Year"
                                {...register("Year")}
                            />

                            <label className="relative block w-full xl:w-[180px] 2xl:w-[330px]">
                                <input
                                    className="block bg-[#F2F2F8] w-full md:w-[330px] rounded-full py-[14px] px-[30px] placeholder:text-[#4C4C4C] focus:outline-none"
                                    placeholder="Nama Penelitian"
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

                    <div className="mt-7 overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="mb-3 bg-primary-500 font-semibold text-white focus:outline-none h-16 ">
                                    <td className="rounded-l-full pl-5">
                                        <div className="flex items-center">
                                            <p className="text-md leading-none">Nama Inovasi</p>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="flex items-center">
                                            <p className="text-base font-medium leading-none">Pelaksana</p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center ">
                                            <p className="text-base font-medium leading-none">Urusan Pemerintahan</p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center ">
                                            <p className="text-base font-medium leading-none">Tanggal Penerapan</p>
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
                                                <tr key={`-${index}`} className="mb-3 focus:outline-none h-16 border-b-2 border-gray-100">
                                                    <td className="">
                                                        <div className="flex items-center">
                                                            <p className="text-md font-bold leading-none text-gray-700 ml-2">{(value.Name && value.Name.toString().length > 20) ? value.Name.toString().substring(0, 40) + " ..." : value.Name}</p>
                                                        </div>
                                                    </td>
                                                    <td className="">
                                                        <div className="flex items-center">
                                                            <p className="text-md font-semibold leading-none text-gray-700">{value.DataMadeBy?.FullName}</p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-5">
                                                        <button className="py-3 px-3 text-sm focus:outline-none leading-none  rounded">
                                                            {value.DataMainAffair?.Name}
                                                        </button>
                                                    </td>
                                                    <td className="pl-5">
                                                        <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded">
                                                            {toDate(value.DeploymentTime)}
                                                        </button>
                                                    </td>
                                                    <td className="pl-4">
                                                        <Link to={`/inovation/${value.id}`}>
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
                                                            <td colSpan={5} className="">
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
                                            <td colSpan={5} className="">
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

export default InovationTable