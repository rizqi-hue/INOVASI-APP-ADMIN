/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getsIndeces } from "../Services/IndicesSlice";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { NcImage } from "../../../../atoms";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Index',
        },
    },
};

const Indeces = () => {
    const dispatch = useAppDispatch();

    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    const { list, isError } = useAppSelector(
        (state) => state.indices
    );

    useEffect(() => {
        async function _getsIndices() {
            await dispatch(getsIndeces({
                filter: {}
            }));
        }

        _getsIndices();

        if (isError) {
            // 
        }

    }, [isError]);

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
                    <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        {
                            list && list.data.map((value: any) => {
                                if (value.type == "Vertical Bar Chart") {
                                    return (
                                        <>
                                            <div className="bg-[#F2F2F8] rounded-[20px] mb-10">
                                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 items-center">
                                                    <div className="py-[40px] md:py-[60px] px-[30px] md:px-[50px] lg:px-[30px] xl:px-[50px] space-y-[30px] md:space-y-[40px] xl:space-y-[60px]">
                                                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] max-w-[480px]">
                                                            {value.title}
                                                        </h2>
                                                        <p>
                                                            {value.content}
                                                        </p>
                                                    </div>

                                                    <div className="lg:col-span-2 xl:pl-[30px] md:pr-2 xl:pr-10">
                                                        <div className="relative">

                                                            <Bar options={options}
                                                                data={{
                                                                    labels: value.labels,
                                                                    datasets: value.datasets,
                                                                }} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Indeces