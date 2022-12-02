import { REACT_APP_DEV_MODE } from "@env"
import axios from "axios"
import { MMKV } from "react-native-mmkv"
import { LoginInputProps } from "../../../types/LoginInputProps"
import { LoginRespondProps } from "../../../types/LoginRespondProps"

const storage = new MMKV()
const login = async (loginData: LoginInputProps) => {
    const response = await axios.post<LoginRespondProps>(`${REACT_APP_DEV_MODE}login/`, loginData)
    console.log("🚀 ~ file: authService.ts:11 ~ login ~ response", response)
    return response.data
}

const refresh = async (refresh: LoginRespondProps['token']['refresh']) => {
    const response = await axios.post<LoginRespondProps['token']>(`${REACT_APP_DEV_MODE}refresh/`, { refresh: refresh })
    return response.data
}

const logout = () => {
    storage.delete('user')
}

const authService = {
    login,
    refresh,
    logout
}

export default authService