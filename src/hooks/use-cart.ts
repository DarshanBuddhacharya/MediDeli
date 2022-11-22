import React, { useState, useEffect } from 'react'
import { CategoryProps } from '../../types/CategoryProps'
import { axiosClient } from '../utils/axiosClient'

export const useCart = () => {
    const postApi = async () => {
        try {
            await axiosClient.post<{ product: string, quantity: number }>('cart/', { product: 'f8aa8694-00d6-4b96-82ad-dade39db3354', quantity: 1 })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        postApi()
    }, [])

}