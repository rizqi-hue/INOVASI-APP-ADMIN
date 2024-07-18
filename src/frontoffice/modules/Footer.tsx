/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight2, } from "iconsax-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createMessage } from "./messageSlice";


import Asean from "../assets/images/asean.png";
import Blu from "../assets/images/blu.png";
import Bpjph from "../assets/images/bpjph_logo.png";
import Halal from "../assets/images/halal_purple.png";
import Pusaka from "../assets/images/pusaka.png";
import { NcImage } from "../components";
import { Email, FacebookOutlined, Instagram, Twitter, WhatsApp, YouTube } from "@mui/icons-material";

type MessageForm = {
  Message: string;
  Name: string;
  PhoneNumber: string;
};

const Footer = () => {
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required("Nama tidak boleh kosong"),
    Message: Yup.string().required("Pesan tidak boleh kosong"),
    PhoneNumber: Yup.string().required("No HP tidak boleh kosong"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageForm>({
    resolver: yupResolver<any>(validationSchema),
  });

  const { isCreateSuccess, isFetching } = useAppSelector(
    (state) => state.message
  );

  const doCreateMessage = (data: MessageForm) => {
    dispatch(createMessage({
      ...data,
      Status: "Baru"
    }));
  };

  useEffect(() => {
    if (isCreateSuccess) {
      reset({
        Name: "",
        PhoneNumber: "",
        Message: "",
      })
    }
  }, [isCreateSuccess])

  return (
    <>

      <div className="container mx-auto relative z-1">
        <div className="bg-[#e2e2e7] rounded-[20px] p-[30px] px-[40px]">
          <div className="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
            {/* Solutions */}
            <div
              data-aos="fade-in"
              data-aos-delay="100"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <NcImage src={Bpjph} alt="brand" className="object-cover h-14 rounded-2xl mb-7" />
              <div className="flex flex-row justify-between mb-7">
                <NcImage src={Halal} alt="brand" className="object-cover h-14 rounded-2xl" />
                <NcImage src={Pusaka} alt="brand" className="object-cover h-14 rounded-2xl" />
                <NcImage src={Blu} alt="brand" className="object-cover h-14 rounded-2xl" />
                <NcImage src={Asean} alt="brand" className="object-cover h-14 rounded-2xl" />
              </div>
              <div>
                Jl. Raya Pd. Gede No.13, RW.1, Pinang Ranti, Kec Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13560
              </div>
            </div>

            {/* Resources */}
            <div
              data-aos="fade-in"
              data-aos-delay="200"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <h3 className="text-black font-semibold text-[20px] md:text-[22px] mb-[20px]">
                Ikuti Kami
              </h3>

              <ul className="list-none space-y-[12px]">
                <li className="flex flex-row gap-4 mb-10">
                  <FacebookOutlined fontSize="large" />
                  <Instagram fontSize="large" />
                  <YouTube fontSize="large" />
                  <Twitter fontSize="large" />
                </li>
                <li className="flex flex-row items-center gap-4">
                  <WhatsApp fontSize="large" /> +62811-8010-3146
                </li>
                <li className="flex flex-row  items-center gap-4">
                  <Email fontSize="large" /> layanan@kemenag.go.id
                </li>
              </ul>
            </div>


            <div
              data-aos="fade-in"
              data-aos-delay="400"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <h3 className="text-black font-semibold text-[20px] md:text-[22px] mb-[20px]">
                Hubungi Kami
              </h3>

              <form
                onSubmit={handleSubmit(doCreateMessage)}
                className="mb-[20px]">


                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="mb-2 block w-full px-[30px] py-[15px] bg-white border-0 rounded-[50px] placeholder-[#4C4C4C]
                    focus:outline-none 
                  "
                  {...register("Name")}
                />
                {
                  errors.Name && (<span className="ml-5 text-red-500">{errors.Name?.message}</span>)
                }

                <input
                  type="text"
                  placeholder="No Hp"
                  className="mb-2 block w-full px-[30px] py-[15px] bg-white border-0 rounded-[50px] placeholder-[#4C4C4C]
                    focus:outline-none 
                  "
                  {...register("PhoneNumber")}
                />
                {
                  errors.PhoneNumber && (<span className="ml-5 text-red-500">{errors.PhoneNumber?.message}</span>)
                }

                <input
                  type="text"
                  placeholder="Pesan"
                  className="block w-full px-[30px] py-[15px] bg-white border-0 rounded-[50px] placeholder-[#4C4C4C]
                    focus:outline-none 
                  "
                  {...register("Message")}
                />
                {
                  errors.Message && (<span className="ml-5 text-red-500">{errors.Message?.message}</span>)
                }

                <button
                  type="submit"
                  disabled={isFetching}
                  className="bg-black text-white text-[14px] font-medium block w-full uppercase rounded-full py-[15px] px-[15px] mt-[15px] transition duration-500 ease-in-out hover:bg-[#EF4335]"
                >
                  {
                    isFetching ?
                      <>
                        Sedang Mengirim ...
                      </> :
                      <>
                        Kirim Pesan
                      </>
                  }
                  <ArrowRight2
                    className="inline-block relative -top-[2px]"
                    size={20}
                  />
                </button>

                {
                  isCreateSuccess && (
                    <div id="alert-additional-content-3" className="mt-3 p-2 mb-4 text-green-800 border border-green-300 rounded-full bg-white " role="alert">
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <h3 className=" font-medium">Pesan berhasil dikirim</h3>
                      </div>
                    </div>
                  )
                }



              </form>

              {/* SocialLinks */}
            </div>

            {/* Signup Newsletter */}
            {/* <SignupNewsletter /> */}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-[30px]">
          <div className="grid items-center gap-[15px] md:gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="text-center md:text-left">
              <h6>
                ©<span className="text-black">unreadhub</span>. All Rights Reserved
                by{" "}
                <a
                  href="https://unreadhub.com/"
                  target="_blank"
                  className="text-black hover:text-[#EF4335]"
                >
                  unreadhub.com
                </a>
              </h6>
            </div>

            <div className="text-center md:text-end">
              <ul>
                <li className="inline-block mr-[30px] last:mr-[0px] relative before:content-[''] before:absolute before:right-[-15px] before:bg-[#000] before:h-[15px] before:w-[1px] before:top-[6px] before:hidden lg:before:block last-of-type:before:hidden">
                  <Link
                    to="#"
                    className="text-black hover:text-[#EF4335]"
                  >
                    Privacy & Policy
                  </Link>
                </li>

                <li className="inline-block mr-[30px] last:mr-[0px] relative before:content-[''] before:absolute before:right-[-15px] before:bg-[#000] before:h-[15px] before:w-[1px] before:top-[6px] before:hidden lg:before:block last-of-type:before:hidden">
                  <Link
                    to="#"
                    className="text-black hover:text-[#EF4335]"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
