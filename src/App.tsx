import polyglotI18nProvider from "ra-i18n-polyglot";
import { Admin as SIHALALAdmin, Resource, CustomRoutes } from "react-admin";
import englishMessages from "./i18n/en";
import "./index.css";
import jwtDecode from "jwt-decode";

import { Layout, Login } from "./components/layout";
import { Dashboard } from "./components/pages/dashboard";

// pages
import menu from "./components/pages/menu"
import user from "./components/pages/user";
import profile from "./components/pages/profile";
import image from "./components/pages/gallery/image"
import video from "./components/pages/gallery/video"
import definisi from "./components/pages/profile/definisi"
import selayang_pandang from "./components/pages/profile/selayang_pandang"
import struktur_organisasi from "./components/pages/profile/struktur_organisasi"
import regulasi from "./components/pages/informasi/regulasi"
import sop from "./components/pages/informasi/sop"
import rinduk from "./components/pages/informasi/rinduk"
import agenda from "./components/pages/informasi/agenda"
import news from "./components/pages/informasi/news"
import referensi from "./components/pages/settings/referensi"
import usulanpenelitian from "./components/pages/usulan/usulanpenelitian"
import usulaninovasi from "./components/pages/usulan/usulaninovasi"
import dataindex from "./components/pages/kelitbangan/indeces"
import dataindexdetail from "./components/pages/kelitbangan/indecesdetail"
import inovasi from "./components/pages/inovation/pemerintah"
import research from "./components/pages/kelitbangan/research"
import researchcope from "./components/pages/kelitbangan/researchscope"
import perpustakaan from "./components/pages/perpustakaan"
import dinas_Inovation from "./components/pages/dinas_inovation/pemerintah";


import projects from "./components/pages/project";
import companyhistories from "./components/pages/companyhistory";
import visimisi from "./components/pages/visimisi";
import divisi from "./components/pages/menu";
import karyawan from "./components/pages/karyawan";
import umum from "./components/pages/umum";
import sertifikat from "./components/pages/sertifikat";
import slider from "./components/pages/slider";
import slidermobile from "./components/pages/slidermobile";
import kategoribisnis from "./components/pages/kategoribisnis";
import bisnis from "./components/pages/bisnis";
import about from "./components/pages/about";
import material from "./components/pages/material";
import materialdetail from "./components/pages/materialdetail";
import statistik from "./components/pages/statistik";
import photo from "./components/pages/photo";
import photocategory from "./components/pages/photocategory";
import footer from "./components/pages/footer";
import experience from "./components/pages/experience";
import lowongan from "./components/pages/lowongan";
import mail from "./components/pages/mail";
import bussinesLine from "./components/pages/bussinesline";
import education from "./components/pages/education";
import institution from "./components/pages/institution";
import joblevel from "./components/pages/joblevel";
import major from "./components/pages/major";
import marital from "./components/pages/marital";
import preferredjob from "./components/pages/preferredjob";
import religion from "./components/pages/religion";
import feedback from "./components/pages/feedback";
import pelamar from "./components/pages/pelamar";
import logo from "./components/pages/logo";
import bussines from "./components/pages/bussines";
import bussinescategory from "./components/pages/bussinescategory";
import bussinesdetail from "./components/pages/bussinesdetail";

import privilege from "./components/pages/userakses"
import autority from "./components/pages/userautority"

