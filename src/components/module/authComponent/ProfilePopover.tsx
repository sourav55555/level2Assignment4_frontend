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
import { UserRole } from '@/libs/constants';

const ProfilePopover = ({ image, name, role }: { image?: string, name?: string, role?: string }) => {
    const router = useRouter();
    console.log(role, "role")

    // const userItem = [
        
    //     {
    //         label: "profile",
    //         link: `${role === "provider" ? "/provider" : role === "admin" ? "/admin" : ""}/profile`
    //     },
        
    // ]
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
                
                    <Link
                    
                        href={`${role === UserRole.provider ? "/provider" :
                            role === UserRole.admin ? "/admin" : ""}/profile`}
                        className='block border-b w-fit mx-auto pb-0.5
                                 mt-3 uppercase tracking-wide text-sm 
                                 font-medium hover:text-secondary transition-all duration-300'
                            >
                                Profile
                            </Link>
                     

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