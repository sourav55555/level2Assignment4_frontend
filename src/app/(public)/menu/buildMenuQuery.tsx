import { FilterValues } from "./menuPage"

export const buildMealQuery = (filters: FilterValues) => {
  const params = new URLSearchParams()

  if (filters?.selectedCategories?.length > 0) {
    params.set("cuisineIds", filters.selectedCategories.join(","))
  }

  if (filters.dietPreferences.length > 0) {
    params.set("dietPreferences", filters.dietPreferences.join(","))
  }

  params.set("minPrice", String(filters.priceRange[0]))
  params.set("maxPrice", String(filters.priceRange[1]))

  return params.toString()
}
