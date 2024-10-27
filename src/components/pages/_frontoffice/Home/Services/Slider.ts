/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../../app/api";

export interface SliderInterface {
    Title?: string;
    Slug?: string;
    Content: string;
    Image?: string;
    Status?: string;
    Lang?: string;
    Type?: string;
}

export interface SliderParamInterface {
    Title?: string;
    Slug?: string;
    Content?: string;
    Image?: string;
    Status?: string;
    Type?: string;
    Lang?: string;
}

export const getsSlider = createAsyncThunk(
    "getsSlider",
    async (params: { filter?: SliderParamInterface, pagination?: { page: number, perPage: number } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "slider",
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

const SliderSlice = createSlice({
    name: "SliderSlice",
    initialState: {
        data: {} as SliderInterface,
        list: {
            data: [{} as SliderInterface],
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
        // getsSlider
        builder.addCase(getsSlider.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsSlider.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsSlider.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = SliderSlice.actions;
export default SliderSlice.reducer;
