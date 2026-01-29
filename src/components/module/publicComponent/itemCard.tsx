"use client";


import { Button } from '@/components/ui/button'
import { Clock, MapPin, Star } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function ItemCard({item}) {
    
  return (
    <div className="bg-primary2 text-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ">
        <div className="relative h-60 sm:h-56 rounded-t-full">
            <Image
                src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                className="w-full h-full rounded-t-full object-cover"
            />
            {item.vegetarian && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                Veg
            </span>
            )}
        </div>
        <div className="p-3 sm:p-4">
            <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-base sm:text-lg ">{item.name}</h3>
            <span className="font-bold  text-sm sm:text-base">${item.price}</span>
            </div>
            <p className="text-xs sm:text-sm  mb-2 sm:mb-3">{item.restaurant}</p>
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm ">
                <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{item.deliveryTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{item.distance}</span>
                </div>
            </div>
            {/* <div className="mt-2 sm:mt-3 flex text-black gap-2">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.cuisine}</span>
            </div> */}
            <Link href={`/menu/${item.id}`}>
                <Button className="w-full mt-3 sm:mt-4 bg-secondary text-black hover:bg-orange-700 transition-all cursor-pointer duration-300 text-sm sm:text-base" onClick={()=> console.log("click")}>
                    View Details
                </Button>
              </Link>
        </div>
    </div>
  )
}
