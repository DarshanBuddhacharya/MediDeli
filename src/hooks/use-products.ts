import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { ProductProps } from '../../types/ProductProps';
import { axiosClient } from '../utils/axiosClient';

type ProductItemProps = {
    id?: string,
    query?: string;
}


export const useProduct = <T>({ id, query }: ProductItemProps) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T>()
    console.log("🚀 ~ file: use-products.ts:15 ~ useProduct ~ data", data)

    const fetchApi = async () => {
        try {
            const { data } = await axiosClient.get<T>(id ? `products/${id}` : `products/?${query}`)
            setData(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    };

    useEffect(() => {
        fetchApi();
    }, []);

    return { loading, data }
};