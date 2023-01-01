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
}

export const accountCreate = createAsyncThunk('account/create', async (values: AccountInputProps, thunkAPI) => {
    try {
        return await accountService.accountCreate(values)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.errors && error.response.data.errors.error) || error.response.data || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const accountGet = createAsyncThunk('account/get', async (_, thunkAPI) => {
    try {
        return await accountService.accountGet()
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.errors && error.response.data.errors.error) || error.response.data || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const accountUpdate = createAsyncThunk('account/update', async (values: { id: number, data: AccountInputProps }, thunkAPI) => {
    const { data, id } = values
    try {
        return await accountService.accountUpdate(data, id)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.errors && error.response.data.errors.error) || error.response.data || error.toString()
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
            state.account = null
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(accountCreate.pending, (state) => {
            state.isLoading = true
        }).addCase(accountCreate.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = payload
            state.account = payload.account
        }).addCase(accountCreate.rejected, (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = false
            state.message = payload
            state.isError = true
        }).addCase(accountGet.pending, (state) => {
            state.isLoading = true
        }).addCase(accountGet.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true
            state.account = payload
        }).addCase(accountGet.rejected, (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = false
            state.message = payload
            state.isError = true
        }).addCase(accountUpdate.pending, (state) => {
            state.isLoading = true
        }).addCase(accountUpdate.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = true
            state.account = payload
        }).addCase(accountUpdate.rejected, (state, { payload }) => {
            state.isLoading = false
            state.isSuccess = false
            state.message = payload
            state.isError = true
        })
    },
})

export const { reset } = accountSlice.actions
export default accountSlice.reducer