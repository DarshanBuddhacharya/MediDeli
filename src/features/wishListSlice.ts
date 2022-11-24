import { createSlice } from "@reduxjs/toolkit"
import { ProductProps } from "../../types/ProductProps";

export type WishListProps = {
    totalWishList: number;
    wishlistItems: ProductProps['results']
}

const initialState: WishListProps = {
    totalWishList: 0,
    wishlistItems: []
}

export const WishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        change: (state, { payload }) => {
            const wishListItem = state.wishlistItems.find((item) => item.id === payload.id)
            if (wishListItem) {
                state.wishlistItems = state.wishlistItems.filter(item => item.id !== payload.id)
                state.totalWishList -= 1
            }
            else {
                state.wishlistItems.push({ ...payload })
                state.totalWishList += 1
            }
        },
        clearAll: (state) => {
            state.wishlistItems = []
            state.totalWishList = 0
        }
    }
})

export const { change, clearAll } = WishListSlice.actions

export default WishListSlice.reducer