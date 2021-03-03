import { createSlice } from '@reduxjs/toolkit';

const UsersSlice = createSlice({
    name: "users",
    initialState: {
        state: false,
        users: []
    },
    reducers: {
        usersRequested: (state) => {
            state.state = !0;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            state.state = !0;
        }
    }
});

export const getUsersRequestState = (state:any) => state.users.state as boolean;
export const getUsers = (state:any) => state.users.users as Array<any>;
export const { usersRequested, setUsers } = UsersSlice.actions;
export default UsersSlice.reducer;