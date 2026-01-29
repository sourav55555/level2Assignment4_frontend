import Image from 'next/image'
import React from 'react'
import SectionHeader from './sectionHeader'
import { MdOutlineFoodBank } from 'react-icons/md'
import services from '@public/homepage/service/services.png'
import serve1 from '@public/homepage/service/s-icon-1x.png'
import serve2 from '@public/homepage/service/s-icon-2x.png'
import serve3 from '@public/homepage/service/s-icon-3x.png'
import serve4 from '@public/homepage/service/s-icon-4x.png'

const imageSection = () => {
  return   <div className="relative">
              <span className="bg-secondary absolute z-10 top-2 right-2 size-18 rounded-full flex items-center justify-center">
                <MdOutlineFoodBank size={50} className="text-black" />
              </span>
              <div className=" group overflow-hidden rounded-t-full">
                  
                  <Image src={services} className="h-100  duration-300 object-top object-cover rounded-t-full" alt="Appetizers" />
                </div>
            </div>
}

export default function Services() {
  return (
    <div className="py-20 mx-auto px-4 max-w-300">
            <SectionHeader
              title="our services"
              subtitle="Your all-in-one meal-ordering platform."
            />
            <div className="flex md:flex-row flex-col md:gap-18 mt-14 md:mt-24">
              <div className='max-w-full md:max-w-80'>
                <div>
                    <div className='flex flex-col-reverse md:flex-row items-center md:justify-end gap-4 md:gap-6'>
                      <p className='uppercase text-center md:text-right tracking-widest'>Party & <br />
                              Celebrations</p>    
                        <Image src={serve1} className='size-14' alt='Party & Celebration'/>
                      </div>
                      <p className='mt-4 muted-text text-center md:text-right'>Delicious meals for every celebration—birthdays, anniversaries, or corporate events—delivered fresh and on time.</p>
                </div>
                <div className='mt-10 md:mt-24'>
                    <div className='flex flex-col-reverse md:flex-row items-center md:justify-end gap-4 md:gap-6'>
                      <p className='uppercase text-center md:text-right tracking-widest'>Luxury <br /> Fine Dining</p>    
                        <Image src={serve2} className='size-14' alt='Party & Celebration'/>
                      </div>
                      <p className='mt-4 muted-text text-center md:text-right'>Savor gourmet dishes from top restaurants, right at home. Perfect for special evenings or indulgent treats.</p>
                </div>
              </div>
              {/* image section  */}
              <div className='hidden md:block'>
                {imageSection()}
              </div>
                <div className='max-w-full md:max-w-80 mt-10 md:mt-0'>
                    <div>
                        <div className='flex items-center flex-col-reverse md:flex-row-reverse justify-end gap-4 md:gap-6'>
                            <p className='uppercase text-center md:text-left tracking-widest'>Banquet <br /> Hall</p>    
                            <Image src={serve3} className='size-14' alt='Party & Celebration'/>
                        </div>
                        <p className='mt-4 md:text-left text-center muted-text '>Stress-free catering for large gatherings. Weddings, conferences, or parties—our menus impress every guest.</p>
                    </div>
                    <div className='mt-10 md:mt-24'>
                        <div className='flex items-center flex-col-reverse md:flex-row-reverse justify-end gap-4 md:gap-6'>
                            <p className='uppercase text-center md:text-left tracking-widest'>Outdoor <br /> Catering</p>    
                            <Image src={serve4} className='size-14' alt='Party & Celebration'/>
                            </div>
                            <p className='mt-4 md:text-left text-center muted-text '>Fresh, flavorful meals for picnics, garden parties, or any outdoor event. Catering that comes to you!</p>
                    </div>
                  </div>
                  {/* image section for mobile  */}
                  <div className='md:hidden block mt-14 px-6'>
                      {imageSection()}
                  </div>
            </div>
          </div>
  )
}
