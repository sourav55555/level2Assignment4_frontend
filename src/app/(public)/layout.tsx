import TopNavbar from '@/components/module/publicComponent/TopNavbar'
import React, { ReactNode } from 'react'

export default function layout({children}: {children: ReactNode}) {
  return (
    <div>
        <TopNavbar/>
        {children}
    </div>
  )
}
