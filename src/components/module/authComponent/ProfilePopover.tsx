"use client";

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import React from 'react';
import defaultUser from '@public/user.png';
import { Button } from '@/components/ui/button';
import { PiSignOutBold } from "react-icons/pi";
import Link from 'next/link';
import logout from './logout';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ProfilePopover = ({ image, name }: { image?: string, name?: string }) => {
    const router = useRouter();

    const userItem = [
        
        {
            label: "profile",
            link: "/profile"
        },
        
    ]
    const signOut = async () => {
        const res = await logout();
        if (res.data?.success) {
            toast.success("Logout Successful!")
            router.push("/")
        }
    };


    return (
         <Popover>
            <PopoverTrigger className='cursor-pointer'>
                <div>
                    <Image src={image || defaultUser}
                        className='size-10 object-cover object-top rounded-full'
                        width={40}
                        height={40}
                        alt="profile image" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-52 bg-amber-100">
                <div className="text-center">
                    <p className="font-medium text-lg mb-4 text-primary">{name}</p>
                    {
                        userItem.map(item => (
                            <Link
                                key={item.label}
                                href={item.link}
                                className='block border-b w-fit mx-auto pb-0.5 mt-3 uppercase tracking-wide text-sm font-medium hover:text-secondary transition-all duration-300'
                            >
                                {item.label}
                            </Link>
                        ))
                    }
                 

                    <Button
                        onClick={signOut}
                        className='bg-red-100 text-red-500 border-red-500 border hover:bg-red-200 mt-4 text-sm h-7 duration-300'>
                        <PiSignOutBold /> Logout
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ProfilePopover;