import React from 'react'

import AdminCategoriesPage from './AdminCategoryPage'
import { getAllCategory } from '@/actions/category.action'

export default async function AdminOrders() {
    const data = await getAllCategory();
    console.log(data, "dcatda")
  return (
    <AdminCategoriesPage data={data}/>
  )
}
