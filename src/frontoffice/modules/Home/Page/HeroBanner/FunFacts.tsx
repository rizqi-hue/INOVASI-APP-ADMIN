"use client";

import { ArrowRight2 } from "iconsax-react";
import { NcImage } from "../../../../components";
import { Link } from "react-router-dom";

const FunFacts = () => {
  return (
    <>
      <div 
        className="xl:flex xl:items-center space-y-6 xl:space-y-0 xl:space-x-[25px] mt-[40px] md:mt-[60px] lg:mt-[50px] xl:mt-[60px] 2xl:mt-[76px]"

        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="600"
      >
        <div
          className="flex items-center space-x-4 rounded-[4px] py-[16px] px-[23px]"
          style={{ background: "rgba(0, 0, 0, 0.15)" }}
        >
          <NcImage className="w-[46px]" src={''} alt="award" />

          <div>
            <p className="font-medium text-white text-[15px] md:text-[16px] lg:text-[14px] 2xl:text-[16px]">
              Award Winning Agency
            </p>
            <p className="font-medium text-white">
              <span className="font-bold text-[16px] lg:text-[16px] xl:text-[16px] md:text-[20px]">
                3500+
              </span>{" "}
              Active Clients
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 border border-[#f37979] px-3 py-5 sm:p-5 lg:border-0 lg:p-0">
          <div className="flex -space-x-2 shrink-0">
            <NcImage
              className="inline-block h-[38px] w-[38px] sm:h-[46px] sm:w-[46px] rounded-full ring-[3px] ring-white"
              // src={user1}
              alt="user1"
            />

            <NcImage
              className="inline-block h-[38px] w-[38px] sm:h-[46px] sm:w-[46px] rounded-full ring-[3px] ring-white"
              alt="user2"
            />

            <NcImage
              className="inline-block h-[38px] w-[38px] sm:h-[46px] sm:w-[46px] rounded-full ring-[3px] ring-white"
              alt="user3"
            />
          </div>

          <div className="font-medium">
            <Link
              to="/team"
              className="xl:text-[15px] 2xl:text-[16px] font-medium text-white transition duration-500 ease-in-out hover:text-[#000]"
            >
              Meet Our Experts{" "}
              <ArrowRight2 className="inline-block relative" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FunFacts;
