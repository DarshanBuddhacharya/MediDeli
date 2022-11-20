import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    totalItems: number;
}

const initialState: CartState = {
    totalItems: 1
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state) => { state.totalItems += 1 },
        removeFromCart: (state) => { state.totalItems -= 1 },
        addByCart: (state, action: PayloadAction<number>) => { state.totalItems = action.payload }
    }
})

export const { addToCart, removeFromCart, addByCart } = CartSlice.actions

export default CartSlice.reducer