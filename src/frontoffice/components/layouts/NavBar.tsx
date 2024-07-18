/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { ArrowDown2, ArrowRight2 } from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getsMenu } from "./services/NavBarSlice";
import { NcImage } from "../atoms";
import Logo from "../../assets/images/logo_secondary_white.png"

const Navbar: React.FC = () => {
    const currentRoute = useLocation().pathname;

    const dispatch = useAppDispatch();
    const { list, isError } = useAppSelector(
        (state) => state.menu
    );

    useEffect(() => {
        async function _getsMenu() {
            await dispatch(getsMenu({ filter: { IsActive: true } }));
        }

        _getsMenu();

        if (isError) {
            // 
        }

    }, [isError]);

    // Sticky Navbar
    useEffect(() => {
        const elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId?.classList.add("isSticky");
            } else {
                elementId?.classList.remove("isSticky");
            }
        });

        return () => {
            document.removeEventListener("scroll", () => {
                if (window.scrollY > 170) {
                    elementId?.classList.add("isSticky");
                } else {
                    elementId?.classList.remove("isSticky");
                }
            });
        };
    }, []);

    // Toggle active class
    const [isActive, setActive] = useState<boolean>(false);
    const handleToggleSearchModal = () => {
        setActive(!isActive);
    };

    return (
        <>
            <div
                id="navbar"
                className="navbar-area bg-[#670075] relative z-[2] py-[20px] lg:py-[20px] xl:py-0"
            >
                <div className="container mx-auto lg:max-w-[1710px]">
                    <nav
                        className={`navbar relative flex flex-wrap ${isActive ? "active" : ""
                            }`}
                    >
                        <div className="self-center">
                            <Link to="/">
                                <NcImage src={Logo} className="inline w-8" alt="logo" />
                            </Link>
                        </div>

                        {/* Toggle button */}
                        <button
                            className="navbar-toggler absolute ml-auto right-0 top-[4px] xl:hidden"
                            type="button"
                            onClick={handleToggleSearchModal}
                        >
                            <span className="burger-menu text-white cursor-pointer leading-none text-[30px]">
                                <i className="bx bx-menu"></i>
                            </span>
                        </button>

                        <div className="navbar-collapse flex self-center grow basis-auto">
                            <ul className="navbar-nav self-center flex-row mr-auto xl:flex xl:pl-[35px] 2xl:pl-[70px]">

                                {
                                    list.data.map((value, index) => {

                                        let IsSubMenu = false;

                                        list.data.map((_value) => {
                                            if (_value.ParentCode === value.Code) {
                                                IsSubMenu = true;
                                            }
                                        })

                                        if (value.IsActive) {
                                            if (!IsSubMenu && value.IsMenu) {
                                                return (
                                                    <li key={`menu-${index}`} className="xl:mx-[15px] 2xl:mx-[18px] py-[10px] lg:py-[15px] xl:py-[23px] relative group last:mr-0 first:ml-0">
                                                        <Link
                                                            to={value.Path}
                                                            className={`uppercase text-[14px] font-bold transition-all hover:text-gray-200 ${currentRoute === value.Path
                                                                ? "text-white"
                                                                : "text-white"
                                                                }`}
                                                        >
                                                            {value.Name}
                                                        </Link>
                                                    </li>
                                                )
                                            }

                                            if (IsSubMenu && value.IsMenu) {
                                                return (
                                                    <li key={`menu-${index}`} className="xl:mx-[15px] 2xl:mx-[18px] py-[10px] lg:py-[15px] xl:py-[23px] relative group last:mr-0 first:ml-0">
                                                        <Link
                                                            to="#"
                                                            className="flex flex-row items-center text-white uppercase text-[14px] font-bold transition-all hover:text-gray-200 "
                                                            onClick={(e: any) => e.preventDefault()}
                                                        >
                                                            {value.Name}
                                                            <ArrowDown2 className="ml-2 w-4 font-bold" />
                                                        </Link>
                                                        <ul className="absolute rounded-b-xl bg-white border left-0 w-[270px] top-[100%] shadow-dropdown py-[15px] opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                                                            {
                                                                list.data.map((__value, index) => {
                                                                    if (__value.IsActive) {
                                                                        if (__value.ParentCode === value.Code) {
                                                                            return (
                                                                                <li key={`submenu-${index}`} className="py-[7px] px-[22px]">
                                                                                    <Link
                                                                                        to={__value.Path}
                                                                                        className={`block text-[15px] transition-all hover:text-primary-700 ${currentRoute === __value.Path ? "text-primary-500" : "text-black"
                                                                                            }`}
                                                                                    >
                                                                                        {__value.Name}
                                                                                    </Link>
                                                                                </li>
                                                                            )
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        </ul>
                                                    </li>
                                                )
                                            }
                                        }

                                    })
                                }

                            </ul>

                            <div className="other-options self-center sm:flex sm:items-center sm:space-x-[20px] space-y-[20px] sm:space-y-[0] border-t border-[#eeeeee] pt-[20px] xl:pt-[0] pb-[10px] xl:pb-[0] xl:border-none xl:ml-[40px] 2xl:ml-[30px]">
                                {/* <SearchInput /> */}

                                <a
                                    href={`${import.meta.env.VITE_CURRENTURL}/#/login`}
                                    className="bg-white  text-[#670075] text-[14px] font-medium inline-block uppercase rounded-full py-[15px] px-[30px] transition duration-500 ease-in-out "
                                >
                                    Masuk
                                    <ArrowRight2
                                        className="inline-block relative -top-[2px]"
                                        size={20}
                                    />
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;
