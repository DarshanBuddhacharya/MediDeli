import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/ProductProps";
import { MMKV } from 'react-native-mmkv'


export const storage = new MMKV()
export interface CartState {
    cartItems: ProductProps['results'],
    totalItems: number;
    totalPrice: number
}

const jsonCart = storage.getString('cart')
const jsonTotal = storage.getString('totalCart')
const jsonTotalPrice = storage.getString('totalPrice')

const cartObject = JSON.parse(jsonCart ? jsonCart : '')

const initialState: CartState = {
    cartItems: cartObject ? cartObject : [],
    totalItems: jsonTotal ? parseInt(jsonTotal) : 0,
    totalPrice: jsonTotalPrice ? parseInt(jsonTotalPrice) : 0
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clear: (state) => {
            state.cartItems = [];
            storage.set("cart", JSON.stringify(state.cartItems));
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
            storage.set("cart", JSON.stringify(state.cartItems));
        },
        update: (state, { payload }) => {
            const cartItem = state.cartItems.findIndex(item => item.id === payload.cart.id)
            if (state.cartItems[cartItem]?.amount) {
                state.cartItems[cartItem].amount = payload.quantity
            }
            storage.set("cart", JSON.stringify(state.cartItems));

        },
        clearById: (state, { payload }) => {
            const clearedCart = state.cartItems.filter(item => item.id !== payload)
            state.cartItems = clearedCart
            storage.set("cart", JSON.stringify(state.cartItems));
        },
        calculateTotals: (state) => {
            let total = 0;
            let totalPrice = 0;
            state.cartItems.forEach((item) => {
                total += item.amount
                totalPrice += item.price * item.amount
            })

            state.totalItems = total
            state.totalPrice = totalPrice
            storage.set("totalCart", JSON.stringify(state.totalItems));
            storage.set("totalPrice", JSON.stringify(state.totalPrice));
        }
    },
})


export const { clear, add, remove, update, clearById, calculateTotals } = CartSlice.actions

export default CartSlice.reducer