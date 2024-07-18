/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

export interface PerpustakaanInterface {
    id?: string;
    Code?: string;
    Title?: string;
    Slug?: string;
    Content: string;
    Image?: string;
    File?: string;
    Status?: string;
    Lang?: string;
}

export interface PerpustakaanParamInterface {
    id?: string;
    Code?: string;
    Title?: string;
    Slug?: string;
    Content?: string;
    Image?: string;
    File?: string;
    Status?: string;
    Lang?: string;
}

export const getsPerpustakaan = createAsyncThunk(
    "getsPerpustakaan",
    async (params: { filter?: PerpustakaanParamInterface, pagination?: { page: number, perPage: number } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "perpustakaan",
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


export const getPerpustakaan = createAsyncThunk(
    "getPerpustakaan",
    async (params: { filter: PerpustakaanParamInterface }, thunkAPI) => {
        const config = {
            method: "get",
            url: "perpustakaan/" + params.filter.id,
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
const PerpustakaanSlice = createSlice({
    name: "PerpustakaanSlice",
    initialState: {
        data: {} as PerpustakaanInterface,
        list: {
            data: [{} as PerpustakaanInterface],
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
        // getsPerpustakaan
        builder.addCase(getsPerpustakaan.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;

            return state;
        });
        builder.addCase(getsPerpustakaan.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsPerpustakaan.pending, (state) => {
            state.isFetching = true;
        });

        builder.addCase(getPerpustakaan.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.data = payload.data;

            return state;
        });
        builder.addCase(getPerpustakaan.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getPerpustakaan.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = PerpustakaanSlice.actions;
export default PerpustakaanSlice.reducer;
