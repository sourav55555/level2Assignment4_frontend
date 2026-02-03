/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from 'react';
import { Star, Clock, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { getAllCategory } from '@/actions/category.action';
import { DietPreference } from '@/libs/constants';

export const FilterContent = (
    { setFilterValues }
        :
        {
            setFilterValues: any
        }

) => {

    const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
    const [priceRange, setPriceRange] = useState([0, 2000]);

    const [categories, setCategories] = useState<string[]>(['All']);
    const [selectedDietPreferences, setSelectedDietPreferences] = useState<string[]>(['All']);
    const dietPreferencesList = ['All', ...Object.values(DietPreference)];



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


    const handleDietPreferenceChange = (pref: string) => {
        if (pref === 'All') {
            setSelectedDietPreferences(['All']);
        } else {
            const newPrefs = selectedDietPreferences.includes(pref)
                ? selectedDietPreferences.filter(p => p !== pref)
                : [...selectedDietPreferences.filter(p => p !== 'All'), pref];
            setSelectedDietPreferences(newPrefs.length === 0 ? ['All'] : newPrefs);
        }
    };

    useEffect(() => {
        const categoryData = async () => {
            const categories = await getAllCategory();
            const categoryNames = categories.map((cat: any) => cat.name);
            setCategories(['All', ...categoryNames]);
        }
        categoryData()
    }, [])

   useEffect(() => {
        setFilterValues({
            // remove "All" before sending
            cuisineIds: selectedCategories.includes("All")
            ? []
            : selectedCategories,

            priceRange,

            dietPreferences: selectedDietPreferences.includes("All")
            ? []
            : selectedDietPreferences,
        })
        }, [selectedCategories, priceRange, selectedDietPreferences, setFilterValues])



    return <div className="space-y-6">
        <div>
            <h3 className="font-semibold text-lg mb-3">Categories</h3>
            <div className="space-y-2">
                {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                            id={`category-৳{category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={`category-৳{category}`} className="cursor-pointer">
                            {category}
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
                    max={2000}
                    step={1}
                    className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>৳{priceRange[0]}</span>
                    <span>৳{priceRange[1]}</span>
                </div>
            </div>
        </div>

        <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-3">Diet Preferences</h3>
            <div className="space-y-2">
                {dietPreferencesList.map(pref => (
                    <div key={pref} className="flex items-center space-x-2">
                        <Checkbox
                            id={`diet-${pref}`}
                            checked={selectedDietPreferences.includes(pref)}
                            onCheckedChange={() => handleDietPreferenceChange(pref)}
                        />
                        <Label htmlFor={`diet-${pref}`} className="cursor-pointer">
                            {pref.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    </div>
};