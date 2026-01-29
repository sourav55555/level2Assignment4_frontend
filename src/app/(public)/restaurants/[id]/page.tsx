import { Button } from '@/components/ui/button'
import React from 'react'
import { MdOutlineRestaurant } from 'react-icons/md'
import Restaurant from './restaurant'

export default function Restaurants() {

  const cat = ['starter','main dishes','desserts', 'drinks']

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className=" bg-[url('/intro-bg-2.jpg')] bg-no-repeat bg-cover bg-bottom h-40  border-b sticky top-0 z-10">
        <div className="bg-black/50 flex items-center justify-center w-full h-full  px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center gap-4 justify-between ">
            <h1 className="text-2xl sm:text-4xl font-semibold text-secondary">Our Best Restaurants</h1>
            
    
          </div>
        </div>
      </div>

      <Restaurant cat={ cat} />
    </div>
  )
}
