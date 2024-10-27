import { ArrowRight } from "@mui/icons-material";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";

interface CardCounterProps {
  title: string;
  counter: string;
  link: string;
}

export default function CardCounter(props: Partial<CardCounterProps>) {
  const { title, counter, link = "/" } = props;

  return (
    <>
      <Card
        sx={{
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "#535353"
              : `linear-gradient(to right, #8975fb 0%, #746be7 35%), linear-gradient(to bottom, #8975fb 0%, #6f4ceb 50%), #6f4ceb`,

          height: "110px",
        }}
      >
        <section className="w-full h-full justify-center antialiased text-gray-600">
          <div className="h-full">
            <div className="max-w-2xl mx-auto rounded-lg">
              <div className="px-1 md:px-3 py-2 md:py-4">
                <div className="flex items-start">
                  <svg
                    className="fill-current flex-shrink-0 mr-2 md:mr-5"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                  >
                    <path
                      className="text-indigo-300"
                      d="m16 14.883 14-7L14.447.106a1 1 0 0 0-.895 0L0 6.883l16 8Z"
                    />
                    <path
                      className="text-indigo-200"
                      d="M16 14.619v15l13.447-6.724A.998.998 0 0 0 30 22V7.619l-14 7Z"
                    />
                    <path
                      className="text-indigo-500"
                      d="m16 14.619-16-8V21c0 .379.214.725.553.895L16 29.619v-15Z"
                    />
                  </svg>
                  <div className="flex-grow truncate">
                    <div className="w-full sm:flex justify-between items-center">
                      <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">
                        {counter}
                      </h2>
                    </div>
                    <div className="flex items-end justify-between whitespace-normal">
                      <div className="max-w-md text-indigo-100 mr-5">
                        <p className="mb-2 whitespace-nowrap">{title}</p>
                      </div>
                      <Link
                        className="flex-shrink-0 flex items-center justify-center text-indigo-600 w-10 h-10 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 hover:from-white hover:to-indigo-50 focus:outline-none focus-visible:from-white focus-visible:to-white transition duration-150 ml-2"
                        to={link}
                      >
                        <span className="block font-bold">
                          <span className="sr-only">Read more</span>
                          <ArrowRight className="w-5 text-gray-600" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Card>
    </>
  );
}
