import { DocumentUpload } from "iconsax-react";
import { useAppSelector } from "../../../../../app/hooks";
import ResearchProposalForm from "./ResearchProposalForm";

const CreateResearchProposal = () => {

    const { list: ref } = useAppSelector(
        (state) => state.referensi
    );

    return (
        <>
            <div className="gradient-bg">
                <div className="container mx-auto">
                    <div
                        className={`bg-white rounded-b-[20px] py-[40px] md:py-[50px] lg:py-[50px] xl:py-[50px] px-[30px] md:px-[90px] lg:px-[60px] xl:px-[110px]`}
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        {
                            ref && ref.data.map((value, index) => {
                                if (value.Code == "USULAN_PENELITIAN") {
                                    return (
                                        <div key={`header-research-${index}`} className="grid items-center gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                                            <div className="flex flex-row items-center gap-[25px]">
                                                <DocumentUpload size={40} />
                                                <div>
                                                    <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2] max-w-[480px]">
                                                        {value.Title}
                                                    </h2>
                                                    <p className="text-xl">
                                                        {value.Content}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="lg:text-end lg:max-w-[412px] lg:ml-auto">
                                                <p className="mb-[20px]">
                                                    {value.Content}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="mt-20 container mx-auto">
                <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="600"
                    data-aos-once="true"
                >
                    <ResearchProposalForm />
                    {/* <ResearchProposalCard /> */}
                </div>
            </div>
        </>
    )
}

export default CreateResearchProposal