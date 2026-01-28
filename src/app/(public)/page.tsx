import BgSlider from "@/components/module/homepage/bgSlider";
import { MdOutlineRestaurant } from "react-icons/md";
import { RiRestaurant2Line } from "react-icons/ri";


export default function Home() {
  return (
    <div>
      <main className="bg-primary">
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
          <div className="py-16">
            <h3 className="text-secondary uppercase text-sm flex items-center justify-center gap-3 font-semibold">
              <MdOutlineRestaurant />
              Our Special Dine
              <MdOutlineRestaurant />
            </h3>
          </div>

        </div>
      </main>
    </div>
  );
}
