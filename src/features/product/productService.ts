import urls from "../../../constants/urls"
import { ProductProps } from "../../../types/ProductProps"
import { axiosClient } from "../../utils/axiosClient"

const productGet = async (page: number) => {
    const response = await axiosClient.get<ProductProps>(`${urls.products}?page=${page}`)
    return response.data
}

const productService = {
    productGet
}

export default productService