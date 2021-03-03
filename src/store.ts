import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "./AuthSlice";
import SidebarSlice from "./Components/Blocks/Sidebar/SidebarSlice";
import ProductsSlice from "./Components/Pages/Dashboard/ProductsSlice";
import UsersSLice from "./Components/Pages/Dashboard/UsersSlice";

export default configureStore({
    reducer: {
        auth: AuthReducer,
        sidebar: SidebarSlice,
        products: ProductsSlice,
        users: UsersSLice
    }
});