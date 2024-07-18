/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

export interface ResearchScopeInterface {
    id: number,
    Name: string
}

export interface ResearchScopeParamInterface {
    id: number,
    Name: string
}

export const getsResearchScope = createAsyncThunk(
    "getsResearchScope",
    async (params: { filter?: ResearchScopeParamInterface, pagination?: { page: number, perPage: number } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "researchscope",
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

export const getResearchScope = createAsyncThunk(
    "getResearchScope",
    async (params: { filter: ResearchScopeParamInterface }, thunkAPI) => {
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

const ResearchScopeSlice = createSlice({
    name: "ResearchScopeSlice",
    initialState: {
        data: {} as ResearchScopeInterface,
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
        // getsResearchScope
        builder.addCase(getsResearchScope.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsResearchScope.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsResearchScope.pending, (state) => {
            state.isFetching = true;
        });

        // getsResearchScope
        builder.addCase(getResearchScope.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.data = payload.data;
            return state;
        });
        builder.addCase(getResearchScope.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getResearchScope.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = ResearchScopeSlice.actions;
export default ResearchScopeSlice.reducer;
