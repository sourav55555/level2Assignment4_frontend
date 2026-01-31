import React from 'react'

import { getMealWithId } from '@/actions/meal.acton';
import MealDetailsPage from '../../../../components/module/publicComponent/menuDetails';
import { MenuItem } from '@/lib/types';

export default async function ProviderMeal({ params }: { params: { id: string } }) {
  const { id } = await params;

  const meal = await getMealWithId(id);
  console.log(meal)
  return (
    <MealDetailsPage meal={meal.data} />
  )
}
