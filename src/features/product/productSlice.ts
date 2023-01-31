import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ProductProps } from "../../../types/ProductProps"
import { ReduxStateProps } from "../../../types/ReduxStateProps"
import productService from "./productService"

export interface ProductsProps extends ReduxStateProps {
    product: ProductProps['results'] | null
}

const initialState: ProductsProps = {
    product: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
}

export const productGet = createAsyncThunk('product/get', async (page: number, thunkAPI) => {
    try {
        return await productService.productGet(page)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.errors && error.response.data.errors.error) || error.response.data || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.product = null
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(productGet.pending, (state) => {
            state.isLoading = true
        }).addCase(productGet.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = null
            state.product = state.product ? state.product.concat(payload.results) : payload.results
        }).addCase(productGet.rejected, (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = false
            state.message = payload
            state.isError = true
        })
    },
})

export const { reset } = productSlice.actions
export default productSlice.reducer