import { REACT_APP_DEV_MODE } from "@env"
import { AccountInputProps } from "../../../types/AccountInputProps"
import urls from "../../../constants/urls"
import { axiosClient } from "../../utils/axiosClient"
import { AccountRespondProps } from "../../../types/AccountRespondProps"
import { AccountDataProps } from "../../../types/AccountDataProps"

const accountCreate = async (accountData: AccountInputProps) => {
    const response = await axiosClient.post<AccountRespondProps, any>(`${REACT_APP_DEV_MODE}${urls.account.create}`, accountData)
    return response.data
}

const accountGet = async () => {
    const response = await axiosClient.get<AccountDataProps, any>(`${REACT_APP_DEV_MODE}${urls.account.init}`)
    return response.data
}

const accountUpdate = async (accountData: AccountInputProps, id: number) => {
    const response = await axiosClient.patch<AccountRespondProps, any>(`${REACT_APP_DEV_MODE}${urls.account.init}${id}/`, accountData)
    return response.data
}



const accountService = {
    accountCreate,
    accountGet,
    accountUpdate
}

export default accountService