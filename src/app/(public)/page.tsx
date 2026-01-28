import BgSlider from "@/components/module/homepage/bgSlider";
import { MdOutlineFoodBank, MdOutlineRestaurant } from "react-icons/md";

import cat1 from '@public/homepage/category/cat-01-950x1330.jpg'
import cat2 from '@public/homepage/category/cat-02-950x1188.jpg'
import cat3 from '@public/homepage/category/cat-03-950x1188.jpg'
import discount from '@public/homepage/download.jpg'
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/module/homepage/sectionHeader";
import { restaurantDiscounts } from "@/libs/discountData";
import services from '@public/homepage/services.png'
import Services from "@/components/module/homepage/services";
import Footer from "@/components/module/homepage/footer";

export default function Home() {
  return (
    <div>
      <main className="bg-primary text-white">
        {/* banner section  */}
        <div>
          <div className="h-auto relative">
            <BgSlider />
            <div className="bg-black/50 h-full w-full z-10 absolute top-0 right-0 "></div>
            <div className="h-full w-full z-10 absolute top-0 right-0 flex items-center justify-center">
              <div className="text-white text-center max-w-3xl">
                <h1 className="text-9xl font-light mb-4">Craving Something Delicious?</h1>
                <h2 className="text-3xl text-secondary font-medium">
                  From local favorites to trending dishes — FoodHub brings the best meals straight to your door.
                </h2>
              </div>
            </div>
          </div>

          {/* category section  */}
          <div className="py-20 mx-auto px-4 max-w-328">
            <SectionHeader title="Our Special Dine" subtitle="Favorite Selections"/>
            <div className="grid grid-cols-3 gap-20 mt-12">
              <div>
                <Link href="/" className="relative">
                  <span className="bg-secondary absolute z-10 top-2 right-2 size-18 rounded-full flex items-center justify-center">
                    <MdOutlineFoodBank size={50} className="text-black" />
                  </span>
                  <div className=" group overflow-hidden rounded-t-full">
                     
                      <Image src={cat1} className="h-100 ease-in-out group-hover:scale-105  transition-all duration-300 object-cover rounded-t-full" alt="Appetizers" />
                    </div>
                  </Link>
                <Link href="/" className="text-center mt-4 space-y-3 px-8 block">
                  <p className="text-3xl mt-6">Starters</p>
                  <p className="text-sm leading-6">Small bites, big flavors — the perfect beginning to your dining experience</p>
                  <p className="uppercase text-secondary hover:border-b border-amber-400 text-xs font-medium transition-all duration-300 w-fit mx-auto py-1.5 px-1.5">View Menu</p>
                </Link>
              </div>
              <div>
                <Link href="/" className="relative">
                  <span className="bg-secondary absolute z-10 top-2 right-2 size-18 rounded-full flex items-center justify-center">
                    <MdOutlineFoodBank size={50} className="text-black" />
                  </span>
                  <div className=" group overflow-hidden rounded-t-full">
                     
                      <Image src={cat2} className="h-100 ease-in-out group-hover:scale-105  transition-all duration-300 object-cover rounded-t-full" alt="Appetizers" />
                    </div>
                </Link>
                <Link href="/" className="text-center mt-4 space-y-3 px-8 block">
                  <p className="text-3xl mt-6">Main Dishes</p>
                  <p className="text-sm leading-6">Bold flavors and masterful creations for a truly unforgettable main course</p>
                  <p className="uppercase text-secondary hover:border-b border-amber-400 text-xs font-medium transition-all duration-300 w-fit mx-auto py-1.5 px-1.5">View Menu</p>
                </Link>
         
              </div>
              <div>
                <Link href="/" className="relative">
                  <span className="bg-secondary absolute z-10 top-2 right-2 size-18 rounded-full flex items-center justify-center">
                    <MdOutlineFoodBank size={50} className="text-black" />
                  </span>
                  <div className=" group overflow-hidden rounded-t-full">
                     
                      <Image src={cat3} className="h-100 ease-in-out group-hover:scale-105  transition-all duration-300 object-cover rounded-t-full" alt="Appetizers" />
                    </div>
                </Link>
                <Link href="/" className="text-center mt-4 space-y-3 px-8 block">
                  <p className="text-3xl mt-6">Desserts</p>
                  <p className="text-sm leading-6">End your meal on a sweet note with irresistible dessert creations</p>
                  <p className="uppercase text-secondary hover:border-b border-amber-400 text-xs font-medium transition-all duration-300 w-fit mx-auto py-1.5 px-1.5">View Menu</p>
                </Link>
     
              </div>
       
          
            </div>
          </div>

          {/* discount section  */}

          <div className=" bg-primary2">
            <div className="py-20 mx-auto px-4 max-w-300">
              <SectionHeader
                title="Special Fine Dine"
                subtitle="Best Bites, Best Prices"
              />
              <div className="rounded-2xl mt-8 bg-[url('/homepage/menu-bg-paper.jpg')] bg-cover bg-center bg-no-repeat">
                <p className="text-center text-secondary tracking-widest text-lg font-medium uppercase pt-8">Discounts</p>
                {/* <Image src={discountBg} className="h-full" fill alt="discount bg"/> */}
                <div className="grid grid-cols-2 gap-10 p-16 pt-8">
                    {
                      restaurantDiscounts.map(item =>
                        <div
                          key={item.restaurantName}
                          className="flex gap-6 max-w-md mx-auto"
                        >
                          <Image src={discount} className="size-20 object-cover rounded-full" alt={item.restaurantName} />
                          <div className="mt-1">
                            <p className="w-full flex uppercase tracking-wider items-center justify-between">{item.restaurantName} 
                              <span className="text-secondary text-lg font-medium inline-block ms-auto">.............{item.discountPercent}%</span>
                            </p>
                            <p className="text-sm mt-2 text-[#a7a7a7]">{ item.description}</p>
                          </div>
                        </div>
                      )
                      }
                    </div>
          
                </div>
              </div>
          </div>
          
          {/* services  */}
          <Services />
          
          {/* footer  */}
          <Footer/>
        </div>
      </main>
    </div>
  );
}
