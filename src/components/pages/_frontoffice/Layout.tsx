import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import { getsReferensi } from "./ReferensiSlice";
import Navbar from "../../layout/NavBar";
import { useAppDispatch } from "../../../app/hooks";

const FrontOfficeLayout = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function _getsProfile() {
      await dispatch(getsReferensi({ filter: { Status: "Publish" } }));
    }

    _getsProfile();

  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <div className="mt-20 gradient-bg pt-10">
        <Footer />
      </div>
    </>
  );
};

export default FrontOfficeLayout;