// provider
import useCurrentTheme from "./components/themes/useCurrentTheme";
import authProvider from "./services/AuthProvider/index";
import dataProvider from "./services/DataProvider/dataProvider";
import useChangeThemeColor from "./useChangeThemeColor";
import { getData } from "./utils/storage";
import { Route } from "react-router";
import FrontOfficeLayout from "./frontoffice/modules/Layout";
import { Home } from "./frontoffice/modules";
import CustomLoading from "./CustomLoading";
import RemoveAnchor from "./RemoveAnchor";
import Definisi from "./frontoffice/modules/Profile/Page/Definisi";
import OrganizationalSructure from "./frontoffice/modules/Profile/Page/OrganizationalSructure";
import Overview from "./frontoffice/modules/Profile/Page/Overview";
import InovationDigital from "./frontoffice/modules/Kelitbangan/Page/InovationDigital";
import InovationBarang from "./frontoffice/modules/Kelitbangan/Page/InovationBarang";
import InovationJasa from "./frontoffice/modules/Kelitbangan/Page/InovationJasa";
import Regulation from "./frontoffice/modules/Infomation/Page/Regulation";
import RisetBahanGunaan from "./frontoffice/modules/Infomation/Page/RisetBahanGunaan";
import Perpustakaan from "./frontoffice/modules/Infomation/Page/Perpustakaan";
import PerpustakaanDetail from "./frontoffice/modules/Infomation/Page/PerpustakaanDetail";
import Sop from "./frontoffice/modules/Infomation/Page/Sop";
import Rinduk from "./frontoffice/modules/Infomation/Page/Rinduk";
import News from "./frontoffice/modules/Event/Page/News";
import EventDetail from "./frontoffice/modules/Event/Page/EventDetail";
import Event from "./frontoffice/modules/Event/Page/Event";
import Photo from "./frontoffice/modules/Gallery/Page/Photo";
import Video from "./frontoffice/modules/Gallery/Page/Video";
import VideoDetail from "./frontoffice/modules/Gallery/Page/VideoDetail";
import IndecesImage from "./frontoffice/modules/Kelitbangan/Page/IndecesImage";
import Research from "./frontoffice/modules/Kelitbangan/Page/Research";
import ResearchDetail from "./frontoffice/modules/Kelitbangan/Page/ResearchDetail";
import Inovation from "./frontoffice/modules/Inovasi/Page/Inovasi";
import InovationDetail from "./frontoffice/modules/Kelitbangan/Page/InovationDetail";
import CreateResearchProposal from "./frontoffice/modules/Usulan/Page/CreateResearchProposal";
import ResearchProposal from "./frontoffice/modules/Usulan/Page/ResearchProposal";
import InovationProposal from "./frontoffice/modules/Usulan/Page/InovationProposal";
import CreateInovationProposal from "./frontoffice/modules/Usulan/Page/CreateInovationProposal";

// DINAS

const i18nProvider = polyglotI18nProvider(
  (locale: string) => {
    if (locale === "fr") {
      return import("./i18n/fr").then((messages) => messages.default);
    }
    return englishMessages;
  },
  "en",
  {
    allowMissing: true,
  }
);

// const history = createHashHistory()

