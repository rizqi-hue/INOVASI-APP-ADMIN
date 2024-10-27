/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../../app/api";

export interface GalleryPhotoInterface {
    Code?: string;
    Title?: string;
    Slug?: string;
    Content: string;
    Image?: string;
    Status?: string;
    Lang?: string;
}

export interface GalleryPhotoParamInterface {
    Code?: string;
    Title?: string;
    Slug?: string;
    Content?: string;
    Image?: string;
    Status?: string;
    Lang?: string;
}

export const getsGalleryPhoto = createAsyncThunk(
    "getsGalleryPhoto",
    async (params: { filter?: GalleryPhotoParamInterface, pagination?: { page: number, perPage: number } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "gallery/image",
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

const GalleryPhotoSlice = createSlice({
    name: "GalleryPhotoSlice",
    initialState: {
        data: {} as GalleryPhotoInterface,
        list: {
            data: [{} as GalleryPhotoInterface],
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
        // getsGalleryPhoto
        builder.addCase(getsGalleryPhoto.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsGalleryPhoto.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsGalleryPhoto.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = GalleryPhotoSlice.actions;
export default GalleryPhotoSlice.reducer;
