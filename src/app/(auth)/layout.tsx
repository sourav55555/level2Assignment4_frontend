import AuthTopNavbar from '@/components/module/authComponent/AuthTopNavbar';

import { userService } from '@/services/user.service';
import React, { ReactNode } from 'react'

export default async function AuthLayout({ children }: { children: ReactNode }) {


    return (
        <div className='overflow-x-hidden'>
            <AuthTopNavbar />
            {children}
        </div>
    )
}
