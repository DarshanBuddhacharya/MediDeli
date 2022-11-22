import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/ProductProps";
import { MMKV } from 'react-native-mmkv'


export const storage = new MMKV()
export interface CartState {
    cartItems: ProductProps['results'],
    totalItems: number;
}

const jsonUser = storage.getString('cart')

const userObject = JSON.parse(jsonUser ? jsonUser : '')

const initialState: CartState = {
    cartItems: userObject ? userObject : [],
    totalItems: 0
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clear: (state) => {
            state.cartItems = [];
        },
        add: (state, { payload }) => {
            const cartItem = state.cartItems.findIndex((item) => item.id === payload.id);
            if (cartItem >= 0) {
                state.cartItems[cartItem].amount += 1;
            } else {
                state.cartItems.push({ ...payload, amount: 1 })
            }
            storage.set("cart", JSON.stringify(state.cartItems));
        },
        remove: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id)
            const cartIndex = state.cartItems.findIndex((item) => item.id === payload.id)
            if (cartItem && cartItem?.amount > 1) {
                state.cartItems[cartIndex].amount -= 1;
            }
            else {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== payload.id
                );
                state.cartItems = nextCartItems
            }
            storage.set("cart", JSON.stringify(state.cartItems));
        },
        clearById: (state, { payload }) => {
            const clearedCart = state.cartItems.filter(item => item.id !== payload)
            state.cartItems = clearedCart
            storage.set('cart', JSON.stringify(state.cartItems))
        }
    },
})


export const { clear, add, remove, clearById } = CartSlice.actions

export default CartSlice.reducer