/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

export interface MessageInterface {
    Message: string;
    Name: string;
    PhoneNumber: string;
    Status?: string;
}

export interface MessageParamInterface {
    Message: string;
    Name: string;
    PhoneNumber: string;
    Status?: string;
}

export const createMessage = createAsyncThunk(
    "createMessage",
    async (data: MessageInterface, thunkAPI) => {
        const config = {
            method: "post",
            url: "message",
            data
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

const MessageSlice = createSlice({
    name: "MessageSlice",
    initialState: {
        data: {} as MessageInterface,
        list: {
            data: [{} as MessageInterface],
            total: 0
        },
        isFetching: false,

        isGetSuccess: false,
        isCreateSuccess: false,

        isError: false,
        errorMessage: "" as string,
    },
    reducers: {
        clearState: (state) => {
            state.isFetching = false;
            state.isGetSuccess = false;
            state.isCreateSuccess = false;
            state.isError = false;
            state.errorMessage = "";
        },

    },
    extraReducers: (builder) => {
        builder.addCase(createMessage.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isCreateSuccess = true;
            state.data = payload;
            return state;
        });
        builder.addCase(createMessage.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(createMessage.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = MessageSlice.actions;
export default MessageSlice.reducer;
