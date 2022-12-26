import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { MMKV } from "react-native-mmkv"
import { LoginInputProps } from "../../../types/LoginInputProps"
import { LoginRespondProps } from "../../../types/LoginRespondProps"
import authService from "./authService"
import { SignupInputProps } from "../../../types/SignupInputProps"
import { ReduxStateProps } from "../../../types/ReduxStateProps"

export const storage = new MMKV()

const userJson = storage.getString('user')

let user
if (userJson) {
    user = JSON?.parse(userJson)
}

export interface AuthProps extends ReduxStateProps {
    user: LoginRespondProps | null | undefined
}

const initialState: AuthProps = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const signup = createAsyncThunk('auth/signup', async (value: SignupInputProps, thunkAPI) => {
    try {
        return await authService.signup(value)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.errors && error.response.data.errors.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (value: LoginInputProps, thunkAPI) => {
    try {
        return await authService.login(value)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.errors.phone[0]) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout()
})

export const refresh = createAsyncThunk('auth/refresh', async (value: LoginRespondProps['token']['refresh'], thunkAPI) => {
    try {
        return await authService.refresh(value)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            storage.set('user', JSON.stringify(action.payload))
        }).addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = true
            state.message = action.payload
            state.user = null
        }).addCase(signup.pending, (state) => {
            state.isLoading = true
        }).addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
        }).addCase(signup.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = true
            state.message = action.payload
        }).addCase(refresh.pending, (state) => {
            state.isLoading = true
        }).addCase(refresh.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            if (state.user?.token) {
                state.user.token = action.payload
            }
            storage.set('user', JSON.stringify({ ...state.user, token: action.payload }))
        }).addCase(refresh.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
            state.user = null
            storage.delete('user')
        }).addCase(logout.fulfilled, (state) => {
            state.user = null
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer