import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './src/features/cartSlice'
import wishListReducer from './src/features/wishListSlice'
import authReducer from './src/features/auth/authSlice'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishList: wishListReducer,
        auth: authReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch