/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../../app/api";

export interface DataFormInterface {
    id: number,
    Ref: string
    Name: string
}

export interface DataFormParamInterface {
    id: number,
    Ref: string
    Name: string
}

export const getsDataForm = createAsyncThunk(
    "getsDataForm",
    async (params: { filter?: DataFormParamInterface, pagination?: { page: number, perPage: number } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "dataform",
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

export const getDataForm = createAsyncThunk(
    "getDataForm",
    async (params: { filter: DataFormParamInterface }, thunkAPI) => {
        const config = {
            method: "get",
            url: "dataform/" + params.filter.id,
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

const DataFormSlice = createSlice({
    name: "DataFormSlice",
    initialState: {
        data: {} as DataFormInterface,
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
        // getsDataForm
        builder.addCase(getsDataForm.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsDataForm.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsDataForm.pending, (state) => {
            state.isFetching = true;
        });

        // getsDataForm
        builder.addCase(getDataForm.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.data = payload.data;
            return state;
        });
        builder.addCase(getDataForm.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getDataForm.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = DataFormSlice.actions;
export default DataFormSlice.reducer;
