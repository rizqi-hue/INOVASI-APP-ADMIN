/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

export interface IndecesInterface {
    Title?: string;
    Slug?: string;
    Content: string;
    Type?: string;
    Status?: string;
    Lang?: string;
}

export interface IndecesParamInterface {
    Title?: string;
    Slug?: string;
    Content?: string;
    Type?: string;
    Status?: string;
    Lang?: string;
}

export const getsIndeces = createAsyncThunk(
    "getsIndeces",
    async (params: { filter: IndecesParamInterface }, thunkAPI) => {
        const config = {
            method: "get",
            url: "indeces",
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

const IndecesSlice = createSlice({
    name: "IndecesSlice",
    initialState: {
        data: {} as IndecesInterface,
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
        // getsIndeces
        builder.addCase(getsIndeces.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsIndeces.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsIndeces.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = IndecesSlice.actions;
export default IndecesSlice.reducer;
