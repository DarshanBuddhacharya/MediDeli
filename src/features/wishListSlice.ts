import { createSlice } from "@reduxjs/toolkit"
import { MMKV } from "react-native-mmkv";
import { ProductProps } from "../../types/ProductProps";

export const storage = new MMKV()

export type WishListProps = {
    totalWishList: number;
    wishlistItems: ProductProps['results']
}

const jsonWishlist = storage.getString('wishList')
const jsonTotal = storage.getString('totalWishList')

const wishlistObject = JSON.parse(jsonWishlist ? jsonWishlist : '[]')

const initialState: WishListProps = {
    totalWishList: jsonTotal ? parseInt(jsonTotal) : 0,
    wishlistItems: wishlistObject ? wishlistObject : []
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
            storage.set("wishList", JSON.stringify(state.wishlistItems));
            storage.set("totalWishList", JSON.stringify(state.totalWishList));
        },
        clearAll: (state) => {
            state.wishlistItems = []
            state.totalWishList = 0
            storage.set("wishList", JSON.stringify(state.wishlistItems));
            storage.set("totalWishList", JSON.stringify(state.totalWishList));
        }
    }
})

export const { change, clearAll } = WishListSlice.actions

export default WishListSlice.reducer