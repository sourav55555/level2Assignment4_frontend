"use client";

import Image from 'next/image'
import Link from 'next/link'
import logo from '@public/homepage/logo.png'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { IoIosLogIn } from 'react-icons/io';
import { BsBasket3 } from 'react-icons/bs';
import { Badge } from '@/components/ui/badge';

export default function TopNavbar() {

  const pathName = usePathname()
  console.log(pathName, "pathj")

  const menu = [
    {
      label: "Home",
      link: "/"
    },{
      label: "Our Menu",
      link: "/menu"
    },{
      label: "Restaurants",
      link: "/restaurants"
    },
  ]

  return (
    <nav className='h-20 bg-primary flex items-center justify-between ps-8 pe-7'>
      <div>
        <Link href="/">
          <Image src={logo} alt="FoodHub Logo"  width={140} height={70} />
        </Link>
      </div>
      <div className='h-full'>
        <ul className='flex items-center justify-center gap-5 h-full'>
        
            {
              menu.map(item => (
                <li  key={item.label} className='h-full'>
                  <Link href={item.link}
                    className={`text-white text-sm px-3 h-full flex items-center justify-center uppercase               ${pathName.includes(item.link) ? 
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
        <Link href="/login">
          <Button className='bg-secondary rounded-3xl w-28'><IoIosLogIn className='me-0.5' />
            Login
          </Button>
        </Link>
      </div>
    </nav>
  )
}
