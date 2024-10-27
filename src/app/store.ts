import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "../components/pages/_frontoffice/Services/AuthSlice"
import MenuSlice from "../components/layout/services/NavBarSlice"
import ProfileSlice from "../components/pages/_frontoffice/Profile/Services/ProfileSlice";
import ReferensiSlice from "../components/pages/_frontoffice/ReferensiSlice";
import InformationSlice from "../components/pages/_frontoffice/Infomation/Services/InformationSlice";
import EventSlice from "../components/pages/_frontoffice/Event/Services/EventSlice";
import GalleryImageSlice from "../components/pages/_frontoffice/Gallery/Service/GalleryImageSlice";
import GalleryVideoSlice from "../components/pages/_frontoffice/Gallery/Service/GalleryVideoSlice";
import ResearchProposalSlice from "../components/pages/_frontoffice/Usulan/Services/ResearchProposalSlice";
import InovationProposalSlice from "../components/pages/_frontoffice/Usulan/Services/InovationProposalSlice";
import IndicesSlice from "../components/pages/_frontoffice/Kelitbangan/Services/IndicesSlice";
import SliderSlice from "../components/pages/_frontoffice/Home/Services/Slider";
import ResearchSlice from "../components/pages/_frontoffice/Kelitbangan/Services/ResearchSlice";
import InovationSlice from "../components/pages/_frontoffice/Kelitbangan/Services/InovationSlice";
import PerpustakaanSlice from "../components/pages/_frontoffice/Infomation/Services/PerpustakaanSlice";
import ResearchScopeSlice from "../components/pages/_frontoffice/Kelitbangan/Services/ResearchScopeSlice";
import DataFromSlice from "../components/pages/_frontoffice/Kelitbangan/Services/DataFromSlice";
import MessageSlice from "../components/pages/_frontoffice/messageSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    menu: MenuSlice,
    profile: ProfileSlice,
    referensi: ReferensiSlice,
    information: InformationSlice,
    event: EventSlice,
    photo: GalleryImageSlice,
    video: GalleryVideoSlice,
    researchproposal: ResearchProposalSlice,
    inovationproposal: InovationProposalSlice,
    indices: IndicesSlice,
    slider: SliderSlice,
    research: ResearchSlice,
    researchscope: ResearchScopeSlice,
    inovation: InovationSlice,
    perpustakaan: PerpustakaanSlice,
    dataform: DataFromSlice,
    message: MessageSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
