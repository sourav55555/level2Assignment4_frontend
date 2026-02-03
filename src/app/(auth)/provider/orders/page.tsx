import React from 'react'
import OrdersPage from './OrderPage'
import { getProviderOrder } from '@/actions/provider.action'

export default async function Order() {

  const data = await getProviderOrder();

  return (
    <OrdersPage data={data.data.data}/>
  )
}
