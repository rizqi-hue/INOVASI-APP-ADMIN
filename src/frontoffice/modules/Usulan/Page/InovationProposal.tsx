import { Add } from "iconsax-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import InovationProposalList from "./InovationProposalList";

const InovationProposal = () => {

    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    return (
        <>
            <div className="gradient-bg">
                <div className="container mx-auto pt-10">
                    <div
                        className={`bg-[#d8d8d8] rounded-[20px] py-[40px] md:py-[50px] lg:py-[50px] xl:py-[50px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]`}

                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        {
                            ref && ref.data.map((value, index) => {
                                if (value.Code == "USULAN_IDE_INOVASI") {
                                    return (
                                        <div key={`header-research-${index}`} className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                                            <div>
                                                <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] max-w-[480px]">
                                                    {value.Title}
                                                </h2>
                                            </div>

                                            <div className="lg:text-end lg:max-w-[412px] lg:ml-auto">
                                                <p className="mb-[20px]">
                                                    {value.Content}
                                                </p>

                                                <Link
                                                    to="/proposed_innovation_ideas/create"
                                                    className="bg-primary-500 hover:bg-primary-700 text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[30px] transition duration-500 ease-in-out "
                                                >
                                                    <Add
                                                        className="w-12 inline-block relative -top-[2px]"
                                                        size={20}
                                                    />
                                                    Buat Pengajuan Proposal Inovasi
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>

                <div className="mt-20 container mx-auto">
                    <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        <InovationProposalList />
                        {/* <InovationProposalCard /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default InovationProposal