import React from 'react'
import OrdersPage from './OrderPage'
import { getCustomerOrder } from '@/actions/order.aciton'

export default async function Order() {

  const data = await getCustomerOrder()
  console.log(data.data.data, "data")
  return (
    <OrdersPage data={data.data.data}/>
  )
}
