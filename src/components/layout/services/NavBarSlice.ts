/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

export interface MenuInterface {
    Name?: string;
    Path: string;
    Code?: string;
    ParentCode?: string;
    IsMenu?: boolean;
    IsActive?: boolean;
}

export interface MenuParamInterface {
    Name?: string;
    Path?: string;
    Code?: string;
    ParentCode?: string;
    IsMenu?: boolean;
    IsActive?: boolean;
}

export const getsMenu = createAsyncThunk(
    "getsMenu",
    async (params: { filter: MenuParamInterface }, thunkAPI) => {
        const config = {
            method: "get",
            url: "menu",
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

const MenuSlice = createSlice({
    name: "MenuSlice",
    initialState: {
        data: { Name: "", Path: "", Code: "", ParentCode: "", IsMenu: false, IsActive: false } as MenuInterface,
        list: {
            data: [{ Name: "", Path: "", Code: "", ParentCode: "", IsMenu: false, IsActive: false } as MenuInterface],
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
        // getsMenu
        builder.addCase(getsMenu.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.list = payload;
            return state;
        });
        builder.addCase(getsMenu.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(getsMenu.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState } = MenuSlice.actions;
export default MenuSlice.reducer;
