import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        value: "Unknown"
    },
    reducers: {
        userSingedIn: (state) => {
          state.value = "Authorized";
        },
        userSignedOut: (state) => {
          state.value = "Unauthorized";
        }
    }
});

export const getAuthState = (state:any) => state.auth.value as string;
export const { userSingedIn, userSignedOut } = AuthSlice.actions;
export default AuthSlice.reducer;