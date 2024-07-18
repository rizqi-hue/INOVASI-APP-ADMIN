"use client";


import { FoodBankRounded, FoodBankSharp, MedicalInformationOutlined, ProductionQuantityLimits, SettingsSuggestRounded } from "@mui/icons-material";
import { NcImage } from "../../../components";

import dotLines from "../../../assets/images/dot-lines.png"

const ServicesCard = () => {
  return (
    <>
      <div className="container mx-auto mt-10">
        {/* Section Header */}
        <div className="flex justify-start items-center mb-[40px] ">
          <div className="relative max-w-[336px]">

            {/* <NcImage
              src={dotLines}
              alt="Dot Lines"
              className="transform  scale-x-[-1] top-3 absolute bottom-[20px] right-[290px] rtl:right-auto rtl:left-[290px] hidden lg:block"
            /> */}

            <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2]">
              Inovasi dan Riset < br />
              Industri Halal
            </h2>

            <NcImage
              src={dotLines}
              alt="Dot Lines"
              className="top-3 absolute bottom-[20px] right-[-270px] rtl:right-auto rtl:left-[-270px] hidden lg:block"
            />
          </div>

          {/* <div className="md:text-end">
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
          </div> */}
        </div>

        {/* Services Card */}
        <div className="grid gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
          <div
            className="bg-white rounded-[20px] py-[50px] px-[40px]  transition delay-100 duration-300 ease-in-out"

            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-once="true"
          >
            <div className="bg-[#F2F2F8] w-[70px] h-[70px] leading-[60px] rounded-full text-center mb-[15px]">
              <FoodBankRounded style={{ fontSize: "45px" }} className="text-primary-500" />
            </div>

            <h3 className="text-black text-[20px] md:text-[22px] font-semibold mb-[10px]">
              Makanan & Minuman
            </h3>
            <p>
              Riset dan Inovasi bahan baku makanan dan minuman halal
            </p>

            {/* <Link
              to="/services/service-details/"
              className="text-black text-[14px] mt-[25px] font-medium inline-block uppercase transition duration-500 ease-in-out hover:text-[#EF4335]"
            >
              read more{" "}
              <ArrowRight2
                className="inline-block relative -top-[2px]"
                size={20}
                color="#EF4335"
              />
            </Link> */}
          </div>

          <div
            className="bg-white rounded-[20px] py-[50px] px-[40px]  transition delay-100 duration-300 ease-in-out"

            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="600"
            data-aos-once="true"
          >
            <div className="bg-[#F2F2F8] w-[70px] h-[70px] leading-[60px] rounded-full text-center mb-[15px]">
              <MedicalInformationOutlined style={{ fontSize: "45px" }} className="text-primary-500" />
            </div>

            <h3 className="text-black text-[20px] md:text-[22px] font-semibold mb-[10px]">
              Farmasi
            </h3>
            <p>
              Riset dan Inovasi bahan baku makanan dan minuman halal
            </p>

            {/* <Link
              to="/services/service-details/"
              className="text-black text-[14px] mt-[25px] font-medium inline-block uppercase transition duration-500 ease-in-out hover:text-[#EF4335]"
            >
              read more{" "}
              <ArrowRight2
                className="inline-block relative -top-[2px]"
                size={20}
                color="#EF4335"
              />
            </Link> */}
          </div>

          <div
            className="bg-white rounded-[20px] py-[50px] px-[40px]  transition delay-100 duration-300 ease-in-out"

            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="600"
            data-aos-once="true"
          >
            <div className="bg-[#F2F2F8] w-[70px] h-[70px] leading-[60px] rounded-full text-center mb-[15px]">
              <SettingsSuggestRounded style={{ fontSize: "45px" }} className="text-primary-500" />
            </div>

            <h3 className="text-black text-[20px] md:text-[22px] font-semibold mb-[10px]">
              Mesin Produksi
            </h3>
            <p>
              Riset dan Inovasi bahan baku makanan dan minuman halal
            </p>
            {/* 
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
            </Link> */}
          </div>

          <div
            className="bg-white rounded-[20px] py-[50px] px-[40px] transition delay-100 duration-300 ease-in-out"

            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="600"
            data-aos-once="true"
          >
            <div className="bg-[#F2F2F8] w-[70px] h-[70px] leading-[60px] rounded-full text-center mb-[15px]">
              <ProductionQuantityLimits style={{ fontSize: "45px" }} className="text-primary-500" />
            </div>
            <h3 className="text-black text-[20px] md:text-[22px] xl:text-[21px] 2xl:text-[22px] font-semibold mb-[10px]">
              Kosmetik
            </h3>
            <p>
              Riset dan Inovasi bahan baku makanan dan minuman halal
            </p>

            {/* <Link
              to="/services/service-details/"
              className="text-black text-[14px] mt-[25px] font-medium inline-block uppercase transition duration-500 ease-in-out hover:text-[#EF4335]"
            >
              read more{" "}
              <ArrowRight2
                className="inline-block relative -top-[2px]"
                size={20}
                color="#EF4335"
              />
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesCard;
