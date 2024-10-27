/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../../app/api";

export interface GalleryVideoInterface {
    id?: string;
    Code?: string;
    Title?: string;
    Slug?: string;
    Content: string;
    Link: string;
    Status?: string;
    Lang?: string;
}

export interface GalleryVideoParamInterface {
    id?: string;
    Code?: string;
    Title?: string;
    Slug?: string;
    Content?: string;
    Link?: string;
    Status?: string;
    Lang?: string;
}

export const getsGalleryVideo = createAsyncThunk(
    "getsGalleryVideo",
    async (params: { filter?: GalleryVideoParamInterface, pagination?: { page: number, perPage: number } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "gallery/video",
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

export const getGalleryVideo = createAsyncThunk(
    "getGalleryVideo",
    async (params: { filter?: GalleryVideoParamInterface }, thunkAPI) => {
        const config = {
            method: "get",
            url: "gallery/video/" + params.filter?.id,
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

const GalleryVideoSlice = createSlice({
    name: "GalleryVideoSlice",
    initialState: {
        data: {} as GalleryVideoInterface,
        list: {
            data: [{} as GalleryVideoInterface],
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
        // getsGalleryVideo
        builder.addCase(getsGalleryVideo.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsGalleryVideo.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsGalleryVideo.pending, (state) => {
            state.isFetching = true;
        });

        // getsGalleryVideo
        builder.addCase(getGalleryVideo.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.data = payload.data;
            return state;
        });
        builder.addCase(getGalleryVideo.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getGalleryVideo.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = GalleryVideoSlice.actions;
export default GalleryVideoSlice.reducer;