const App = () => {
  useChangeThemeColor();
  const theme = useCurrentTheme();

  const token = getData("token")

  let decoded = {
    "iss": "",
    "exp": 0,
    "nama": "",
    "userid": "",
    "email_addr": "",
    "role": "",
    "unik_id": ""
  };

  if (token) {
    decoded = jwtDecode(token);
  }

  return (
    <SIHALALAdmin
      title=""
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={Login}
      layout={Layout}
      i18nProvider={i18nProvider}
      disableTelemetry
      // history={history}
      theme={theme}
      loading={CustomLoading}
    >
      {(permissions: string | string[]): any => (
        <>
          <RemoveAnchor />
          <CustomRoutes noLayout>
            <Route element={<FrontOfficeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/definition" element={<Definisi />} />
              <Route path="/organizational_structure" element={<OrganizationalSructure />} />
              <Route path="/overview" element={<Overview />} />

              <Route path="/platform-digital" element={<InovationDigital />} />
              <Route path="/produk-barang" element={<InovationBarang />} />
              <Route path="/produk-jasa" element={<InovationJasa />} />

              <Route path="/alat-deteksi" element={<Regulation />} />
              <Route path="/bahan-gunaan" element={<RisetBahanGunaan />} />
              <Route path="/prilaku-konsumen" element={<RisetBahanGunaan />} />

              <Route path="/perpustakaan" element={<Perpustakaan />} />
              <Route path="/perpustakaan/:id" element={<PerpustakaanDetail />} />
              <Route path="/sop" element={<Sop />} />
              <Route path="/rinduk" element={<Rinduk />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<EventDetail />} />
              <Route path="/event" element={<Event />} />
              <Route path="/event/:id" element={<EventDetail />} />
              <Route path="/photo" element={<Photo />} />
              <Route path="/video" element={<Video />} />
              <Route path="/video/:id" element={<VideoDetail />} />

              <Route path="/indices" element={<IndecesImage />} />
              <Route path="/research_result" element={<Research />} />
              <Route path="/research_result/:id" element={<ResearchDetail />} />
              <Route path="/inovation" element={<Inovation />} />
              <Route path="/inovation/:id" element={<InovationDetail />} />
              <Route path="/research_proposal/create" element={<CreateResearchProposal />} />
              <Route path="/research_proposal" element={<ResearchProposal />} />
              <Route path="/proposed_innovation_ideas" element={<InovationProposal />} />
              <Route path="/proposed_innovation_ideas/create" element={<CreateInovationProposal />} />
            </Route>
            {/* <Route element={<LayoutRegister />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/verify_forgot_password" element={<VerifyForgotPassword />} />
            </Route> */}
          </CustomRoutes>

          {permissions ? (
            permissions.includes("Admin") ? (
              <>
                <Resource name="dashboard" list={Dashboard} />
                <Resource name="users" {...user} />
                <Resource name="user_profile" {...profile} />
                <Resource name="gallery/image" {...image} />
                <Resource name="gallery/video" {...video} />
                <Resource name="profile/definisi" {...definisi} />
                <Resource name="profile/selayang_pandang" {...selayang_pandang} />
                <Resource name="profile/struktur_organisasi" {...struktur_organisasi} />
                <Resource name="information/regulasi" {...regulasi} />
                <Resource name="information/sop" {...sop} />
                <Resource name="information/rinduk" {...rinduk} />
                <Resource name="event/agenda" {...agenda} />
                <Resource name="event/news" {...news} />
                <Resource name="referensi" {...referensi} />
                <Resource name="menu" {...menu} />
                <Resource name="usulaninovasi" {...usulaninovasi} />
                <Resource name="usulanpenelitian" {...usulanpenelitian} />
                <Resource name="indeces" {...dataindex} />
                <Resource name="indecesdetail" {...dataindexdetail} />
                <Resource name="inovation/pemerintah" {...inovasi} />
                <Resource name="inovation/masyarakat" {...inovasi} />
                <Resource name="researchresult" {...research} />
                <Resource name="researchscope" {...researchcope} />
                <Resource name="slider" {...slider} />
                {/* <Resource name="privilege" {...privilege} /> */}
                <Resource name="perpustakaan" {...perpustakaan} />
                {/* <Resource name="footer" {...footer} /> */}
                <Resource name="message" {...mail} />
              </>
            ) : null
          ) : null}

          {permissions ? (
            permissions.includes("Dinas") ? (
              <>
                <Resource name="dashboard" list={Dashboard} />
                <Resource name="user_profile" {...profile} />
                {/* <Resource name="usulaninovasi" {...usulaninovasi} /> */}
                {/* <Resource name="usulanpenelitian" {...usulanpenelitian} /> */}
                <Resource name="inovation/pemerintah" {...dinas_Inovation} />
                <Resource name="inovation/masyarakat" {...inovasi} />
                <Resource name="researchresult" {...research} />

              </>
            ) : null
          ) : null}

          {permissions ? (
            permissions.includes("Kabid") ? (
              <>
                <Resource name="dashboard" list={Dashboard} />
                <Resource name="user_profile" {...profile} />
                {/* <Resource name="usulaninovasi" {...usulaninovasi} /> */}
                {/* <Resource name="usulanpenelitian" {...usulanpenelitian} /> */}
                <Resource name="researchresult" {...research} />
                <Resource name="perpustakaan" {...perpustakaan} />
              </>
            ) : null
          ) : null}
        </>
      )}

    </SIHALALAdmin>
  );
};

export default App;
