import { REACT_APP_DEV_MODE } from "@env"
import axios from "axios"
import { MMKV } from "react-native-mmkv"
import { LoginInputProps } from "../../../types/LoginInputProps"
import { LoginRespondProps } from "../../../types/LoginRespondProps"

const storage = new MMKV()
const login = async (loginData: LoginInputProps) => {
    const response = await axios.post<LoginRespondProps>(`${REACT_APP_DEV_MODE}login/`, loginData)
    if (response.data) {
        storage.set('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => {
    storage.delete('user')
}

const authService = {
    login,
    logout
}

export default authService