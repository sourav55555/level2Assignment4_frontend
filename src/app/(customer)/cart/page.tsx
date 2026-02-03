import React from 'react'
import CartPage from './CartPage'
import { getCart } from '@/actions/meal.acton'

export default async function CartMain() {
  const data = await getCart();
  console.log(data.data.data, "data")
  return (
    <CartPage data={ data.data.data } />
  )
}
