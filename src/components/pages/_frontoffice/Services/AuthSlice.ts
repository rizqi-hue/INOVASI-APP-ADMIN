/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../app/api";
import { clearAppData, getData, storeData } from "../../../../utils/storage";

export interface AuthInterface {
    name?: string;
    phone: string;
    password: string;
}

export interface RefreshTokenInterface {
    token: string;
}

export interface RegisterInterface {
    name: string;
    phone: string;
    password: string;
}

export const signUp = createAsyncThunk(
    "signUp",
    async (data: RegisterInterface, thunkAPI) => {
        const config = {
            method: "post",
            url: "member/register",
            data,
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

export const signIn = createAsyncThunk(
    "signIn",
    async (data: AuthInterface, thunkAPI) => {
        const config = {
            method: "post",
            url: "member/login",
            data,
            // withCredentials: true,
        };

        return api(config).then(
            (res: any) => {
                storeData('token', res.data.tokens.access.token)
                storeData('refreshtoken', res.data.tokens.refresh.token)

                return res.data;
            },
            (err: any) => {
                return thunkAPI.rejectWithValue(err.response.data.message);
            }
        );
    }
);

export const signOut = createAsyncThunk(
    "signOut",
    async (data: any, thunkAPI) => {
        Object.assign(data, {
            refreshToken: getData('refreshtoken')
        })

        const config = {
            method: "post",
            url: "member/logout",
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

export const refreshToken = createAsyncThunk(
    "refreshToken",
    async (data: RefreshTokenInterface, thunkAPI) => {
        const config = {
            method: "post",
            url: "auth/refresh-token",
            data,
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

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: {
        data: { name: "", email: "", password: "", phone: "" } as AuthInterface,
        isFetching: false,
        isSuccess: false,
        isSuccessRegister: false,
        isSignOutSuccess: false,
        isError: false,
        isAuth: getData("token"),
        errorMessage: "" as string,
    },
    reducers: {
        clearState: (state) => {
            state.isFetching = false;
            state.isSuccess = false;
            state.isSuccessRegister = false;
            state.isError = false;
            state.isSignOutSuccess = false;
            state.errorMessage = "";
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
    extraReducers: (builder) => {
        // signIn
        builder.addCase(signIn.fulfilled, (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isAuth = true;
            return state;
        });
        builder.addCase(signIn.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(signIn.pending, (state) => {
            state.isFetching = true;
        });

        // signUp
        builder.addCase(signUp.fulfilled, (state) => {
            state.isFetching = false;
            state.isSuccessRegister = true;
            return state;
        });
        builder.addCase(signUp.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(signUp.pending, (state) => {
            state.isFetching = true;
        });

        // refreshToken
        builder.addCase(refreshToken.fulfilled, (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isAuth = true;
            return state;
        });
        builder.addCase(refreshToken.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.isAuth = false;
            state.errorMessage = payload.payload;
        });
        builder.addCase(refreshToken.pending, (state) => {
            state.isFetching = true;
        });

        // signout
        builder.addCase(signOut.fulfilled, (state) => {
            clearAppData();
            state.isFetching = false;
            state.isSignOutSuccess = true;
            state.isAuth = false;
            return state;
        });
        builder.addCase(signOut.rejected, (state, payload: any) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.payload;
        });
        builder.addCase(signOut.pending, (state) => {
            state.isFetching = true;
        });
    },
});

export const { clearState, setAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
