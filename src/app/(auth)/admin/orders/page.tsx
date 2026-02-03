import React from 'react'

import { getAdminOrders } from '@/actions/admin.action'
import AdminOrdersPage from './AdminOrdersPage'

export default async function AdminOrders() {
    const data = await getAdminOrders()

  return (
    <AdminOrdersPage data={data.data}/>
  )
}
