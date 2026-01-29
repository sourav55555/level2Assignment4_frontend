"use client";
import { useState } from 'react';
import { Star, Clock, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export const FilterContent = (
    {  setFilterValues }
        :
        {
       
            setFilterValues: any
    }
    
    ) => {

    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
      const [selectedCuisines, setSelectedCuisines] = useState<string[]>(['All']);
      const [priceRange, setPriceRange] = useState([0, 20]);
      const [vegetarianOnly, setVegetarianOnly] = useState(false);

const categories = ['All', 'Pizza', 'Burger', 'Noodles', 'Salad', 'Sushi', 'Wrap', 'Bowl'];
const cuisines = ['All', 'Italian', 'American', 'Thai', 'Japanese', 'Continental', 'Mediterranean', 'Healthy'];

      const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories.filter(c => c !== 'All'), category];
      setSelectedCategories(newCategories.length === 0 ? ['All'] : newCategories);
    }
  };

  const handleCuisineChange = (cuisine: string) => {
    if (cuisine === 'All') {
      setSelectedCuisines(['All']);
    } else {
      const newCuisines = selectedCuisines.includes(cuisine)
        ? selectedCuisines.filter(c => c !== cuisine)
        : [...selectedCuisines.filter(c => c !== 'All'), cuisine];
      setSelectedCuisines(newCuisines.length === 0 ? ['All'] : newCuisines);
    }
  };

    
    
    return <div className="space-y-6">
        <div>
            <h3 className="font-semibold text-lg mb-3">Categories</h3>
            <div className="space-y-2">
                {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={`category-${category}`} className="cursor-pointer">
                            {category}
                        </Label>
                    </div>
                ))}
            </div>
        </div>

        <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-3">Cuisine</h3>
            <div className="space-y-2">
                {cuisines.map(cuisine => (
                    <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                            id={`cuisine-${cuisine}`}
                            checked={selectedCuisines.includes(cuisine)}
                            onCheckedChange={() => handleCuisineChange(cuisine)}
                        />
                        <Label htmlFor={`cuisine-${cuisine}`} className="cursor-pointer">
                            {cuisine}
                        </Label>
                    </div>
                ))}
            </div>
        </div>

        <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-3">Price Range</h3>
            <div className="px-2">
                <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={20}
                    step={1}
                    className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </div>

        <div className="border-t pt-6">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="vegetarian"
                    checked={vegetarianOnly}
                    onCheckedChange={(checked) => setVegetarianOnly(checked as boolean)}
                />
                <Label htmlFor="vegetarian" className="cursor-pointer">
                    Vegetarian Only
                </Label>
            </div>
        </div>
    </div>
};