import { userData } from '@/actions/user.actions'
import ProfilePage from '@/components/module/authComponent/profilePageView'
import React from 'react'

export default async function Profile() {
    const userDataResult = await userData()
  return (
      <ProfilePage user={userDataResult.data.data} />
  )
}
