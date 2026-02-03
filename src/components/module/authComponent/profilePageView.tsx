/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { User } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

export default function ProfilePage({ user }: { user?: User }) {
    console.log(user, "suer")
    const [userData, setUserData] = React.useState<User | null>(null);

    React.useEffect(() => {
      if (user) {
        setUserData(user);
      }
    }, [user]);


  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen text-white bg-primary2 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {userData?.image && (
              <Image
                src={userData.image}
                alt={userData.name}
                width={100}
                height={100}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            )}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">{userData?.name}</h1>
              <p className="text-blue-100 mt-1">{userData?.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID */}
            <div className="border-b pb-3 md:col-span-2">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                User ID
              </label>
              <p className="text-gray-800 break-all">{userData?.id}</p>
            </div>

            {/* Name */}
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Name
              </label>
              <p className="text-gray-800">{userData?.name}</p>
            </div>

            {/* Email */}
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Email
              </label>
              <p className="text-gray-800">{userData?.email}</p>
            </div>

            {/* Email Verified */}
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Email Verified
              </label>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  userData?.emailVerified
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {userData?.emailVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>

            {/* Phone */}
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Phone
              </label>
              <p className="text-gray-800">{userData?.phone || 'Not provided'}</p>
            </div>

            {/* Role */}
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Role
              </label>
              <span className="inline-block px-3 py-1 rounded bg-blue-100 text-blue-800 text-sm font-medium">
                {userData?.role}
              </span>
            </div>

            {/* Status */}
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Status
              </label>
              <span className="inline-block px-3 py-1 rounded bg-green-100 text-green-800 text-sm font-medium">
                {userData?.status}
              </span>
            </div>

            {/* Is Active */}
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Active
              </label>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  userData?.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {userData?.isActive ? 'Yes' : 'No'}
              </span>
            </div>

            {/* Address */}
            <div className="border-b pb-3 md:col-span-2">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Address
              </label>
              <p className="text-gray-800">{userData?.address || 'Not provided'}</p>
            </div>

            {/* Description */}
            <div className="border-b pb-3 md:col-span-2">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Description
              </label>
              <p className="text-gray-800">{userData?.description || 'Not provided'}</p>
            </div>

            {/* Created At */}
            <div className="border-b pb-3">
              <label className="text-sm font-semibold text-gray-600 block mb-1">
                Created At
              </label>
              <p className="text-gray-800">{formatDate(userData?.createdAt)}</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
