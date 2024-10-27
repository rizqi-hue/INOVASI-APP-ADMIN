"use client";

import { Link } from "react-router-dom";
import { NcImage } from "../../../../atoms";


// import author from "/public/NcImages/author.png";
// import blogPostImg1 from "/public/NcImages/blog-post1.jpg";
// import blogPostImg2 from "/public/NcImages/blog-post2.jpg";
// import blogPostImg3 from "/public/NcImages/blog-post3.jpg";

const OurBlog = () => {
  return (
    <>
      <div className="py-[50px] md:py-[60px] lg:py-[80px] xl:py-[100px]">
        <div className="container mx-auto">
          {/* Section Header */}
          <div
            className="max-w-[648px] mx-auto text-center mb-[30px] md:mb-[60px]"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
            data-aos-once="true"
          >
            <h4 className="text-black uppercase text-[15px] md:text-[17px] font-medium mb-[15px]">
              our blog
            </h4>

            <h2 className="text-black font-semibold text-[25px] md:text-[30px] lg:text-[32px] xl:text-[36px] leading-[1.2]">
              Your path to paid search excellence starts here!
            </h2>
          </div>

          {/* Blog Post */}
          <div className="grid gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
            {/* Blog Post 1 */}
            <div
              className="bg-[#FAF4F4] rounded-[20px] p-[20px] sm:p-[45px]"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <div className="flex items-center space-x-[15px] mb-[30px]">
                <div className="shrink-0">
                  <NcImage alt="author" className="w-[46px]" />
                </div>

                <div>
                  <p className="leading-none text-[15px] mb-[9px]">Posted by</p>
                  <h4 className="text-black font-medium text-[15px] md:text-[18px] leading-none">
                    Adla
                  </h4>
                </div>
              </div>

              <Link to="/blog/blog-details">
                <NcImage
                  alt="Post"
                  className="rounded-[20px] mb-[25px]"
                />
              </Link>

              <Link to="/blog/blog-details">
                <h3 className="text-black text-[20px] sm:text-[22px] font-semibold mb-[20px] hover:text-[#EF4335]">
                  Demystifying Paid Search Ads: A Beginner's Guide
                </h3>
              </Link>

              <div className="space-x-[5px] md:space-x-[10px]">
                <Link
                  to="#"
                  className="bg-[#FEE] rounded-[100px] py-[7px] px-[20px] md:px-[22px] inline-block text-[14px] md:text-[16px] hover:text-[#fff] hover:bg-[#EF4335] transition delay-100 duration-300 ease-in-out"
                >
                  Paid Advert
                </Link>
                <Link
                  to="#"
                  className="bg-[#FEE] rounded-[100px] py-[7px] px-[20px] md:px-[22px] inline-block text-[14px] md:text-[16px] hover:text-[#fff] hover:bg-[#EF4335] transition delay-100 duration-300 ease-in-out"
                >
                  Google Search
                </Link>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div
              className="bg-[#FAF4F4] rounded-[20px] p-[20px] sm:p-[45px]"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <div className="flex items-center space-x-[15px] mb-[30px]">
                <div className="shrink-0">
                  <NcImage alt="author" className="w-[46px]" />
                </div>

                <div>
                  <p className="leading-none text-[15px] mb-[9px]">Posted by</p>
                  <h4 className="text-black font-medium text-[15px] md:text-[18px] leading-none">
                    Adla
                  </h4>
                </div>
              </div>

              <Link to="/blog/blog-details">
                <NcImage
                  alt="Post"
                  className="rounded-[20px] mb-[25px]"
                />
              </Link>

              <Link to="/blog/blog-details">
                <h3 className="text-black text-[20px] sm:text-[22px] font-semibold mb-[20px] hover:text-[#EF4335]">
                  The Art of Writing Compelling Ad Copy for Paid Search
                </h3>
              </Link>

              <div className="space-x-[5px] md:space-x-[10px]">
                <Link
                  to="#"
                  className="bg-[#FEE] rounded-[100px] py-[7px] px-[20px] md:px-[22px] inline-block text-[14px] md:text-[16px] hover:text-[#fff] hover:bg-[#EF4335] transition delay-100 duration-300 ease-in-out"
                >
                  Paid Advert
                </Link>
                <Link
                  to="#"
                  className="bg-[#FEE] rounded-[100px] py-[7px] px-[20px] md:px-[22px] inline-block text-[14px] md:text-[16px] hover:text-[#fff] hover:bg-[#EF4335] transition delay-100 duration-300 ease-in-out"
                >
                  Google Search
                </Link>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div
              className="bg-[#FAF4F4] rounded-[20px] p-[20px] sm:p-[45px]"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <div className="flex items-center space-x-[15px] mb-[30px]">
                <div className="shrink-0">
                  <NcImage alt="author" className="w-[46px]" />
                </div>

                <div>
                  <p className="leading-none text-[15px] mb-[9px]">Posted by</p>
                  <h4 className="text-black font-medium text-[15px] md:text-[18px] leading-none">
                    Adla
                  </h4>
                </div>
              </div>

              <Link to="/blog/blog-details">
                <NcImage
                  alt="Post"
                  className="rounded-[20px] mb-[25px]"
                />
              </Link>

              <Link to="/blog/blog-details">
                <h3 className="text-black text-[20px] sm:text-[22px] font-semibold mb-[20px] hover:text-[#EF4335]">
                  Targeting Techniques: Reaching the Right Audience in Paid
                  Search
                </h3>
              </Link>

              <div className="space-x-[5px] md:space-x-[10px]">
                <Link
                  to="#"
                  className="bg-[#FEE] rounded-[100px] py-[7px] px-[20px] md:px-[22px] inline-block text-[14px] md:text-[16px] hover:text-[#fff] hover:bg-[#EF4335] transition delay-100 duration-300 ease-in-out"
                >
                  Paid Advert
                </Link>
                <Link
                  to="#"
                  className="bg-[#FEE] rounded-[100px] py-[7px] px-[20px] md:px-[22px] inline-block text-[14px] md:text-[16px] hover:text-[#fff] hover:bg-[#EF4335] transition delay-100 duration-300 ease-in-out"
                >
                  Google Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurBlog;
