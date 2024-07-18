/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

export interface ProfileInterface {
    Title?: string;
    Slug?: string;
    Content: string;
    Image?: string;
    Video: string;
    Type?: string;
    Status?: string;
    Lang?: string;
}

export interface ProfileParamInterface {
    Title?: string;
    Slug?: string;
    Content?: string;
    Image?: string;
    Video?: string;
    Type?: string;
    Status?: string;
    Lang?: string;
}

export const getsProfile = createAsyncThunk(
    "getsProfile",
    async (params: { filter: ProfileParamInterface }, thunkAPI) => {

        Object.assign(params.filter, { Status: "Publish" })

        const config = {
            method: "get",
            url: "profile",
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

const ProfileSlice = createSlice({
    name: "ProfileSlice",
    initialState: {
        data: {} as ProfileInterface,
        list: {
            data: [{} as ProfileInterface],
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
        // getsProfile
        builder.addCase(getsProfile.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsProfile.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsProfile.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = ProfileSlice.actions;
export default ProfileSlice.reducer;
