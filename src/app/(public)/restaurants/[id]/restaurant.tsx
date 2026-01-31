'use client';
import ItemCard from '@/components/module/publicComponent/itemCard';
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { MdOutlineRestaurant } from 'react-icons/md'
import { foodItems } from '../../menu/menuPage';

export default function Restaurant({ cat }) {
  
  const [activeTab, setActiveTab] = useState(cat[0]);

  return (
    <div className='pt-16 text-white'>
        <p className='text-5xl text-center'>Delicious Menu</p>
        <div className='flex items-center flex-wrap px-6 justify-center  gap-3 md:gap-5 mt-12 uppercase'>
          {
            cat.map((item,index) => (
              <div  key={item} className='flex flex-wrap items-center gap-5 '>
                <Button
                  variant="ghost"
                  className={`uppercase transition-all duration-300 cursor-pointer tracking-wider ${item === activeTab? 'border-b-amber-400' : "border-transparent"} border-b `}
                  onClick={()=> setActiveTab(item)}
                >{item}</Button>
                {index + 1 !== cat.length &&
                  <MdOutlineRestaurant className='text-secondary hidden md:block' />
                }
              </div>
            ))
          }
      </div>
      <div className='max-w-300 mx-auto p-8 mt-8 rounded-lg'>
          {foodItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center">
                <p className="text-gray-500 text-base sm:text-lg">No items found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:px-0 px-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                {foodItems.map(item => (
                  <ItemCard key={item.id} item={item}/>
                ))}
              </div>
            )}
      </div>
    </div>
  )
}
