"use client";

import { Link } from "react-router-dom";


const ReseactProposalPagination = () => {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="text-center space-x-[10px] space-y-[10px] md:space-y-[0] mt-[30px] lg:mt-[50px]">
          <li className="inline-block">
            <Link
              to="#"
              className="bg-[#FEE] w-[36px] h-[36px] leading-[32px] rounded-full inline-block text-center "
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="inline-block"
              >
                <path
                  d="M11.8048 15.4631C11.9298 15.3381 12 15.1686 12 14.9918C12 14.815 11.9298 14.6455 11.8048 14.5205L5.60948 8.32514L11.8048 2.12981C11.9262 2.00407 11.9934 1.83567 11.9919 1.66087C11.9904 1.48608 11.9203 1.31887 11.7967 1.19526C11.6731 1.07166 11.5059 1.00154 11.3311 1.00003C11.1563 0.998506 10.9879 1.0657 10.8621 1.18714L4.19548 7.85381C4.07049 7.97883 4.00028 8.14837 4.00028 8.32514C4.00028 8.50192 4.07049 8.67146 4.19548 8.79648L10.8621 15.4631C10.9872 15.5881 11.1567 15.6583 11.3335 15.6583C11.5103 15.6583 11.6798 15.5881 11.8048 15.4631Z"
                  fill="#EF4335"
                />
              </svg>
            </Link>
          </li>

          <li className="inline-block">
            <Link
              to="#"
              className="bg-[#FEE] w-[36px] h-[36px] leading-[36px] rounded-full inline-block text-center font-semibold text-[15px] hover:bg-[#EF4335] hover:text-[#fff] transition duration-500 ease-in-out"
            >
              1
            </Link>
          </li>

          <li className="inline-block">
            <Link
              to="#"
              className="bg-[#FEE] w-[36px] h-[36px] leading-[36px] rounded-full inline-block text-center font-semibold text-[15px] hover:bg-[#EF4335] hover:text-[#fff] transition duration-500 ease-in-out"
            >
              2
            </Link>
          </li>

          <li className="inline-block">
            <Link
              to="#"
              className="bg-[#FEE] w-[36px] h-[36px] leading-[36px] rounded-full inline-block text-center font-semibold text-[15px] hover:bg-[#EF4335] hover:text-[#fff] transition duration-500 ease-in-out"
            >
              3
            </Link>
          </li>

          <li className="inline-block">
            <Link
              to="#"
              className="bg-[#FEE] w-[36px] h-[36px] leading-[36px] rounded-full inline-block text-center font-semibold text-[15px] hover:bg-[#EF4335] hover:text-[#fff] transition duration-500 ease-in-out"
            >
              4
            </Link>
          </li>

          <li className="inline-block">
            <Link
              to="#"
              className="bg-[#FEE] w-[36px] h-[36px] leading-[36px] rounded-full inline-block text-center font-semibold text-[15px] hover:bg-[#EF4335] hover:text-[#fff] transition duration-500 ease-in-out"
            >
              5
            </Link>
          </li>

          <li className="inline-block">
            <Link
              to="#"
              className="bg-[#FEE] w-[36px] h-[36px] leading-[32px] rounded-full inline-block text-center "
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="inline-block"
              >
                <path
                  d="M4.19519 15.4631C4.07021 15.3381 4 15.1686 4 14.9918C4 14.815 4.07021 14.6455 4.19519 14.5205L10.3905 8.32514L4.19519 2.12981C4.07375 2.00407 4.00656 1.83567 4.00807 1.66087C4.00959 1.48608 4.07971 1.31887 4.20331 1.19526C4.32692 1.07166 4.49413 1.00154 4.66892 1.00003C4.84372 0.998506 5.01212 1.0657 5.13786 1.18714L11.8045 7.85381C11.9295 7.97883 11.9997 8.14837 11.9997 8.32514C11.9997 8.50192 11.9295 8.67146 11.8045 8.79648L5.13786 15.4631C5.01284 15.5881 4.8433 15.6583 4.66652 15.6583C4.48975 15.6583 4.32021 15.5881 4.19519 15.4631Z"
                  fill="#EF4335"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ReseactProposalPagination;
