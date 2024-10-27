/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../../app/api";

export interface EventInterface {
    Title?: string;
    Slug?: string;
    Content?: string;
    Image?: string;
    File?: string;
    Location?: string;
    Address?: string;
    Province?: string;
    Regency?: string;
    Subdistrict?: string;
    Village?: string;
    StartEventDate?: string;
    EndEventDate?: string;
    Lang?: string;
    Type?: string;
    Status?: string;
}

export interface EventParamInterface {
    Title?: string;
    Slug?: string;
    Content?: string;
    Image?: string;
    File?: string;
    Location?: string;
    Address?: string;
    Province?: string;
    Regency?: string;
    Subdistrict?: string;
    Village?: string;
    StartEventDate?: string;
    EndEventDate?: string;
    Lang?: string;
    Type?: string;
    Status?: string;
}

export const getsEvent = createAsyncThunk(
    "getsEvent",
    async (data: { url: string, params?: { filter: EventParamInterface, pagination?: { page: number, perPage: number } } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "event" + data.url,
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

export const getEvent = createAsyncThunk(
    "getEvent",
    async (data: { url: string, params?: { filter: EventParamInterface, pagination?: { page: number, perPage: number } } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "event/" + data.url + "/" + data.params?.filter.Slug,
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

const EventSlice = createSlice({
    name: "EventSlice",
    initialState: {
        data: {} as EventInterface,
        list: {
            data: [{} as EventInterface],
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
        // getsEvent
        builder.addCase(getsEvent.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsEvent.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsEvent.pending, (state) => {
            state.isFetching = true;
        });

        // getEvent
        builder.addCase(getEvent.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.data = payload.data;
            return state;
        });
        builder.addCase(getEvent.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getEvent.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = EventSlice.actions;
export default EventSlice.reducer;
