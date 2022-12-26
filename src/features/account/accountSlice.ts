import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ReduxStateProps } from "../../../types/ReduxStateProps"
import accountService from "./accountService"
import { AccountInputProps } from "../../../types/AccountInputProps"

export interface AccountProps extends ReduxStateProps {
    account: AccountInputProps | null
}

const initialState: AccountProps = {
    account: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const accountCreate = createAsyncThunk('account/create', async (values: AccountInputProps, thunkAPI) => {
    try {
        return await accountService.accountCreate(values)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.errors && error.response.data.errors.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(accountCreate.pending, (state) => {
            state.isLoading = true
        }).addCase(accountCreate.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = payload
        }).addCase(accountCreate.rejected, (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = payload
            state.isError = true
        })
    },
})

export const { reset } = accountSlice.actions
export default accountSlice.reducer