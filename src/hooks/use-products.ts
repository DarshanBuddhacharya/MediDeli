import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { ProductProps } from '../../types/ProductProps';
import { axiosClient } from '../utils/axiosClient';

export const useProduct = <T>(id?: string) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T>()

    const fetchApi = async () => {
        try {
            const { data } = await axiosClient.get<T>(id ? `products/${id}` : 'products/')
            setData(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        fetchApi();
    }, []);

    return { loading, data }
};