import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './src/features/cartSlice'
import wishListReducer from './src/features/wishListSlice'
import authReducer from './src/features/auth/authSlice'
import AccountReducer from './src/features/account/accountSlice'
import productReducer from './src/features/product/productSlice'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishList: wishListReducer,
        auth: authReducer,
        account: AccountReducer,
        product: productReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch