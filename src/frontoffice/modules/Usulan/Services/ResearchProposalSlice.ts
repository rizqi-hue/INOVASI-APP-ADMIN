/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

export interface ResearchProposalInterface {
    Title: string;
    ProblemIdentification: string;
    Purpose: string;
    Instansi: string;
    Email: string;
    PhoneNumber: string;
    Tor: string;
    Icp: string;
    Status: string;
}

export interface ResearchProposalParamInterface {
    Title?: string;
    ProblemIdentification?: string;
    Purpose?: string;
    Instansi?: string;
    Email?: string;
    PhoneNumber?: string;
    Tor?: string;
    Icp?: string;
    Status?: string;
}

export const getsResearchProposal = createAsyncThunk(
    "getsResearchProposal",
    async (params: { filter: ResearchProposalParamInterface, pagination?: { page: number, perPage: number } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "usulanpenelitian",
            params
        };

        return api(config).then(
            (res: any) => {
                return res.data;
            },
            (err: any) => {
                return thunkAPI.rejectWithValue(err.response.data.message);
            }
        );
    }
);

export const createResearchProposal = createAsyncThunk(
    "createResearchProposal",
    async (data: FormData, thunkAPI) => {
        const config = {
            method: "post",
            url: "usulanpenelitian",
            data
        };

        return api(config).then(
            (res: any) => {
                return res.data;
            },
            (err: any) => {
                return thunkAPI.rejectWithValue(err.response.data.message);
            }
        );
    }
);

const ResearchProposalSlice = createSlice({
    name: "ResearchProposalSlice",
    initialState: {
        data: {} as ResearchProposalInterface,
        list: {
            data: [{} as ResearchProposalInterface],
            total: 0
        },
        isFetching: false,

        isGetSuccess: false,
        isCreateSuccess: false,

        isError: false,
        errorMessage: "" as string,
    },
    reducers: {
        clearState: (state) => {
            state.isFetching = false;
            state.isGetSuccess = false;
            state.isCreateSuccess = false;
            state.isError = false;
            state.errorMessage = "";
        },

    },
    extraReducers: (builder) => {
        // getsResearchProposal
        builder.addCase(getsResearchProposal.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isGetSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsResearchProposal.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsResearchProposal.pending, (state) => {
            state.isFetching = true;
        });

        builder.addCase(createResearchProposal.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isCreateSuccess = true;
            state.data = payload;
            return state;
        });
        builder.addCase(createResearchProposal.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(createResearchProposal.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = ResearchProposalSlice.actions;
export default ResearchProposalSlice.reducer;
