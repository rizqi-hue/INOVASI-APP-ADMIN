import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../modules";
import Event from "../modules/Event/Page/Event";
import EventDetail from "../modules/Event/Page/EventDetail";
import News from "../modules/Event/Page/News";
import Photo from "../modules/Gallery/Page/Photo";
import Video from "../modules/Gallery/Page/Video";
import VideoDetail from "../modules/Gallery/Page/VideoDetail";
import Perpustakaan from "../modules/Infomation/Page/Perpustakaan";
import PerpustakaanDetail from "../modules/Infomation/Page/PerpustakaanDetail";
import Regulation from "../modules/Infomation/Page/Regulation";
import Rinduk from "../modules/Infomation/Page/Rinduk";
import Sop from "../modules/Infomation/Page/Sop";
import IndecesImage from "../modules/Kelitbangan/Page/IndecesImage";
import Inovation from "../modules/Kelitbangan/Page/InovationBarang";
import InovationDetail from "../modules/Kelitbangan/Page/InovationDetail";
import Research from "../modules/Kelitbangan/Page/Research";
import ResearchDetail from "../modules/Kelitbangan/Page/ResearchDetail";
import Layout from "../modules/Layout";
import LayoutWithNoNews from "../modules/LayoutWithNoNews";
import Definisi from "../modules/Profile/Page/Definisi";
import OrganizationalSructure from "../modules/Profile/Page/OrganizationalSructure";
import Overview from "../modules/Profile/Page/Overview";
import CreateInovationProposal from "../modules/Usulan/Page/CreateInovationProposal";
import CreateResearchProposal from "../modules/Usulan/Page/CreateResearchProposal";
import InovationProposal from "../modules/Usulan/Page/InovationProposal";
import ResearchProposal from "../modules/Usulan/Page/ResearchProposal";
import { AuthProvider } from "./AuthProvider";
import InovationDigital from "../modules/Kelitbangan/Page/InovationDigital";
import InovationBarang from "../modules/Kelitbangan/Page/InovationBarang";
import InovationJasa from "../modules/Kelitbangan/Page/InovationJasa";
import RisetBahanGunaan from "../modules/Infomation/Page/RisetBahanGunaan";

const Routers = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Welcome />} /> */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<LayoutWithNoNews />}>
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routers;
