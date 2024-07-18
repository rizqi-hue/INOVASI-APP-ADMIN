"use client";

import { ArrowRight2 } from "iconsax-react";

import dotLines from "/public/NcImages/dot-lines.png";
import { NcImage } from "../../../components";
import { Link } from "react-router-dom";

const ServicesCard = () => {
    return (
        <>
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 items-center mb-[40px] md:mb-[60px]">
                    <div className="relative max-w-[536px]">
                        <h4 className="text-black uppercase text-[15px] md:text-[17px] font-medium mb-[15px]">
                            Capabilities
                        </h4>

                        <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2]">
                            Drive traffic, generate leads, achieve success with our paid
                            search services!
                        </h2>

                        <NcImage
                            src={dotLines}
                            alt="Dot Lines"
                            className="absolute bottom-[20px] right-[-220px] rtl:right-auto rtl:left-[-220px] hidden lg:block"
                        />
                    </div>

                    <div className="md:text-end">
                        <Link
                            to="/services"
                            className="bg-black text-white text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[38px] transition duration-500 ease-in-out hover:bg-[#EF4335]"
                        >
                            view all services{" "}
                            <ArrowRight2
                                className="inline-block relative -top-[2px]"
                                size={20}
                            />
                        </Link>
                    </div>
                </div>

                {/* Services Card */}
                <div className="grid gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
                    <div
                        className="bg-white rounded-[20px] py-[50px] px-[40px] hover:bg-[#FAF4F4] transition delay-100 duration-300 ease-in-out"

                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        <div className="bg-[#F2F2F8] w-[70px] h-[70px] leading-[70px] rounded-full text-center mb-[15px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                className="inline-block"
                            >
                                <path
                                    d="M1.37996 21.9998C0.971339 22.7083 0.731136 23.5013 0.677926 24.3174C0.624715 25.1336 0.759922 25.951 1.07309 26.7065C1.38626 27.4621 1.869 28.1355 2.48399 28.6747C3.09898 29.2139 3.82973 29.6044 4.61975 29.816C5.40976 30.0277 6.23788 30.0548 7.04005 29.8953C7.84223 29.7358 8.59697 29.394 9.24593 28.8962C9.89488 28.3984 10.4207 27.7581 10.7826 27.0246C11.1446 26.2912 11.333 25.4843 11.3333 24.6665C11.3338 23.492 10.9465 22.3503 10.2318 21.4184C9.51698 20.4866 8.5146 19.8167 7.38017 19.5127C6.24575 19.2088 5.04273 19.2878 3.9578 19.7375C2.87287 20.1872 1.96672 20.9824 1.37996 21.9998Z"
                                    fill="#EF4335"
                                />
                                <path
                                    d="M9.3866 8.1333L3.3866 18.5333C4.33816 18.1276 5.37108 17.9489 6.40364 18.0113C7.4362 18.0737 8.44007 18.3756 9.33583 18.893C10.2316 19.4104 10.9946 20.1291 11.5646 20.9924C12.1346 21.8556 12.4959 22.8396 12.6199 23.8666L15.2333 19.3333C10.2733 10.76 9.55326 9.93997 9.3866 8.1333Z"
                                    fill="#EF4335"
                                />
                                <path
                                    d="M30.62 21.9999C30.28 21.4266 20.5333 4.48655 20.34 4.23989C19.5377 3.1208 18.3336 2.35541 16.9797 2.1039C15.6259 1.85239 14.2273 2.13425 13.0765 2.8905C11.9258 3.64675 11.1121 4.81878 10.8058 6.16128C10.4996 7.50379 10.7244 8.91272 11.4333 10.0932C11.3667 10.0932 11.1 9.51989 21.38 27.3332C21.7302 27.9399 22.1965 28.4717 22.7522 28.8982C23.3079 29.3247 23.9422 29.6376 24.6188 29.819C25.2954 30.0004 26.0011 30.0467 26.6957 29.9554C27.3902 29.864 28.06 29.6367 28.6667 29.2866C29.2734 28.9364 29.8052 28.4701 30.2317 27.9144C30.6582 27.3587 30.9711 26.7244 31.1525 26.0478C31.3338 25.3711 31.3802 24.6654 31.2888 23.9709C31.1975 23.2763 30.9702 22.6066 30.62 21.9999Z"
                                    fill="#EF4335"
                                />
                            </svg>
                        </div>

                        <h3 className="text-black text-[20px] md:text-[22px] font-semibold mb-[10px]">
                            Google Ads
                        </h3>
                        <p>
                            Work closely with clients to understand their business goals,
                            target audience, and budget. Develop a comprehensive
                        </p>

                        <Link
                            to="/services/service-details/"
                            className="text-black text-[14px] mt-[25px] font-medium inline-block uppercase transition duration-500 ease-in-out hover:text-[#EF4335]"
                        >
                            read more{" "}
                            <ArrowRight2
                                className="inline-block relative -top-[2px]"
                                size={20}
                                color="#EF4335"
                            />
                        </Link>
                    </div>

                    <div
                        className="bg-white rounded-[20px] py-[50px] px-[40px] hover:bg-[#FAF4F4] transition delay-100 duration-300 ease-in-out"

                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        <div className="bg-[#F2F2F8] w-[70px] h-[70px] leading-[70px] rounded-full text-center mb-[15px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                className="inline-block"
                            >
                                <g clipPath="url(#clip0_126_236)">
                                    <path
                                        d="M0 17.5442V26.8651L13.307 28.776V17.5442H0Z"
                                        fill="#EF4335"
                                    />
                                    <path
                                        d="M13.307 3.22607L0 5.13692V14.4578H13.307V3.22607Z"
                                        fill="#EF4335"
                                    />
                                    <path
                                        d="M32 14.4579V0.384277L16.3955 2.62397V14.4579H32Z"
                                        fill="#EF4335"
                                    />
                                    <path
                                        d="M16.3955 29.3781L32 31.6156V17.5442H16.3955V29.3781Z"
                                        fill="#EF4335"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_126_236">
                                        <rect width="32" height="32" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        <h3 className="text-black text-[20px] md:text-[22px] font-semibold mb-[10px]">
                            Microsoft Ads
                        </h3>
                        <p>
                            Work closely with clients to understand their business goals,
                            target audience, and budget. Develop a comprehensive
                        </p>

                        <Link
                            to="/services/service-details/"
                            className="text-black text-[14px] mt-[25px] font-medium inline-block uppercase transition duration-500 ease-in-out hover:text-[#EF4335]"
                        >
                            read more{" "}
                            <ArrowRight2
                                className="inline-block relative -top-[2px]"
                                size={20}
                                color="#EF4335"
                            />
                        </Link>
                    </div>

                    <div
                        className="bg-white rounded-[20px] py-[50px] px-[40px] hover:bg-[#FAF4F4] transition delay-100 duration-300 ease-in-out"

                        data-aos="fade-up"
                        data-aos-delay="300"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        <div className="bg-[#F2F2F8] w-[70px] h-[70px] leading-[70px] rounded-full text-center mb-[15px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                className="inline-block"
                            >
                                <g clipPath="url(#clip0_127_274)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.93614 19.663C2.78964 19.6622 0.215576 17.0876 0.215576 13.941C0.215576 10.7939 2.79045 8.21902 5.93758 8.21902L10.8628 8.21909C10.8628 11.987 10.9905 15.9433 10.8628 19.663H5.93614ZM10.9353 21.8292C11.0341 22.7781 11.2251 23.7182 11.5236 24.6155C11.9755 25.9733 12.7038 27.3045 13.7752 28.2725C13.9814 28.4589 14.0624 28.7202 14.0084 28.9915L13.5319 31.3871C13.4806 31.6451 13.3182 31.8423 13.074 31.9407C12.8225 32.042 12.575 32.013 12.3529 31.8585C10.589 30.6308 9.30083 28.8268 8.4587 26.8682C7.7737 25.2751 7.36895 23.5611 7.20858 21.8292H10.9353ZM13.029 7.96552V19.8717C19.117 21.1968 24.1798 24.8327 29.0173 27.8476C29.6029 28.2127 30.3388 27.9828 30.9066 27.6073C31.4745 27.2318 31.7845 26.6711 31.7845 26.019V1.9794C31.7845 1.32958 31.4767 0.770522 30.912 0.39471C30.3472 0.0189599 29.6553 -0.139103 29.03 0.146647C24.6363 2.15546 19.0411 6.38565 13.029 7.96552Z"
                                        fill="#EF4335"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_127_274">
                                        <rect width="32" height="32" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        <h3 className="text-black text-[20px] md:text-[22px] font-semibold mb-[10px]">
                            Social Media Ads
                        </h3>
                        <p>
                            Work closely with clients to understand their business goals,
                            target audience, and budget. Develop a comprehensive
                        </p>

                        <Link
                            to="/services/service-details/"
                            className="text-black text-[14px] mt-[25px] font-medium inline-block uppercase transition duration-500 ease-in-out hover:text-[#EF4335]"
                        >
                            read more{" "}
                            <ArrowRight2
                                className="inline-block relative -top-[2px]"
                                size={20}
                                color="#EF4335"
                            />
                        </Link>
                    </div>

                    <div
                        className="bg-white rounded-[20px] py-[50px] px-[40px] hover:bg-[#FAF4F4] transition delay-100 duration-300 ease-in-out"

                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-duration="600"
                        data-aos-once="true"
                    >
                        <div className="bg-[#F2F2F8] w-[70px] h-[70px] leading-[70px] rounded-full text-center mb-[15px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                className="inline-block"
                            >
                                <path
                                    d="M5.09959 6.90894C5.00858 6.90864 4.92075 6.94244 4.85344 7.0037C4.78613 7.06496 4.74421 7.14921 4.73595 7.23985L2.55413 31.2398C2.55013 31.2902 2.55655 31.3408 2.57298 31.3885C2.58941 31.4362 2.6155 31.48 2.64962 31.5172C2.68374 31.5544 2.72516 31.5842 2.7713 31.6047C2.81744 31.6251 2.8673 31.6359 2.91777 31.6362H19.9687L22.216 6.90894H5.09959Z"
                                    fill="#EF4335"
                                />
                                <path
                                    d="M9.59636 5.35614C9.69709 4.18885 10.2332 3.10216 11.0982 2.31193C11.9632 1.5217 13.0938 1.08575 14.2655 1.09069C14.6443 1.09002 15.0217 1.13644 15.3891 1.22887C14.6998 1.6753 14.1217 2.27332 13.6988 2.97728C13.2759 3.68123 13.0195 4.47251 12.9491 5.29069L12.8691 6.1816H13.5964L13.6727 5.35614C13.7444 4.54932 14.0239 3.77485 14.4841 3.10824C14.9442 2.44162 15.5692 1.90562 16.2982 1.5525C17.1562 1.96474 17.8684 2.62847 18.34 3.45538C18.8116 4.2823 19.0203 5.2332 18.9382 6.1816H19.6691C19.7744 4.75689 19.3127 3.34825 18.3843 2.26238C17.456 1.17651 16.1363 0.501328 14.7126 0.38384C13.2888 0.266353 11.8763 0.716072 10.7825 1.63508C9.68878 2.5541 9.00236 3.86798 8.87272 5.29069L8.79272 6.1816H9.52L9.59636 5.35614Z"
                                    fill="#EF4335"
                                />
                                <path
                                    d="M18.3455 1.0908C18.9951 1.09081 19.6375 1.22584 20.2321 1.48731C20.8267 1.74878 21.3604 2.13098 21.7994 2.60967C22.2384 3.08836 22.5732 3.65308 22.7824 4.268C22.9916 4.88291 23.0707 5.5346 23.0146 6.18171H23.7419C23.7977 5.43892 23.6996 4.69262 23.4537 3.98949C23.2078 3.28637 22.8195 2.64156 22.3129 2.09543C21.8064 1.5493 21.1926 1.11359 20.5099 0.815583C19.8273 0.517576 19.0904 0.363679 18.3455 0.363525C18.0028 0.36349 17.6607 0.39514 17.3237 0.458071C17.6462 0.639523 17.9507 0.851396 18.2328 1.0908H18.3455Z"
                                    fill="#EF4335"
                                />
                                <path
                                    d="M27.2799 7.23984C27.2718 7.14942 27.2301 7.06532 27.163 7.00409C27.096 6.94285 27.0085 6.90891 26.9177 6.90894H25.4631V28.1784L29.4468 31.0755L27.2799 7.23984Z"
                                    fill="#EF4335"
                                />
                                <path
                                    d="M21.0833 31.6328C21.089 31.633 21.094 31.6364 21.0997 31.6364H28.9817L25.0961 28.8108L21.0833 31.6328Z"
                                    fill="#EF4335"
                                />
                                <path
                                    d="M24.7361 6.90894H22.9492L20.762 30.9693L24.7361 28.1744V6.90894Z"
                                    fill="#EF4335"
                                />
                            </svg>
                        </div>
                        <h3 className="text-black text-[20px] md:text-[22px] xl:text-[21px] 2xl:text-[22px] font-semibold mb-[10px]">
                            Shopping Campaign
                        </h3>
                        <p>
                            Work closely with clients to understand their business goals,
                            target audience, and budget. Develop a comprehensive
                        </p>

                        <Link
                            to="/services/service-details/"
                            className="text-black text-[14px] mt-[25px] font-medium inline-block uppercase transition duration-500 ease-in-out hover:text-[#EF4335]"
                        >
                            read more{" "}
                            <ArrowRight2
                                className="inline-block relative -top-[2px]"
                                size={20}
                                color="#EF4335"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesCard;
