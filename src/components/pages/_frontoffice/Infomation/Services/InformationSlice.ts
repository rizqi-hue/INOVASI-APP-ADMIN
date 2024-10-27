/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../../app/api";

export interface InformationInterface {
    Title?: string;
    Slug?: string;
    Content: string;
    Image?: string;
    File?: string;
    Lang?: string;
    Type?: string;
    Status?: string;
}

export interface InformationParamInterface {
    Title?: string;
    Slug?: string;
    Content?: string;
    Image?: string;
    File?: string;
    Type?: string;
    Status?: string;
    Lang?: string;
}

export const getsInformation = createAsyncThunk(
    "getsInformation",
    async (data: { url: string, params: { filter: InformationParamInterface } }, thunkAPI) => {

        Object.assign(data.params.filter, { Status: 'Publish' })

        const config = {
            method: "get",
            url: "information" + data.url,
            params: data.params
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

const InformationSlice = createSlice({
    name: "InformationSlice",
    initialState: {
        data: {} as InformationInterface,
        list: {
            data: [{} as InformationInterface],
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
        // getsInformation
        builder.addCase(getsInformation.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsInformation.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsInformation.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = InformationSlice.actions;
export default InformationSlice.reducer;
