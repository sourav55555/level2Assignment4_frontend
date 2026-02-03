

import { getMealWithId } from '@/actions/meal.acton';
import MealDetailsPage from '../../../../components/module/publicComponent/menuDetails';


export default async function ProviderMeal({ params }: { params: { id: string } }) {
  const { id } = await params;

  const meal = await getMealWithId(id);

  return (
    <MealDetailsPage meal={meal.data} />
  )
}
