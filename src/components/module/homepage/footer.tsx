import Image from 'next/image';
import React from 'react';
import logo from '@public/homepage/logo.png'
import footerPic from '@public/homepage/footer.jpg'
import { MdOutlineFoodBank, MdOutlineRestaurant } from 'react-icons/md';

const Footer = () => {
    return (
        <div className="pt-16 pb-6 mx-auto px-4 border-t border-amber-400 max-w-300">
            <Image src={logo} className='h-auto mx-auto w-52' alt='logo' />
            <div className='mt-8 flex flex-col md:flex-row justify-around gap-8 md:gap-6 pb-8'>
                <div className='max-w-72'>
                    <p className='text-justify'>FoodHub is your go-to platform for delicious meals and seamless ordering. Browse menus from a variety of local restaurants, place your order in just a few clicks, and enjoy fresh food delivered straight to your door. Whether it’s a quick lunch, a family dinner, or catering for a special event, FoodHub makes every meal easy, convenient, and enjoyable.</p>
                </div>
                <div className='text-center text-gray-200 space-y-2'>
                    <p className="text-secondary uppercase text-sm flex items-center justify-center gap-3 font-semibold"> 
                        <MdOutlineRestaurant />
                        Visit Us
                        <MdOutlineRestaurant />
                    </p>
                    <p className='hover:text-amber-400 transition-all duration-300'>Tastyc, Arrondissement, Paris 9578</p>
                    <p className='hover:text-amber-400 transition-all duration-300'>Daily - 8.00 am to 10.00 pm</p> 
                    <p className='hover:text-amber-400 transition-all duration-300'>booking@tastyccafe.com</p>
                    <p className='hover:text-amber-400 transition-all duration-300'>Booking Request: +1-800-852-9001</p>
                </div>
                <div className='max-w-96'>
                     <div className="relative">
                  <span className="bg-secondary absolute z-10 -top-2 -right-2 size-14 rounded-full flex items-center justify-center">
                    <MdOutlineFoodBank size={40} className="text-black" />
                  </span>
                  <div className="">
                     
                      <Image src={footerPic} className="h-58  duration-300 object-top object-cover rounded-[5rem] w-52" alt="footer" />
                    </div>
                </div>
                </div>
            </div>
            <hr />
            <div className='flex items-center py-8 justify-between'>
                <p>© 2025 All Rights Reserved.</p>
                <p>Developed By <span className='text-secondary'>Sourav</span></p>
            </div>
        </div>
    );
};

export default Footer;