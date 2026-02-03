import React from 'react'
import AdminUsersPage from './AdminUsersPage'
import { getAdminUsers } from '@/actions/admin.action'

export default async function AdminUsers() {
    const data = await getAdminUsers()

  return (
    <AdminUsersPage data={data.data.data}/>
  )
}
