import { Outlet } from "react-router-dom";
// import TopHeader from "../components/layouts/TopHeader";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import Navbar from "../components/layouts/NavBar";
import { getsReferensi } from "./ReferensiSlice";
import Footer from "./Footer";
// import { useAppSelector } from "../app/hooks";
// import { Header, HeaderLogged } from "../components";

const LayoutWithNoNews = () => {
  // const { isAuth } = useAppSelector((state) => state.auth);

  // console.log(isAuth)

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function _getsProfile() {
      await dispatch(getsReferensi({ filter: { Status: "Publish" } }));
    }

    _getsProfile();

  }, []);

  return (
    <>
      {/* <TopHeader /> */}
      <Navbar />

      {/* {isAuth ? <HeaderLogged /> : <Header />} */}
      <Outlet />

      <div className="mt-20 gradient-bg pt-10">
        <Footer />
      </div>
    </>
  );
};

export default LayoutWithNoNews;
