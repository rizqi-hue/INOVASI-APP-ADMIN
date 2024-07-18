"use client";

const Search = () => {
  return (
    <>
      <div className="search-form">
        <form className="relative block">
          <input
            className="block w-full px-[25px] py-[14px] bg-white border-0 rounded-[4px] placeholder-[#4C4C4C] focus:outline-none "
            placeholder="Search keyword"
            type="text"
            name="search"
          />

          <button
            type="submit"
            className="absolute inset-y-0 right-[15px] flex items-center pr-2 text-[28px]"
          >
            <i className="bx bx-search"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
