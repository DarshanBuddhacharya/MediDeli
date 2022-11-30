import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { MMKV } from "react-native-mmkv"
import { LoginInputProps } from "../../../types/LoginInputProps"
import { LoginRespondProps } from "../../../types/LoginRespondProps"
import authService from "./authService"

export const storage = new MMKV()

const userJson = storage.getString('user')
console.log("🚀 ~ file: authSlice.ts ~ line 10 ~ userJson", userJson)

let user
if (userJson) {
    user = JSON?.parse(userJson)
}

export interface AuthProps {
    user: LoginRespondProps | null
    isError: boolean
    isSuccess: boolean
    isLoading: boolean
    message?: string | unknown
}

const initialState: AuthProps = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const login = createAsyncThunk('auth/login', async (user: LoginInputProps, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout()
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
        },
        authenticate: (state, { payload }: { payload: LoginRespondProps['token'] }) => {
            storage.set('user', JSON.stringify({ ...state.user, token: payload }))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        }).addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
            state.user = null
        }).addCase(logout.fulfilled, (state) => {
            state.user = null
        })
    }
})

export const { reset, authenticate } = authSlice.actions
export default authSlice.reducer