"use client";

import Image from 'next/image'
import Link from 'next/link'
import logo from '@public/homepage/logo.png'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

import { BsBasket3 } from 'react-icons/bs';
import { Badge } from '@/components/ui/badge';
import { RiMenu3Fill } from 'react-icons/ri';
import { useMemo, useState } from 'react';

import { UserRole } from '@/libs/constants';
import { getLocalUserData } from '@/libs/localStorage';
import defaultUser from '@public/user.png'
import ProfilePopover from './ProfilePopover';

export default function AuthTopNavbar() {
  

    const pathName = usePathname()
    const [sideNav, setSideNav] = useState<boolean>(false)
    const user = getLocalUserData();

    const providerMenu = [
        {
            label: "Home",
            link: "/"
        },
        {
            label: "Dashboard",
            link: "/provider/dashboard"
        },
        {
            label: "My Menu",
            link: "/provider/menu"
        }, {
            label: "Orders",
            link: "/provider/orders"
        },
    ]

        const adminMenu = [
        {
            label: "Dashboard",
            link: "/admin/dashboard"
        },
        {
            label: "Users",
            link: "/admin/users"
        },
        {
            label: "Categories",
            link: "/admin/category"
        },

        {
            label: "Orders",
            link: "/admin/orders"
        },
    ]

    
     const showMenu = useMemo(() => {
        if (user?.role === UserRole.provider) {
            return providerMenu
        }else if (user?.role === UserRole.admin) {
            return adminMenu
        }
        return []
    }, [user])

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
                    <Image src={logo} alt="FoodHub Logo" width={140} height={70} />
                </Link>
            </div>
            <div className='h-full hidden md:block'>
                <ul className='flex items-center justify-center gap-5 h-full'>
                    {
                        showMenu.map(item => (
                            <li key={item.label} className='h-full'>
                                <Link href={item.link}
                                    className={`text-white text-sm px-3 h-full flex items-center justify-center uppercase ${isActive(item.link) ?
                                        'border-b-amber-400 border-b-[6px]' : "border-b-[6px] border-transparent"
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
                {/* <div className='relative'>
                    <BsBasket3 className='text-white' size={20} />
                    <Badge className='bg-secondary px-1 py-0.5 absolute -top-2.5 -right-2 h-4'>0</Badge>
                </div> */}
                <Button
                    className='md:hidden inline-block text-secondary p-0'
                    onClick={() => setSideNav(!sideNav)}
                >
                    <RiMenu3Fill className='size-6.5' size={28} />
                </Button>
                <ProfilePopover image={ user?.image as string } name={user?.name } role={user?.role} /> 
            </div>
            {/* sidenav */}

            <div className={`h-screen bg-primary2 w-3/4 absolute transition-all p-8 duration-500 ease-in-out top-full ${sideNav ? 'right-0' : '-right-full'} z-50`}>
                <ul className='space-y-4'>
                    {
                        showMenu.map(item => (
                            <li key={item.label} className='h-full'>
                                <Link href={item.link}
                                    className={`text-white text-sm px-3 h-full flex items-center uppercase ${pathName.includes(item.link) ?
                                        'text-secondary' : "text-white"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div>
                    <Image src={user?.image || defaultUser}
                        className='size-5 object-cover object-top rounded-full'
                        width={25}
                        height={25}
                        alt={user?.name || ""} />
                </div>
            </div>
        </nav>
    )
}