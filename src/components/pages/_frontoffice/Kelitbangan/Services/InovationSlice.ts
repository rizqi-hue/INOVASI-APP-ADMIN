/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../../app/api";

export interface InovationInterface {
    id: number,
    UserId?: {
        Name: string
    };
    DataMadeBy?: {
        Name: string
    };
    Name?: string;
    DataStep?: {
        Name: string
    };
    DataInitiator?: {
        Name: string
    };
    Digital?: string;
    DataForm?: {
        Name: string
    };
    DataThematic?: {
        Name: string
    };
    DataOtherThematic?: {
        Name: string
    };
    DataMainAffairs?: {
        Name: string
    };
    TrialTime?: string;
    DeploymentTime?: string;
    Design?: string;
    Objective?: string;
    Benefit?: string;
    Result?: string;
    Budget?: string;
    BisnessProfile?: string;
    Type?: string;
    Status?: string;
}

export interface InovationParamInterface {
    id?: string,
    UserId?: number;
    MadeBy?: number;
    Year?: number;
    Name?: string;
    Step?: string;
    Initiator?: string;
    Digital?: string | null;
    Form?: string;
    Thematic?: string;
    OtherThematic?: string;
    MainAffairs?: string;
    TrialTime?: string;
    DeploymentTime?: string;
    Design?: string;
    Objective?: string;
    Benefit?: string;
    Result?: string;
    Budget?: string;
    BisnessProfile?: string;
    Type?: string;
    Status?: string;
}

export const getsInovation = createAsyncThunk(
    "getsInovation",
    async (params: { filter: InovationParamInterface, pagination?: { page: number, perPage: number } }, thunkAPI) => {
        const config = {
            method: "get",
            url: "inovation",
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

export const getInovation = createAsyncThunk(
    "getInovation",
    async (params: { filter: InovationParamInterface }, thunkAPI) => {
        const config = {
            method: "get",
            url: "inovation/" + params.filter.id,
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

const InovationSlice = createSlice({
    name: "InovationSlice",
    initialState: {
        data: {} as InovationInterface,
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
        // getsInovation
        builder.addCase(getsInovation.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsInovation.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsInovation.pending, (state) => {
            state.isFetching = true;
        });

        // getsInovation
        builder.addCase(getInovation.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.data = payload.data;
            return state;
        });
        builder.addCase(getInovation.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getInovation.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = InovationSlice.actions;
export default InovationSlice.reducer;
