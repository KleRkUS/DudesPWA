import { createSlice } from '@reduxjs/toolkit';

const SidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        value: false
    },
    reducers: {
        sidebarExpanded: (state) => {
            state.value = !0;
        },
        sidebarCollapsed: (state) => {
            state.value = !1;
        }
    }
});

export const getSidebarState = (state:any) => state.sidebar.value as boolean;
export const { sidebarExpanded, sidebarCollapsed } = SidebarSlice.actions;
export default SidebarSlice.reducer;