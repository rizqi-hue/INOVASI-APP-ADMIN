/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../../app/api";

export interface InovationProposalInterface {
    Title: string;
    ProblemIdentification: string;
    Purpose: string;
    Instansi: string;
    Name: string;
    Email: string;
    PhoneNumber: string;
    Image: string;
    Tor: string;
    Icp: string;
    Status?: string;
}

export interface InovationProposalParamInterface {
    Title?: string;
    ProblemIdentification?: string;
    Purpose?: string;
    Instansi?: string;
    Name?: string;
    Email?: string;
    PhoneNumber?: string;
    Image?: string;
    Tor?: string;
    Icp?: string;
    Status?: string;
}

export const getsInovationProposal = createAsyncThunk(
    "getsInovationProposal",
    async (params: { filter: InovationProposalParamInterface, pagination?: { page: number, perPage: number } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "usulaninovasi",
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

export const createInovationProposal = createAsyncThunk(
    "createInovationProposal",
    async (data: FormData, thunkAPI) => {
        const config = {
            method: "post",
            url: "usulaninovasi",
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

const InovationProposalSlice = createSlice({
    name: "InovationProposalSlice",
    initialState: {
        data: {} as InovationProposalInterface,
        list: {
            data: [{} as InovationProposalInterface],
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
        // getsInovationProposal
        builder.addCase(getsInovationProposal.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isGetSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsInovationProposal.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsInovationProposal.pending, (state) => {
            state.isFetching = true;
        });

        builder.addCase(createInovationProposal.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isCreateSuccess = true;
            state.data = payload;
            return state;
        });
        builder.addCase(createInovationProposal.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(createInovationProposal.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = InovationProposalSlice.actions;
export default InovationProposalSlice.reducer;
