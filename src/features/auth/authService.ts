import { REACT_APP_DEV_MODE } from "@env"
import axios from "axios"
import { MMKV } from "react-native-mmkv"
import { LoginInputProps } from "../../../types/LoginInputProps"
import { LoginRespondProps } from "../../../types/LoginRespondProps"
import { SignupInputProps } from "../../../types/SignupInputProps"
import { SignupRespondProps } from "../../../types/SignupResponseProps"
import urls from "../../../constants/urls"

const storage = new MMKV()

const signup = async (signupData: SignupInputProps) => {
    const response = await axios.post<SignupRespondProps>(`${REACT_APP_DEV_MODE}${urls.registration}`, signupData)
    return response.data
}

const login = async (loginData: LoginInputProps) => {
    const response = await axios.post<LoginRespondProps>(`${REACT_APP_DEV_MODE}${urls.login}`, loginData)
    return response.data
}

const refresh = async (refresh: LoginRespondProps['token']['refresh']) => {
    const response = await axios.post<LoginRespondProps['token']>(`${REACT_APP_DEV_MODE}${urls.refresh}`, { refresh: refresh })
    return response.data
}

const logout = () => {
    storage.delete('user')
}

const authService = {
    login,
    refresh,
    logout,
    signup
}

export default authService