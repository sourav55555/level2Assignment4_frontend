'use client';

import { useState } from 'react';
import { Star, Clock, MapPin, Heart, Minus, Plus, ShoppingCart, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { MenuItem } from '@/lib/types';
import { getCartCount, getLocalUserData, setCartCount } from '@/libs/localStorage';
import { MdDeleteOutline } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import DeleteAlertItem from './deleteAlertItem';
import { UserRole } from '@/libs/constants';
import { UpdateMealDrawer } from '../authComponent/updateMealDrawer';
import { createCart } from '@/actions/meal.acton';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

// This would come from your API/database based on the meal ID
const getMealById = (id: string) => {
  const meals = {
    '1': {
      id: '1',
      name: 'Margherita Pizza',
      restaurant: 'Pizza Palace',
      restaurantRating: 4.6,
      category: 'Pizza',
      cuisine: 'Italian',
      price: 12.99,
      rating: 4.5,
      reviews: 128,
      deliveryTime: '25-35',
      distance: '2.3 km',
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
      ],
      vegetarian: true,
      description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil leaves. Made with hand-tossed dough and baked in a wood-fired oven for that perfect crispy crust.',
      ingredients: [
        'Fresh Mozzarella Cheese',
        'San Marzano Tomatoes',
        'Fresh Basil Leaves',
        'Extra Virgin Olive Oil',
        'Pizza Dough',
        'Sea Salt',
        'Garlic',
      ],
      nutritionalInfo: {
        calories: 850,
        protein: '32g',
        carbs: '98g',
        fat: '36g',
      },
      customizations: [
        { id: 'size', name: 'Size', options: ['Small', 'Medium', 'Large'], prices: [0, 3, 6] },
        { id: 'crust', name: 'Crust', options: ['Thin', 'Regular', 'Thick'], prices: [0, 0, 2] },
        { id: 'extra-cheese', name: 'Extra Cheese', options: ['No', 'Yes'], prices: [0, 2] },
      ],
    },
  };
  return meals[id as keyof typeof meals] || null;
};

// Related items
const relatedMeals = [
  {
    id: '2',
    name: 'Pepperoni Pizza',
    restaurant: 'Pizza Palace',
    price: 14.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Veggie Supreme Pizza',
    restaurant: 'Pizza Palace',
    price: 13.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'BBQ Chicken Pizza',
    restaurant: 'Pizza Palace',
    price: 15.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
  },
];


export interface Cart{
  mealId: string;
  quantity: number;
  price: number;

}


export default function MealDetailsPage({ meal }: { meal: MenuItem }) {
  // const meal = getMealById('1');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const [loading, setLoading]= useState(false)
  const user = getLocalUserData();
  const cartCount = getCartCount() || 0;

  if (!meal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Meal Not Found</h1>
          <p className="text-gray-600 mb-4">The meal you&apos;re looking for doesn&apos;t exist.</p>
          <Link href={user && user?.role === UserRole.provider ? "/provider/menu" : "/menu"}>
            <Button>Back to Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    const total = meal.price * quantity;
    // meal.customizations?.forEach(custom => {
    //   const selectedIndex = selectedOptions[custom.id] || 0;
    //   total += custom.prices[selectedIndex] * quantity;
    // });
    return total.toFixed(2);
  };

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    setLoading(true)
    const payload: Cart = {
      mealId: meal.id,
      quantity,
      price:+calculateTotalPrice(),
  
    };
    const orderCreate = await createCart(payload)

    if (orderCreate.data.success) {
      setCartCount(cartCount + quantity)
      setLoading(false);
      toast.success("Item added to cart")
      router.push("/menu")
    }

  };

  return (
    <div className="min-h-screen bg-primary2">
      {/* Header */}
      <div className="bg-primary2 text-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/menu" className="inline-flex items-center ">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Menu
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg aspect-[4/3]">
              <Image
                src={meal.imageUrl}
                alt={meal.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                />
              </button>
              {meal.dietPreference && (
                <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                  {meal.dietPreference}
                </Badge>
              )}
            </div>

          </div>

          {/* Details Section */}
          <div className="bg-amber-100 rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {meal.name}
                  </h1>
                  <Link
                    href={`/restaurant/${meal.provider?.id}`}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    {meal.provider?.name}
                  </Link>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600">
                    ৳ {meal.price}
                  </div>
                  <div className="text-sm text-gray-500">per item</div>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mt-4">
                {/* <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{meal.rating}</span>
                  <span>({meal.} reviews)</span>
                </div> */}
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>15 min</span>
                </div>
                {/* <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>{meal.distance}</span>
                </div> */}
              </div>

              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">{meal.cuisine?.name}</Badge>
                <Badge variant="secondary">{meal.dietPreference}</Badge>
              </div>
            </div>

            <Separator className="my-1" />

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{meal.description}</p>
            </div>

            <Separator className="my-1" />

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
              <div className="grid grid-cols-2 gap-2">
                {meal.ingredient?.split(",").map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-600 capitalize rounded-full" />
                    {ingredient}
                  </div>
                ))}
              </div>
            </div>



            <Separator className="my-1" />
            {/* update edit  */}
            {user && user.id === meal.provider?.id &&
              <div className='flex items-center gap-3'>
                <UpdateMealDrawer mealData={meal} />
                <DeleteAlertItem id={meal.id} />
              </div>
            }

            {/* Quantity and Add to Cart */}
            {!user || user.id !== meal.provider?.id &&
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      disabled={quantity === 1}
                      className="w-10 h-10 cursor-pointer rounded-full border-2
                       border-gray-300 flex items-center justify-center
                        hover:border-orange-600 hover:text-orange-600
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="w-10 cursor-pointer h-10 rounded-full border-2 
                      border-gray-300 flex items-center justify-center
                       hover:border-orange-600 hover:text-orange-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700
                   text-white h-14 text-lg font-semibold"
                >
                  {loading ? <AiOutlineLoading3Quarters className="w-5 h-5 mr-2" /> :
                    <ShoppingCart className="w-5 h-5 mr-2" />}
                  Add to Cart - <span className='text-2xl -me-1.5 -mt-1'>৳</span>{calculateTotalPrice()}
                </Button>
              </div>}
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedMeals.map(relatedMeal => (
              <Link
                key={relatedMeal.id}
                href={`/meal/${relatedMeal.id}`}
                className="bg-white rounded-lg shadow-sm 
                overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={relatedMeal.image}
                    alt={relatedMeal.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {relatedMeal.name}
                    </h3>
                    <span className="font-bold text-orange-600">${relatedMeal.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{relatedMeal.restaurant}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{relatedMeal.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
