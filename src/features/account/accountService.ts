import { REACT_APP_DEV_MODE } from "@env"
import axios from "axios"
import { AccountInputProps } from "../../../types/AccountInputProps"

const accountCreate = async (accountData: AccountInputProps) => {
    const response = await axios.post(`${REACT_APP_DEV_MODE}register/`, accountData)
    return response.data
}

const accountService = {
    accountCreate
}

export default accountService