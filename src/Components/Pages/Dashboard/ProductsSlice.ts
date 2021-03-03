import { createSlice } from '@reduxjs/toolkit';
import {ProductInterface} from "../../../Utils/Interfaces";

const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        state: false,
        products: <any>[]
    },
    reducers: {
        productsRequested: (state) => {
            state.state = !0;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
            state.state = !0;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((product:any) => product.id !== action.payload);
        },
        changeProductState: (state, action) => {
            const elem = state.products.filter((product:any) => product.id === action.payload.id)[0],
                  index = state.products.indexOf(elem);

            elem.status = action.payload.status;
            state.products[index] = elem;
        }
    }
});

export const getProductsRequestState = (state:any) => state.products.state as boolean;
export const getProductsAmount = (state:any) => state.products.products.length as number;
export const getProducts = (state:any) => state.products.products as Array<ProductInterface>;

export const { productsRequested, setProducts, addProduct, removeProduct, changeProductState} = ProductsSlice.actions;
export default ProductsSlice.reducer;