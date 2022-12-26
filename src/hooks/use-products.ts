import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { ProductProps } from '../../types/ProductProps';
import { axiosClient } from '../utils/axiosClient';
import urls from '../../constants/urls';

type ProductItemProps = {
    id?: string,
    query?: string;
}


export const useProduct = <T>({ id, query }: ProductItemProps) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T>()

    const fetchApi = async () => {
        try {
            const { data } = await axiosClient.get<T>(id ? `${urls.products}${id}` : `${urls.products}?${query}`)
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