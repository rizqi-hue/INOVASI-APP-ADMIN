import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "../modules/Auth/Services/AuthSlice";
import MenuSlice from "../components/layouts/services/NavBarSlice"
import ProfileSlice from "../modules/Profile/Services/ProfileSlice";
import ReferensiSlice from "../modules/ReferensiSlice";
import InformationSlice from "../modules/Infomation/Services/InformationSlice";
import EventSlice from "../modules/Event/Services/EventSlice";
import GalleryImageSlice from "../modules/Gallery/Service/GalleryImageSlice";
import GalleryVideoSlice from "../modules/Gallery/Service/GalleryVideoSlice";
import ResearchProposalSlice from "../modules/Usulan/Services/ResearchProposalSlice";
import InovationProposalSlice from "../modules/Usulan/Services/InovationProposalSlice";
import IndicesSlice from "../modules/Kelitbangan/Services/IndicesSlice";
import SliderSlice from "../modules/Home/Services/Slider";
import ResearchSlice from "../modules/Kelitbangan/Services/ResearchSlice";
import InovationSlice from "../modules/Kelitbangan/Services/InovationSlice";
import PerpustakaanSlice from "../modules/Infomation/Services/PerpustakaanSlice";
import ResearchScopeSlice from "../modules/Kelitbangan/Services/ResearchScopeSlice";
import DataFromSlice from "../modules/Kelitbangan/Services/DataFromSlice";
import MessageSlice from "../modules/messageSlice";

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
