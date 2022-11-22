import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/ProductProps";
import { MMKV } from 'react-native-mmkv'


export const storage = new MMKV()
export interface CartState {
    cartItems: ProductProps['results'],
    totalItems: number;
}

const jsonCart = storage.getString('cart')
const jsonTotal = storage.getString('totalCart')

const cartObject = JSON.parse(jsonCart ? jsonCart : '')

const initialState: CartState = {
    cartItems: cartObject ? cartObject : [],
    totalItems: jsonTotal ? parseInt(jsonTotal) : 0
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clear: (state) => {
            state.cartItems = [];
            state.totalItems = 0
            storage.set("cart", JSON.stringify(state.cartItems));
            storage.set("totalCart", JSON.stringify(state.totalItems));
        },
        add: (state, { payload }) => {
            const cartItem = state.cartItems.findIndex((item) => item.id === payload.id);
            if (cartItem >= 0) {
                state.cartItems[cartItem].amount += 1;
                state.totalItems += 1;
            } else {
                state.cartItems.push({ ...payload, amount: 1 })
                state.totalItems += 1;
            }
            storage.set("cart", JSON.stringify(state.cartItems));
            storage.set("totalCart", JSON.stringify(state.totalItems));
        },
        remove: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            const cartIndex = state.cartItems.findIndex((item) => item.id === payload.id)
            if (cartItem && cartItem?.amount > 1) {
                state.cartItems[cartIndex].amount -= 1;
                state.totalItems -= 1;
            }
            storage.set("cart", JSON.stringify(state.cartItems));
            storage.set("totalCart", JSON.stringify(state.totalItems));
        },
        clearById: (state, { payload }) => {
            const cartIndex = state.cartItems.findIndex(item => item.id === payload)
            state.totalItems = state.totalItems - state.cartItems[cartIndex].amount
            const clearedCart = state.cartItems.filter(item => item.id !== payload)
            state.cartItems = clearedCart
            storage.set("cart", JSON.stringify(state.cartItems));
            storage.set("totalCart", JSON.stringify(state.totalItems));
        }
    },
})


export const { clear, add, remove, clearById } = CartSlice.actions

export default CartSlice.reducer