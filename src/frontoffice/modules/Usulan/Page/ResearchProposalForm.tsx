/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight2, Trash } from "iconsax-react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import pdf from "../../../assets/images/pdf.png";
import { NcImage } from "../../../components";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { clearState, createResearchProposal } from "../Services/ResearchProposalSlice";
import { useNavigate } from "react-router-dom";

type Form = {
    Title: string;
    ProblemIdentification: string;
    Purpose: string;
    Instansi: string;
    Email: string;
    PhoneNumber: string;
};

const ResearchProposalForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [selectedTOR, setSelectedTOR] = useState<string[]>([]);
    const [previewTOR, setPreviewTOR] = useState<string[]>([]);

    const [selectedICP, setSelectedICP] = useState<string[]>([]);
    const [previewICP, setPreviewICP] = useState<string[]>([]);

    const validationSchema = Yup.object().shape({
        Title: Yup.string().required("Judul tidak boleh kosong"),
        ProblemIdentification: Yup.string().required("Identifikasi masalah tidak boleh kosong"),
        Purpose: Yup.string().required("Tujuan tidak boleh kosong"),
        Instansi: Yup.string().required("Instansi tidak boleh kosong"),
        Email: Yup.string().required("Email tidak boleh kosong"),
        PhoneNumber: Yup.string().required("No HP tidak boleh kosong"),
    });

    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors },
    } = useForm<Form>({
        resolver: yupResolver<any>(validationSchema),
    });

    const { isCreateSuccess, isFetching } = useAppSelector(
        (state) => state.researchproposal
    );

    useEffect(() => {
        if (isCreateSuccess) {
            dispatch(clearState())
            navigate('/research_proposal')
        }
    }, [isCreateSuccess])

    const selectTOR = (event: any) => {
        const images: string[] = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(event.target.files[i].name);
        }

        setSelectedTOR(event.target.files);
        setPreviewTOR(images);
    };

    const deleteTOR = async (i: any) => {
        const oldSelectedTOR = Array.prototype.slice.call(selectedTOR);
        const oldPreviewTOR = Array.prototype.slice.call(previewTOR);

        if (i >= 0) {
            oldSelectedTOR.splice(i, 1);
            oldPreviewTOR.splice(i, 1);

            setSelectedTOR(oldSelectedTOR);
            setPreviewTOR(oldPreviewTOR);
        }
    };

    const selectICP = (event: any) => {
        const images: string[] = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(event.target.files[i].name);
        }

        setSelectedICP(event.target.files);
        setPreviewICP(images);
    };

    const deleteICP = async (i: any) => {
        const oldSelectedICP = Array.prototype.slice.call(selectedICP);
        const oldPreviewICP = Array.prototype.slice.call(previewICP);

        if (i >= 0) {
            oldSelectedICP.splice(i, 1);
            oldPreviewICP.splice(i, 1);

            setSelectedICP(oldSelectedICP);
            setPreviewICP(oldPreviewICP);
        }
    };

    const doUploadProposal = (data: Form) => {

        const formData = new FormData();

        if (selectedTOR) {
            for (const key in selectedTOR) {
                formData.append("Tor", selectedTOR[key]);
            }
        }

        if (selectedICP) {
            for (const key in selectedICP) {
                formData.append("Icp", selectedICP[key]);
            }
        }

        formData.append("Title", data.Title);
        formData.append("ProblemIdentification", data.ProblemIdentification);
        formData.append("Purpose", data.Purpose);
        formData.append("Instansi", data.Instansi);
        formData.append("Email", data.Email);
        formData.append("PhoneNumber", data.PhoneNumber);

        dispatch(createResearchProposal(formData));
    };

    return (
        <>
            <div className="pb-[50px] md:pb-[60px] lg:pb-[80px] xl:pb-[100px]">
                <div className="container mx-auto">
                    {/* Section Header */}
                    <div className="border-2 border-gray-200 rounded-3xl grid gap-[25px] lg:gap-0 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
                        {/* ContactInfo */}
                        <div className="bg-black rounded-[20px] lg:rounded-l-[20px] lg:rounded-r-[0] space-y-[20px] py-[10px] md:py-[20px] lg:py-[30px] px-[20px] md:px-[50px]">
                            <div className="rounded-[20px] px-[10px] py-[15px]">
                                <h3 className="text-[24px] md:text-[40px] font-semibold text-white mb-[20px] leading-none">
                                    Form Usulan Penelitian
                                </h3>
                            </div>
                        </div>

                        <div className="md:col-span-3 xl:col-span-3 bg-white rounded-[20px] lg:rounded-r-[20px] lg:rounded-l-[0] px-[20px] md:px-[50px] lg:px-[50px] xl:px-[90px] py-[30px] md:py-[60px]">
                            <form
                                onSubmit={handleSubmit(doUploadProposal)}
                                className="space-y-[20px]"
                            >
                                <div>
                                    <label
                                        htmlFor="Title"
                                        className="block font-semibold text-black"
                                    >
                                        Judul
                                    </label>
                                    <div className="mt-[10px]">
                                        <input
                                            id="Title"
                                            type="text"
                                            autoComplete="Judul Penelitian"
                                            placeholder="Judul Penelitian"
                                            required
                                            className="bg-[#F2F2F8] h-[52px] block w-full rounded-[50px] py-[5px] px-[25px] border-0 focus:outline-none placeholder-[#4C4C4C]"
                                            {...register("Title")}
                                        />
                                    </div>
                                    {
                                        errors.Title && (<span className="ml-5 text-red-500">{errors.Title?.message}</span>)
                                    }
                                </div>

                                <div>
                                    <label
                                        htmlFor="ProblemIdentification"
                                        className="block font-semibold text-black"
                                    >
                                        Identifikasi Masalah
                                    </label>

                                    <div className="mt-[10px]">
                                        <textarea
                                            rows={4}
                                            id="ProblemIdentification"
                                            {...register("ProblemIdentification")}
                                            placeholder="Identifikasi Masalah"
                                            className="bg-[#F2F2F8] block w-full rounded-[20px] py-[15px] px-[25px] border-0 focus:outline-none placeholder-[#4C4C4C]"
                                        ></textarea>
                                    </div>
                                    {
                                        errors.ProblemIdentification && (<span className="ml-5 text-red-500">{errors.ProblemIdentification?.message}</span>)
                                    }
                                </div>

                                <div>
                                    <label
                                        htmlFor="Purpose"
                                        className="block font-semibold text-black"
                                    >
                                        Tujuan Penelitian
                                    </label>
                                    <div className="mt-[10px]">
                                        <textarea
                                            rows={4}
                                            id="Purpose"
                                            {...register("Purpose")}
                                            autoComplete="Tujuan Penelitian"
                                            placeholder="Tujuan Penelitian"
                                            className="bg-[#F2F2F8] block w-full rounded-[20px] py-[15px] px-[25px] border-0 focus:outline-none placeholder-[#4C4C4C]"
                                        ></textarea>
                                    </div>
                                    {
                                        errors.Purpose && (<span className="ml-5 text-red-500">{errors.Purpose?.message}</span>)
                                    }
                                </div>

                                <div>
                                    <label
                                        htmlFor="Instansi"
                                        className="block font-semibold text-black"
                                    >
                                        Instansi
                                    </label>
                                    <div className="mt-[10px]">
                                        <input
                                            id="Instansi"
                                            {...register("Instansi")}
                                            type="text"
                                            autoComplete="Instansi"
                                            placeholder="Instansi"
                                            required
                                            className="bg-[#F2F2F8] h-[52px] block w-full rounded-[50px] py-[5px] px-[25px] border-0 focus:outline-none placeholder-[#4C4C4C]"
                                        />
                                    </div>
                                    {
                                        errors.Instansi && (<span className="ml-5 text-red-500">{errors.Instansi?.message}</span>)
                                    }
                                </div>

                                <div>
                                    <label
                                        htmlFor="Email"
                                        className="block font-semibold text-black"
                                    >
                                        Your Email
                                    </label>
                                    <div className="mt-[10px]">
                                        <input
                                            id="Email"
                                            {...register("Email")}
                                            type="email"
                                            autoComplete="Email"
                                            placeholder="Enter your email address"
                                            required
                                            className="bg-[#F2F2F8] h-[52px] block w-full rounded-[50px] py-[5px] px-[25px] border-0 focus:outline-none placeholder-[#4C4C4C]"
                                        />
                                    </div>
                                    {
                                        errors.Email && (<span className="ml-5 text-red-500">{errors.Email?.message}</span>)
                                    }
                                </div>

                                <div>
                                    <label
                                        htmlFor="PhoneNumber"
                                        className="block font-semibold text-black"
                                    >
                                        Your Phone
                                    </label>
                                    <div className="mt-[10px]">
                                        <input
                                            id="PhoneNumber"
                                            {...register("PhoneNumber")}
                                            type="text"
                                            autoComplete="PhoneNumber"
                                            placeholder="Enter your phone number"
                                            required
                                            className="bg-[#F2F2F8] h-[52px] block w-full rounded-[50px] py-[5px] px-[25px] border-0 focus:outline-none placeholder-[#4C4C4C]"
                                        />
                                    </div>
                                    {
                                        errors.PhoneNumber && (<span className="ml-5 text-red-500">{errors.PhoneNumber?.message}</span>)
                                    }
                                </div>

                                <div className="mt-10 md:mt-0 space-y-2 sm:space-y-4 md:sm:space-y-4">
                                    <div>
                                        <label
                                            className="block font-semibold text-black"
                                        >
                                            TOR
                                        </label>
                                        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                                            File types supported: PDF, Max size: 100 MB
                                        </span>
                                        <label htmlFor="Tor" className="mt-5 cursor-pointer">
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
                                                <div className="flex flex-row space-y-1 text-center justify-center">
                                                    <div className="mx-auto">
                                                        <NcImage containerClassName="mx-auto w-12" src={pdf} />
                                                    </div>
                                                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-500">
                                                        <div className="relative rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                                            <input
                                                                type="file"
                                                                multiple
                                                                accept="application/pdf"
                                                                name="Tor"
                                                                id="Tor"
                                                                className="hidden"
                                                                onChange={selectTOR}
                                                            />
                                                            <p className="pl-1">click or drag and drop</p>
                                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                                PDF up to 10MB
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    {previewTOR && (
                                        <div className="flex flex-wrap">
                                            {previewTOR.map((value: any, i: any) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        className="flex flex-row px-3 py-2 border-dashed border-2 border-gray-200 p-1 mr-2 rounded-2xl"
                                                    >
                                                        <div
                                                            onClick={() => deleteTOR(i)}
                                                            className="rounded-md cursor-pointer"
                                                        >
                                                            <Trash className="w-5 text-red-500 hover:text-red-300" />
                                                        </div>

                                                        <div className="ml-5">
                                                            {value}
                                                        </div>

                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-10 md:mt-0 space-y-2 sm:space-y-4 md:sm:space-y-4">
                                    <div>
                                        <label
                                            className="block font-semibold text-black"
                                        >
                                            ICP
                                        </label>
                                        <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                                            File types supported: PDF, Max size: 100 MB
                                        </span>
                                        <label htmlFor="Tcp" className="mt-5 cursor-pointer">
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
                                                <div className="flex flex-row space-y-1 text-center justify-center">
                                                    <div className="mx-auto">
                                                        <NcImage containerClassName="mx-auto w-12" src={pdf} />
                                                    </div>
                                                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-500">
                                                        <div className="relative rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                                            <input
                                                                type="file"
                                                                multiple
                                                                accept="application/pdf"
                                                                name="Tcp"
                                                                id="Tcp"
                                                                className="hidden"
                                                                onChange={selectICP}
                                                            />
                                                            <p className="pl-1">click or drag and drop</p>
                                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                                PDF up to 10MB
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    {previewICP && (
                                        <div className="flex flex-wrap">
                                            {previewICP.map((value: any, i: any) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        className="flex flex-row px-3 py-2 border-dashed border-2 border-gray-200 p-1 mr-2 rounded-2xl"
                                                    >
                                                        <div
                                                            onClick={() => deleteICP(i)}
                                                            className="rounded-md cursor-pointer"
                                                        >
                                                            <Trash className="w-5 text-red-500 hover:text-red-300" />
                                                        </div>

                                                        <div className="ml-5">
                                                            {value}
                                                        </div>

                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isFetching}
                                        className="bg-black text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[38px] transition duration-500 ease-in-out hover:bg-[#EF4335]"
                                    >
                                        <span className="mr-3">
                                            {
                                                isFetching ?
                                                    <>
                                                        Sedang Mengirim ...
                                                    </> :
                                                    <>
                                                        Kirim Pengajuan
                                                    </>
                                            }
                                        </span>

                                        <ArrowRight2
                                            className="inline-block relative -top-[2px]"
                                            size={20}
                                        />

                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResearchProposalForm