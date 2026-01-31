"use client";

import Image from 'next/image'
import Link from 'next/link'
import logo from '@public/homepage/logo.png'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { IoIosLogIn } from 'react-icons/io';
import { BsBasket3 } from 'react-icons/bs';
import { Badge } from '@/components/ui/badge';
import { RiMenu3Fill } from 'react-icons/ri';
import { useState } from 'react';

export default function TopNavbar() {

  const pathName = usePathname()
  const [sideNav, setSideNav] = useState<boolean>(false)

  const menu = [
    {
      label: "Home",
      link: "/"
    },{
      label: "Top Menu",
      link: "/menu"
    },{
      label: "Restaurants",
      link: "/restaurants"
    },
  ]

  const isActive = (itemLink: string) => {

    if (pathName === "/" && itemLink === "/") {
      return true
    }
    else if (pathName.includes(itemLink) && itemLink !== "/") {
      return true
    }
  }

  return (
    <nav className='h-20 bg-primary flex items-center justify-between ps-6 md:ps-8 pe-4 md:pe-7 relative'>
      <div>
        <Link href="/">
          <Image src={logo} alt="FoodHub Logo"  width={140} height={70} />
        </Link>
      </div>
      <div className='h-full hidden md:block'>
        <ul className='flex items-center justify-center gap-5 h-full'>
        
            {
              menu.map(item => (
                <li  key={item.label} className='h-full'>
                  <Link href={item.link}
                    className={`text-white text-sm px-3 h-full flex items-center justify-center uppercase               ${isActive(item.link) ? 
                      'border-b-amber-400 border-b-[6px]': "border-b-[6px] border-transparent"
                    }`}
                  >
                    {item.label}
                    </Link>
                </li>
              ))
            }
        
        </ul>
      </div>
      <div className='flex items-center gap-6'>
        <div className='relative'>
          <BsBasket3 className='text-white' size={20} />
           <Badge className='bg-secondary px-1 py-0.5 absolute -top-2.5 -right-2 h-4'>0</Badge>
        </div>
        <Button
          className='md:hidden inline-block text-secondary p-0'
          onClick={()=> setSideNav(!sideNav)}
        >
          <RiMenu3Fill className='size-6.5' size={28} />
        </Button>
        <Link href="/login" className='hidden md:inline-block cursor-pointer'>
          <Button
            className='bg-secondary rounded-3xl w-28 cursor-pointer'><IoIosLogIn className='me-0.5' />
            Login
          </Button>
        </Link>
      </div>
      {/* sidenav */}
      
      <div className={`h-screen bg-primary2 w-3/4 absolute transition-all p-8 duration-500 ease-in-out top-full ${sideNav ? 'right-0' : '-right-full'} z-50`}>
          <ul className='space-y-4'>
        
            {
              menu.map(item => (
                <li  key={item.label} className='h-full'>
                  <Link href={item.link}
                    className={`text-white text-sm px-3 h-full flex items-center uppercase               ${pathName.includes(item.link) ? 
                      'text-secondary': "text-white"
                    }`}
                  >
                    {item.label}
                    </Link>
                </li>
              ))
            }
        
        </ul>
         <Link href="/login" className='block mx-auto w-fit'>
          <Button
            className='bg-secondary rounded-3xl w-36 mt-10 '><IoIosLogIn className='me-0.5' />
            Login
          </Button>
        </Link>
      </div>
    </nav>
  )
}
