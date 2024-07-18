"use client";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { FC } from "react";

export interface PaginationProps {
  total: number,
  perPage: number,
  page: number,
  onPreviousClick?: () => void;
  onNextClick?: () => void;
}

const Pagination: FC<PaginationProps> = ({
  total = 1,
  perPage = 1,
  page = 1,
  onPreviousClick = () => { },
  onNextClick = () => { },
}) => {

  const totalPage = Math.floor(total / perPage);

  return (
    <>
      <div className="flex flex-row w-full justify-between items-center text-center space-x-[10px] space-y-[10px] md:space-y-[0] mt-[30px] lg:mt-[50px]">
        <div className="inline-block">
          <button
            disabled={page == 1}
            onClick={onPreviousClick}
            className={`${page == 1 ? "cursor-not-allowed bg-gray-100 text-gray-200" : "bg-[#FEE] text-red-500"}  px-3 space-x-2 flex flex-row items-center h-[36px] leading-[32px] rounded-full text-center`}
          >
            <ArrowLeft2 className={`${page == 1 ? "  text-gray-200" : "text-red-500"}`} />
            <span >Sebelumnya</span>
          </button>
        </div>

        <div className="inline-block">
          <button
            disabled={(totalPage - page) < 0}
            onClick={onNextClick}
            className={`${(totalPage - page) < 0 ? "cursor-not-allowed bg-gray-100 text-gray-200" : "bg-[#FEE] text-red-500"} bg-[#FEE] px-3 space-x-2 flex flex-row items-center h-[36px] leading-[32px] rounded-full text-center`}
          >
            <span >Selanjutnya</span>
            <ArrowRight2 className={`${(totalPage - page) < 0 ? "  text-gray-200" : "text-red-500"}`} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
