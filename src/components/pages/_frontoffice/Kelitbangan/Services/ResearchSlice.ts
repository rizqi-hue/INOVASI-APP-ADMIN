/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../../app/api";

export interface ResearchInterface {
    id: number,
    DataResearchScope: {
        Name: string
    };
    Title?: string;
    Executor?: string;
    Year?: number;
    Abstract?: string;
    FollowUp?: string;
    Status?: string;
    File?: string;
}

export interface ResearchParamInterface {
    id?: string;
    ResearchScope?: number | null;
    Title?: string;
    Executor?: string;
    Year?: number;
    Abstract?: string;
    FollowUp?: string;
    Status?: string;
    File?: string;
}

export const getsResearch = createAsyncThunk(
    "getsResearch",
    async (params: { filter: ResearchParamInterface, pagination?: { page: number, perPage: number } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "researchresult",
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

export const getResearch = createAsyncThunk(
    "getResearch",
    async (params: { filter: ResearchParamInterface }, thunkAPI) => {
        const config = {
            method: "get",
            url: "researchresult/" + params.filter.id,
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

const ResearchSlice = createSlice({
    name: "ResearchSlice",
    initialState: {
        data: {} as ResearchInterface,
        list: {
            data: [{} as any],
            total: 0
        },
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: "" as string,
    },
    reducers: {
        clearState: (state) => {
            state.isFetching = false;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = "";
        },

    },
    extraReducers: (builder) => {
        // getsResearch
        builder.addCase(getsResearch.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsResearch.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsResearch.pending, (state) => {
            state.isFetching = true;
        });

        // getsResearch
        builder.addCase(getResearch.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.data = payload.data;
            return state;
        });
        builder.addCase(getResearch.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getResearch.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = ResearchSlice.actions;
export default ResearchSlice.reducer;
