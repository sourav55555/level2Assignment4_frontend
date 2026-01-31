/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { use, useEffect, useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

import { MealStatus, DietPreference } from "@/libs/constants";
import { MdOutlineFoodBank } from "react-icons/md";
import Image from "next/image";
import loginLeft from '@public/login.jpg'
import { TbCurrencyTaka } from "react-icons/tb";
import { getAllCategory } from "@/actions/category.action";
import { CategoryType } from "@/lib/types";
import { createMealReq } from "@/actions/provider.action";
import { useRouter } from "next/navigation";


const createMealSchema = z.object({
  name: z.string()
    .min(2, "Meal name must be at least 2 characters"),
  ingredient: z.string().min(5, "Ingredients are required"),
  price:  z
  .string()
  .min(1, "Price is required"),
  cuisineId: z.string().min(1, "Cuisine is required"),
  dietPreference: z.string().min(1, "Diet preference is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().optional(),
  tags: z.string().optional(),
  imageUrl: z.string()
});

export type CreateMealFormValues = z.infer<typeof createMealSchema>;

export default function CreateMealForm() {

  const [cuisineData, setCuisineData] = useState<CategoryType[]>([])
  const router = useRouter()
  useEffect(() => {
    const category = async () => {
      const data = await getAllCategory();
      console.log(data)
      setCuisineData(data)
    }
    category()
  }, [])
  

  const initialValues: CreateMealFormValues = {
    name: "",
    ingredient: "",
    price: "",
    cuisineId: "",
    dietPreference: "",
    status: MealStatus.available,
    description: "",
    tags: "",
    imageUrl: ""
  };

  const handleSubmit = async (values: CreateMealFormValues) => {
    try {

      const data = {
        ...values,
        price: Number(values.price)
      }
      // await createMeal(values)
      const res = await createMealReq(data);
      if (res.data.success) {
        toast.success("Meal created successfully");
        router.push("/provider/menu")
      }

    } catch (error: any) {
      toast.error(error?.message || "Failed to create meal");
    }
  };

  return (

   <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative justify-center items-center overflow-hidden bg-primary">
        <div className="relative max-w-80">
            <span className="bg-secondary absolute z-10 -top-2 md:top-2 -right-2 md:right-2 size-18 rounded-full flex items-center justify-center">
                <MdOutlineFoodBank size={50} className="text-black" />
            </span>
            <div className=" group overflow-hidden rounded-t-full">
                
                <Image src={loginLeft} className="h-52 md:h-100 ease-in-out group-hover:scale-105  transition-all duration-300 object-cover rounded-t-full" alt="Appetizers" />
                </div>
        </div>
      </div>

    <div className="w-full lg:w-1/2 mx-auto bg-primary2 px-14 py-8 text-white">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-secondary">Create Meal</h2>
        <p className="text-gray-300">Add a new meal to your menu</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(createMealSchema)}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
              {/* Meal Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="name">Meal Name</Label>
                    <Field name="name">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="name"
                          placeholder="Chicken Biryani"
                          className={`${errors.name && touched.name
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-gray-300 focus-visible:ring-orange-500"}`}
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
                          className={`${errors.imageUrl && touched.imageUrl
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-gray-300 focus-visible:ring-orange-500"}`}
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
                    className={`${errors.ingredient && touched.ingredient
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300 focus-visible:ring-orange-500"}`}
                  />
                )}
              </Field>
              {errors.ingredient && touched.ingredient && (
                <p className="text-sm text-red-500">{errors.ingredient}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div className="space-y-2 w-full">
                <Label htmlFor="price">Price (<TbCurrencyTaka />)</Label>
                <Field name="price">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      onChange={(e) =>
                   
                        setFieldValue("price",e.target.value)
                      }
                      placeholder="250"
                      className={`${errors.price && touched.price
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-gray-300 focus-visible:ring-orange-500"}`}
                    />
                  )}
                </Field>
                {errors.price && touched.price && (
                  <p className="text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              {/* Cuisine */}
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
                        <SelectValue className="capitalize" placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent className="bg-amber-100">
                          {/* Replace with dynamic cuisines */}
                          {
                            cuisineData.map((item: CategoryType) =>
                              <SelectItem
                                key={item.id}
                                value={item.id}
                                className="capitalize"
                              >{item.name}</SelectItem>
                            )
                            
                          }

                      </SelectContent>
                    </Select>
                  )}
                </Field>
                {errors.cuisineId && touched.cuisineId && (
                  <p className="text-sm text-red-500">{errors.cuisineId}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Diet Preference */}
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
                        <SelectValue className="capitalize" placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent className="bg-amber-100">
                        {
                          Object.entries(DietPreference).map(([key, label]) => (
                            <SelectItem key={key} value={label} className="capitalize">
                              {key}
                            </SelectItem>
                          ))
                        }
                
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

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Field name="status">
                  {({ field }: FieldProps) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => setFieldValue("status", value)}
                    >
                      <SelectTrigger className="h-12 w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-amber-100">
                        <SelectItem value={MealStatus.available}>Available</SelectItem>
                        <SelectItem value={MealStatus.unavailable}>Unavailable</SelectItem>
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-orange-600 to-pink-600 h-14 rounded-xl"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Creating meal...
                </span>
              ) : (
                "Create Meal"
              )}
            </Button>
          </Form>
        )}
      </Formik>
      </div>
      </div>
  );
}
