import React from 'react'
import AdminUsersPage from './AdminUsersPage'
import { getAdminOrders, getAdminUsers } from '@/actions/admin.action'
import AdminOrdersPage from './AdminOrdersPage'

export default async function AdminOrders() {
    const data = await getAdminOrders()
    console.log(data)
  return (
    <AdminOrdersPage data={data.data}/>
  )
}
