import { useEffect, useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbCurrencyTaka } from "react-icons/tb";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiEdit2Fill } from "react-icons/ri";
import { CategoryType, MenuItem } from "@/lib/types";
import { getAllCategory } from "@/actions/category.action";
import { DietPreference, MealStatus } from "@/libs/constants";
import { updateMealReq } from "@/actions/provider.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Types



interface UpdateMealFormValues {
  name: string;
  ingredient: string;
  price: string;
  cuisineId: string;
  dietPreference: string;
  status: string;
  description: string;
  tags: string;
  imageUrl: string;
}

interface UpdateMealDrawerProps {
  mealData: MenuItem;
}

// Validation Schema
const updateMealSchema = z.object({
  name: z.string().min(2, "Meal name must be at least 2 characters"),
  ingredient: z.string().min(5, "Ingredients are required"),
  price: z.string().min(1, "Price is required"),
  cuisineId: z.string().min(1, "Cuisine is required"),
  dietPreference: z.string().min(1, "Diet preference is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().optional(),
  tags: z.string().optional(),
  imageUrl: z.string(),
});

export function UpdateMealDrawer({
  mealData
}: UpdateMealDrawerProps) {
  const [open, setOpen] = useState(false);

  const initialValues: UpdateMealFormValues = {
    name: mealData.name || "",
    ingredient: mealData.ingredient || "",
    price: mealData.price.toString() || "",
    cuisineId: mealData.cuisineId || "",
    dietPreference: mealData.dietPreference || "",
    status: mealData.status,
    description: mealData.description || "",
    tags: mealData.tags || "",
    imageUrl: mealData.imageUrl || "",
    };
    
    const [cuisineData, setCuisineData] = useState<CategoryType[]>([])
    const router = useRouter()
   
    useEffect(() => {
        const category = async () => {
          const data = await getAllCategory();
          setCuisineData(data)
        }
        category()
      }, [])

  const handleSubmit = async (values: UpdateMealFormValues) => {
      try {
          const payload = {
              ...values,
              price: +values.price
          } 
          const res = await updateMealReq(payload, mealData.id)
          console.log(res)
          if (res.data.success) {
              toast.success("Item updated");
              router.refresh()
          }

    } catch (error) {
      console.error("Error updating meal:", error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger  asChild>
              <Button className='bg-secondary w-1/2 h-12 hover:bg-amber-300 transition-all rounded-lg duration-300'>
                  <RiEdit2Fill size={14} /> Edit
              </Button> 
                 
      </DrawerTrigger>
      <DrawerContent  className="max-h-screen drawer-width  bg-primary2 text-white">
        <div className="mx-auto w-full  overflow-y-auto px-4">
          <DrawerHeader>
            <DrawerTitle className="text-secondary">Update Meal</DrawerTitle>
            <DrawerDescription>
              Make changes to your meal. Click save when you&apos;re done.
            </DrawerDescription>
          </DrawerHeader>

          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(updateMealSchema)}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6 p-4">
                {/* Meal Name & Image URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="name">Meal Name</Label>
                    <Field name="name">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="name"
                          placeholder="Chicken Biryani"
                          className={`${
                            errors.name && touched.name
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-gray-300 focus-visible:ring-orange-500"
                          }`}
                        />
                      )}
                    </Field>
                    {errors.name && touched.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Meal Image Url</Label>
                    <Field name="imageUrl">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="image"
                          type="url"
                          placeholder="example.com/new.jpg"
                          className={`${
                            errors.imageUrl && touched.imageUrl
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-gray-300 focus-visible:ring-orange-500"
                          }`}
                        />
                      )}
                    </Field>
                    {errors.imageUrl && touched.imageUrl && (
                      <p className="text-sm text-red-500">{errors.imageUrl}</p>
                    )}
                  </div>
                </div>

                {/* Ingredients */}
                <div className="space-y-2">
                  <Label htmlFor="ingredient">Ingredients</Label>
                  <Field name="ingredient">
                    {({ field }: FieldProps) => (
                      <Textarea
                        {...field}
                        id="ingredient"
                        placeholder="Rice, chicken, spices..."
                        className={`${
                          errors.ingredient && touched.ingredient
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "border-gray-300 focus-visible:ring-orange-500"
                        }`}
                      />
                    )}
                  </Field>
                  {errors.ingredient && touched.ingredient && (
                    <p className="text-sm text-red-500">{errors.ingredient}</p>
                  )}
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="price">
                      Price (<TbCurrencyTaka />)
                    </Label>
                    <Field name="price">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="price"
                          type="number"
                          onChange={(e) =>
                            setFieldValue("price", e.target.value)
                          }
                          placeholder="250"
                          className={`${
                            errors.price && touched.price
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-gray-300 focus-visible:ring-orange-500"
                          }`}
                        />
                      )}
                    </Field>
                    {errors.price && touched.price && (
                      <p className="text-sm text-red-500">{errors.price}</p>
                    )}
                  </div>

                  <div className="space-y-2 w-full">
                    <Label>Category</Label>
                    <Field name="cuisineId">
                      {({ field }: FieldProps) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) =>
                            setFieldValue("cuisineId", value)
                          }
                        >
                          <SelectTrigger className="h-12 w-full">
                            <SelectValue
                              className="capitalize"
                              placeholder="Select cuisine"
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-amber-100">
                            {cuisineData.map((item: CategoryType) => (
                              <SelectItem
                                key={item.id}
                                value={item.id}
                                className="capitalize"
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    {errors.cuisineId && touched.cuisineId && (
                      <p className="text-sm text-red-500">{errors.cuisineId}</p>
                    )}
                  </div>
                </div>

                {/* Diet Preference & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Diet Preference</Label>
                    <Field name="dietPreference">
                      {({ field }: FieldProps) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) =>
                            setFieldValue("dietPreference", value)
                          }
                        >
                          <SelectTrigger className="h-12 w-full">
                            <SelectValue
                              className="capitalize"
                              placeholder="Select preference"
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-amber-100">
                            {Object.entries(DietPreference).map(
                              ([key, label]) => (
                                <SelectItem
                                  key={key}
                                  value={label}
                                  className="capitalize"
                                >
                                  {key}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    {errors.dietPreference && touched.dietPreference && (
                      <p className="text-sm text-red-500">
                        {errors.dietPreference}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Field name="status">
                      {({ field }: FieldProps) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) =>
                            setFieldValue("status", value)
                          }
                        >
                          <SelectTrigger className="h-12 w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="bg-amber-100">
                            <SelectItem value={MealStatus.available}>
                              Available
                            </SelectItem>
                            <SelectItem value={MealStatus.unavailable}>
                              Unavailable
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    {errors.status && touched.status && (
                      <p className="text-sm text-red-500">{errors.status}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description (optional)</Label>
                  <Field name="description">
                    {({ field }: FieldProps) => (
                      <Textarea {...field} placeholder="Short description" />
                    )}
                  </Field>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags (comma separated)</Label>
                  <Field name="tags">
                    {({ field }: FieldProps) => (
                      <Input {...field} placeholder="spicy, popular" />
                    )}
                  </Field>
                </div>

                <DrawerFooter className="px-0 flex flex-row items-center gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 bg-gradient-to-r from-orange-600 to-pink-600 h-12 rounded-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                        Updating meal...
                      </span>
                    ) : (
                      "Update Meal"
                    )}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline" className="h-12 w-1/2">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </Form>
            )}
          </Formik>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
