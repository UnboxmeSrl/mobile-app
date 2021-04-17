import { useEffect } from 'react'

import { useAction } from '@hooks/common'
import { fetchBoxes } from '@redux/modules/boxes'
import { fetchBrands } from '@redux/modules/brands'
import { fetchCategories } from '@redux/modules/categories'
import { fetchProducts } from '@redux/modules/products'

export const useFetchData = () => {
  const getBoxes = useAction(fetchBoxes)
  const getCategories = useAction(fetchCategories)
  const getProducts = useAction(fetchProducts)
  const getBrands = useAction(fetchBrands)

  useEffect(() => {
    getBoxes()
    getCategories()
    getProducts()
    getBrands()
  }, [])
}
