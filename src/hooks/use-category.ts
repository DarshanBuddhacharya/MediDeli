import React, { useState, useEffect } from 'react'
import { CategoryProps } from '../../types/CategoryProps'
import { axiosClient } from '../utils/axiosClient'

export const useCategory = () => {
  const [data, setData] = useState<CategoryProps>()
  const [loading, setLoading] = useState(true)
  const fetchApi = async () => {
    try {
      const { data } = await axiosClient.get<CategoryProps>('category/')
      setData(data)
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return { data, loading }

}