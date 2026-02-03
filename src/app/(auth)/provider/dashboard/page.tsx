import React from 'react'
import RestaurantDashboard from './dashboardPage'
import { getProviderDashboardData } from '@/actions/provider.action'


export default async function Dashboard() {
    const data = await getProviderDashboardData()

  return (
      <RestaurantDashboard data={ data.data.data } />
  )
}
