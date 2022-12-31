import { REACT_APP_DEV_MODE } from "@env"
import { AccountInputProps } from "../../../types/AccountInputProps"
import urls from "../../../constants/urls"
import { axiosClient } from "../../utils/axiosClient"

const accountCreate = async (accountData: AccountInputProps) => {
    const response = await axiosClient.post(`${REACT_APP_DEV_MODE}${urls.account.create}`, accountData)
    return response.data
}

const accountService = {
    accountCreate
}

export default accountService