import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useAction } from '@hooks/common'
import { fetchAddresses } from '@redux/modules/addresses'
import { selectIsAuthenticated } from '@redux/modules/auth'
import { fetchAwardCategories } from '@redux/modules/awardCategories'
import { fetchAwards } from '@redux/modules/awards'
import { fetchBookings } from '@redux/modules/bookings'
import { fetchBoxes } from '@redux/modules/boxes'
import { fetchBrands } from '@redux/modules/brands'
import { fetchCategories } from '@redux/modules/categories'
import { fetchOrders } from '@redux/modules/orders'
import { fetchProducts } from '@redux/modules/products'

export const useFetchData = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const getBoxes = useAction(fetchBoxes)
  const getCategories = useAction(fetchCategories)
  const getProducts = useAction(fetchProducts)
  const getBrands = useAction(fetchBrands)
  const getOrders = useAction(fetchOrders)
  const getAddresses = useAction(fetchAddresses)
  const getAwardCategories = useAction(fetchAwardCategories)
  const getAwards = useAction(fetchAwards)
  const getBookings = useAction(fetchBookings)

  useEffect(() => {
    getBoxes()
    getCategories()
    getProducts()
    getBrands()
    getAwardCategories()
    getAwards()
    if (isAuthenticated) {
      getOrders()
      getAddresses()
      getBookings()
    }
  }, [isAuthenticated, getAwardCategories, getAwards, getBookings])
}
