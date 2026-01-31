import { getMealWithId } from '@/actions/meal.acton';

import MealDetailsPage from '@/components/module/publicComponent/menuDetails'
export const revalidate = 0;
export const dynamic = "force-dynamic";


export default async function ProviderMeal({ params }: { params: { id: string } }) {
    const { id } = await params;

    const meal = await getMealWithId(id);


    return (
        <MealDetailsPage meal={meal.data} />
    )
}
