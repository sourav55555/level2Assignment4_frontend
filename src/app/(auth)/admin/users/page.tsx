import React from 'react'
import AdminUsersPage from './AdminUsersPage'
import { getAdminUsers } from '@/actions/admin.action'

export default async function AdminUsers() {
    const data = await getAdminUsers()
    console.log(data)
  return (
    <AdminUsersPage data={data.data}/>
  )
}
