import React from 'react'
import AdminDashboardPage from './dashboardPage'
import { getDashboardData } from '@/actions/admin.action'

export default async function AdminDashboard() {
  const data = await getDashboardData();

  return (
    <AdminDashboardPage data={ data.data.data} />
  )
}
