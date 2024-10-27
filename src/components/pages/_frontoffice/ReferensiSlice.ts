/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

export interface ReferensiInterface {
    Code?: string;
    Title?: string;
    Slug?: string;
    Content: string;
    Image?: string;
    Status?: string;
    Lang?: string;
}

export interface ReferensiParamInterface {
    Code?: string;
    Title?: string;
    Slug?: string;
    Content?: string;
    Image?: string;
    Status?: string;
    Lang?: string;
}

export const getsReferensi = createAsyncThunk(
    "getsReferensi",
    async (params: { filter: ReferensiParamInterface }, thunkAPI) => {

        const config = {
            method: "get",
            url: "referensi",
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

const ReferensiSlice = createSlice({
    name: "ReferensiSlice",
    initialState: {
        data: {} as ReferensiInterface,
        list: {
            data: [{} as ReferensiInterface],
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
        // getsReferensi
        builder.addCase(getsReferensi.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsReferensi.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsReferensi.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = ReferensiSlice.actions;
export default ReferensiSlice.reducer;
