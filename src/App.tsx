import jwtDecode from "jwt-decode";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { CustomRoutes, Resource, Admin as SIHALALAdmin } from "react-admin";
import englishMessages from "./i18n/en";
import "./index.css";

import { Layout, Login } from "./components/layout";
import { Dashboard } from "./components/pages/_admin/dashboard";

// pages
import dinas_Inovation from "./components/pages/_admin/dinas_inovation/pemerintah";
import image from "./components/pages/_admin/gallery/image";
import video from "./components/pages/_admin/gallery/video";
import agenda from "./components/pages/_admin/informasi/agenda";
import news from "./components/pages/_admin/informasi/news";
import regulasi from "./components/pages/_admin/informasi/regulasi";
import rinduk from "./components/pages/_admin/informasi/rinduk";
import sop from "./components/pages/_admin/informasi/sop";
import inovasi from "./components/pages/_admin/inovation/pemerintah";
import dataindex from "./components/pages/_admin/kelitbangan/indeces";
import dataindexdetail from "./components/pages/_admin/kelitbangan/indecesdetail";
import research from "./components/pages/_admin/kelitbangan/research";
import researchcope from "./components/pages/_admin/kelitbangan/researchscope";
import mail from "./components/pages/_admin/mail";
import menu from "./components/pages/_admin/menu";
import perpustakaan from "./components/pages/_admin/perpustakaan";
import profile from "./components/pages/_admin/profile";
import definisi from "./components/pages/_admin/profile/definisi";
import selayang_pandang from "./components/pages/_admin/profile/selayang_pandang";
import struktur_organisasi from "./components/pages/_admin/profile/struktur_organisasi";
import referensi from "./components/pages/_admin/settings/referensi";
import slider from "./components/pages/_admin/slider";
import user from "./components/pages/_admin/user";
import usulaninovasi from "./components/pages/_admin/usulan/usulaninovasi";
import usulanpenelitian from "./components/pages/_admin/usulan/usulanpenelitian";

// provider
import { Route } from "react-router";
import CustomLoading from "./CustomLoading";
import RemoveAnchor from "./RemoveAnchor";
import useCurrentTheme from "./components/themes/useCurrentTheme";
import { Home } from "./components/pages/_frontoffice";
import Event from "./components/pages/_frontoffice/Event/Page/Event";
import EventDetail from "./components/pages/_frontoffice/Event/Page/EventDetail";
import News from "./components/pages/_frontoffice/Event/Page/News";
import Photo from "./components/pages/_frontoffice/Gallery/Page/Photo";
import Video from "./components/pages/_frontoffice/Gallery/Page/Video";
import VideoDetail from "./components/pages/_frontoffice/Gallery/Page/VideoDetail";
import Perpustakaan from "./components/pages/_frontoffice/Infomation/Page/Perpustakaan";
import PerpustakaanDetail from "./components/pages/_frontoffice/Infomation/Page/PerpustakaanDetail";
import Regulation from "./components/pages/_frontoffice/Infomation/Page/RisetAlatDeteksi";
import Rinduk from "./components/pages/_frontoffice/Infomation/Page/Rinduk";
import RisetBahanGunaan from "./components/pages/_frontoffice/Infomation/Page/RisetBahanGunaan";
import Sop from "./components/pages/_frontoffice/Infomation/Page/Sop";
import Inovation from "./components/pages/_frontoffice/Inovasi/Page/Inovasi";
import IndecesImage from "./components/pages/_frontoffice/Kelitbangan/Page/IndecesImage";
import InovationBarang from "./components/pages/_frontoffice/Kelitbangan/Page/InovationBarang";
import InovationDetail from "./components/pages/_frontoffice/Kelitbangan/Page/InovationDetail";
import InovationDigital from "./components/pages/_frontoffice/Kelitbangan/Page/InovationDigital";
import InovationJasa from "./components/pages/_frontoffice/Kelitbangan/Page/InovationJasa";
import Research from "./components/pages/_frontoffice/Kelitbangan/Page/Research";
import ResearchDetail from "./components/pages/_frontoffice/Kelitbangan/Page/ResearchDetail";
import FrontOfficeLayout from "./components/pages/_frontoffice/Layout";
import Definisi from "./components/pages/_frontoffice/Profile/Page/Definisi";
import OrganizationalSructure from "./components/pages/_frontoffice/Profile/Page/OrganizationalSructure";
import Overview from "./components/pages/_frontoffice/Profile/Page/Overview";
import CreateInovationProposal from "./components/pages/_frontoffice/Usulan/Page/CreateInovationProposal";
import CreateResearchProposal from "./components/pages/_frontoffice/Usulan/Page/CreateResearchProposal";
import InovationProposal from "./components/pages/_frontoffice/Usulan/Page/InovationProposal";
import ResearchProposal from "./components/pages/_frontoffice/Usulan/Page/ResearchProposal";
import authProvider from "./services/AuthProvider/index";
import dataProvider from "./services/DataProvider/dataProvider";
import useChangeThemeColor from "./useChangeThemeColor";
import { getData } from "./utils/storage";
import RisetAlatDeteksi from "./components/pages/_frontoffice/Infomation/Page/RisetAlatDeteksi";
import RisetPrilakuKonsumen from "./components/pages/_frontoffice/Infomation/Page/RisetPrilakuKonsumen";

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

              <Route path="/alat-deteksi" element={<RisetAlatDeteksi />} />
              <Route path="/bahan-gunaan" element={<RisetBahanGunaan />} />
              <Route path="/prilaku-konsumen" element={<RisetPrilakuKonsumen />} />

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
                <Resource name="admin/dashboard" list={Dashboard} />
                <Resource name="admin/users" {...user} />
                <Resource name="admin/user_profile" {...profile} />
                <Resource name="admin/gallery/image" {...image} />
                <Resource name="admin/gallery/video" {...video} />
                <Resource name="admin/profile/definisi" {...definisi} />
                <Resource name="admin/profile/selayang_pandang" {...selayang_pandang} />
                <Resource name="admin/profile/struktur_organisasi" {...struktur_organisasi} />
                <Resource name="admin/information/regulasi" {...regulasi} />
                <Resource name="admin/information/sop" {...sop} />
                <Resource name="admin/information/rinduk" {...rinduk} />
                <Resource name="admin/event/agenda" {...agenda} />
                <Resource name="admin/event/news" {...news} />
                <Resource name="admin/referensi" {...referensi} />
                <Resource name="admin/menu" {...menu} />
                <Resource name="admin/usulaninovasi" {...usulaninovasi} />
                <Resource name="admin/usulanpenelitian" {...usulanpenelitian} />
                <Resource name="admin/indeces" {...dataindex} />
                <Resource name="admin/indecesdetail" {...dataindexdetail} />
                <Resource name="admin/inovation/pemerintah" {...inovasi} />
                <Resource name="admin/inovation/masyarakat" {...inovasi} />
                <Resource name="admin/researchresult" {...research} />
                <Resource name="admin/researchscope" {...researchcope} />
                <Resource name="admin/slider" {...slider} />
                {/* <Resource name="privilege" {...privilege} /> */}
                <Resource name="admin/perpustakaan" {...perpustakaan} />
                {/* <Resource name="footer" {...footer} /> */}
                <Resource name="admin/message" {...mail} />
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
