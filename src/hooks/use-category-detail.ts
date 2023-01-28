import { useState, useEffect } from 'react'
import { CategoryProps } from '../../types/CategoryProps'
import { axiosClient } from '../utils/axiosClient'
import urls from '../../constants/urls'
import { CategoryDetialProps } from '../../types/CategoryDetialProps'

export const useCategoryDetail = (categoryId: string) => {
    const [data, setData] = useState<CategoryDetialProps>()
    const [loading, setLoading] = useState(true)
    const fetchApi = async () => {
        setLoading(true)
        try {
            const { data } = await axiosClient.get<CategoryDetialProps>(`${urls.category}${categoryId}/`)
            setData(data)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (categoryId) {
            fetchApi()
        }
    }, [categoryId])

    return { data, loading }
}