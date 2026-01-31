'use client';

import { useEffect, useState } from 'react';
import { Star, Clock, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FilterContent } from '@/components/module/menupage/filterMenu';
import ItemCard from '@/components/module/publicComponent/itemCard';
import { getLocalUserData } from '@/libs/localStorage';
import { FaPlus } from "react-icons/fa6";
import Link from 'next/link';
import { getProviderMeal } from '@/actions/provider.action';
import { MenuItem } from '@/lib/types';

// Sample food data
export const foodItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    restaurant: 'Pizza Palace',
    category: 'Pizza',
    cuisine: 'Italian',
    price: 12.99,
    rating: 4.5,
    deliveryTime: '25-35',
    distance: '2.3 km',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
    vegetarian: true,
  },
  {
    id: 2,
    name: 'Chicken Burger',
    restaurant: 'Burger House',
    category: 'Burger',
    cuisine: 'American',
    price: 8.99,
    rating: 4.3,
    deliveryTime: '20-30',
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    vegetarian: false,
  },
  {
    id: 3,
    name: 'Pad Thai',
    restaurant: 'Thai Delight',
    category: 'Noodles',
    cuisine: 'Thai',
    price: 10.99,
    rating: 4.7,
    deliveryTime: '30-40',
    distance: '3.1 km',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop',
    vegetarian: false,
  },
  {
    id: 4,
    name: 'Caesar Salad',
    restaurant: 'Green Bowl',
    category: 'Salad',
    cuisine: 'Continental',
    price: 7.99,
    rating: 4.2,
    deliveryTime: '15-25',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    vegetarian: true,
  },
  {
    id: 5,
    name: 'Sushi Platter',
    restaurant: 'Tokyo Sushi',
    category: 'Sushi',
    cuisine: 'Japanese',
    price: 18.99,
    rating: 4.8,
    deliveryTime: '35-45',
    distance: '4.5 km',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    vegetarian: false,
  },
  {
    id: 6,
    name: 'Veggie Wrap',
    restaurant: 'Wrap & Roll',
    category: 'Wrap',
    cuisine: 'Mediterranean',
    price: 6.99,
    rating: 4.1,
    deliveryTime: '15-20',
    distance: '1.5 km',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    vegetarian: true,
  },
  {
    id: 7,
    name: 'Pepperoni Pizza',
    restaurant: 'Pizza Palace',
    category: 'Pizza',
    cuisine: 'Italian',
    price: 14.99,
    rating: 4.6,
    deliveryTime: '25-35',
    distance: '2.3 km',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    vegetarian: false,
  },
  {
    id: 8,
    name: 'Vegan Bowl',
    restaurant: 'Green Bowl',
    category: 'Bowl',
    cuisine: 'Healthy',
    price: 9.99,
    rating: 4.4,
    deliveryTime: '20-30',
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    vegetarian: true,
  },
];



export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
//   const [selectedCuisines, setSelectedCuisines] = useState<string[]>(['All']);
//   const [priceRange, setPriceRange] = useState([0, 20]);
//     const [vegetarianOnly, setVegetarianOnly] = useState(false);
    const [filterValues, setFilterValues] = useState({
        selectedCategories : [],
        selectedCuisines : [],
        priceRange: [0, 20],
        vegetarianOnly: false
    })
  const [allData, setAllData] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    const meals = async () => {
      // setLoading(true)
      const data = await getProviderMeal();
      console.log(data.data)
      setAllData(data.data.data)
      setLoading(false)
    }
    meals();
  },[])




//   const filteredFood = foodItems.filter(item => {
//     // const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     //                      item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
//     // const matchesCategory = selectedCategories.includes('All') || selectedCategories.includes(item.category);
//     // const matchesCuisine = selectedCuisines.includes('All') || selectedCuisines.includes(item.cuisine);
//     // const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
//     // const matchesVegetarian = !vegetarianOnly || item.vegetarian;
//     // const matchesRating = item.rating >= minRating;

//     // return matchesSearch && matchesCategory && matchesCuisine && matchesPrice && matchesVegetarian && matchesRating;
    //   });
  const filteredFood = foodItems;
  
  const user = getLocalUserData();



  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className=" bg-[url('/intro-bg.jpg')] bg-no-repeat bg-cover bg-center h-28 md:h-40  border-b sticky top-0 z-10">
        <div className="bg-black/50 flex items-center justify-center w-full h-full  px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center gap-4 justify-between ">
            <h1 className="text-2xl sm:text-4xl font-semibold text-secondary">{ user?.name}</h1>
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <p  className='text-secondary p-1.5 border-2 rounded-lg border-amber-400'>
                  <SlidersHorizontal className="" size={24} />
                </p>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-6 bg-amber-100 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className='text-center'>Filters</SheetTitle>
                </SheetHeader>
                <div className="">
                  {/* Search in Mobile Sidebar */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 transform
                         -translate-y-1/2 text-gray-400 w-5 h-5"
                      />
                      <Input
                        type="text"
                        placeholder="Search food or restaurant..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <FilterContent setFilterValues={setFilterValues} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex  gap-8">
            {/* Desktop Sidebar - Hidden on Mobile */}

          <div className="hidden lg:block w-72 shrink-0">
            <div className="bg-amber-100 rounded-lg shadow-sm p-6 sticky top-28">
              {/* Search in Sidebar */}
              <div className="mb-6">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  />
                  <Input
                    type="text"
                    placeholder="Search food or restaurant..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

                <h2 className="text-xl font-bold mb-6">Filters</h2>
                <FilterContent setFilterValues={setFilterValues} />
                          
       
            </div>
          </div>

          {/* Food Cards Grid */}
          <main className="flex-1">
            <div className='flex items-center justify-between mb-7'>
              <div className="mb-4 text-sm sm:text-base text-gray-100">
                {filteredFood.length} {filteredFood.length === 1 ? 'item' : 'items'} found
              </div>
              <Link href="/provider/create">
                  <Button
                    className='bg-green-400 px-6 hover:bg-green-700 
                    hover:text-white transition-all duration-300 font-medium'
                    >
                    <FaPlus />
                    Add A New Item
                  </Button>
              </Link>
            </div>
            {
              loading && <p className='text-secondary text-center my-10'>Loading .....</p>
            }
            
            {allData.length === 0 && !loading ? (
              <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center">
                <p className="text-gray-500 text-base sm:text-lg">
                  No items found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:px-0 px-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {allData.map(item => (
                  <ItemCard key={item.id} item={item} update/>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
