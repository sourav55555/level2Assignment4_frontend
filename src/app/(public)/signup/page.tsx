"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
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
import { MdOutlineFoodBank } from "react-icons/md";
import Image from "next/image";
import signupImg from '@public/signup.jpg'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { UserRole } from "@/libs/constants";
import { useRouter } from "next/navigation";
import { setLocalUserData } from "@/libs/localStorage";


// Zod validation schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z
    .string()
    .max(12, "Invalid phone number")
    .min(11, "Invalid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .min(1, "Password is required"),
  role: z.string(),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  // const [selectedRole, setSelectedRole] = useState<string>("");
  const router = useRouter();

  const initialValues: SignupFormValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    role: UserRole.user,
  };

  // Then in handleSubmit
  const handleSubmit = async (values: SignupFormValues) => {

    const { data, error } = await authClient.signUp.email(values)

    if (data) {
      toast.success("Registration Successful!")
      setLocalUserData({
        ...data.user,
        createdAt: data.user.createdAt instanceof Date ? data.user.createdAt.toISOString() : data.user.createdAt,

      })
      if (values.role === UserRole.provider) {
    
        router.push("/provider/dashboard")
      } else if (values.role === UserRole.user) {
        router.push("/menu")
      } else if (values.role === UserRole.admin) {
        router.push("/admin/dashboard")
      }

    } else {
      toast.error(error.message || "Registration failed!")
    }
  };


  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-primary">
      {/* Left Side - Image/Branding */}

      <div className="hidden lg:flex lg:w-1/2 relative justify-center items-center overflow-hidden bg-primary">
        <div className="relative max-w-80">
          <span className="bg-secondary absolute z-10 -top-2 md:top-2 -right-2 md:right-2 size-18 rounded-full flex items-center justify-center">
            <MdOutlineFoodBank size={50} className="text-black" />
          </span>
          <div className=" group overflow-hidden rounded-t-full">

            <Image src={signupImg} className="h-52 md:h-100 ease-in-out group-hover:scale-105  transition-all duration-300 object-cover rounded-t-full" alt="Appetizers" />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-primary2 text-white">
        <div className="w-full max-w-lg space-y-7">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-secondary">
              Create An Account
            </h2>
            <p className="text-gray-300">
              Get started in just a few steps.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(signupSchema)}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="space-y-5">
                  <div className="flex gap-4 w-full flex-col md:flex-row ">
                    {/* Name Field */}
                    <div className="space-y-2 w-full md:w-1/2">
                      <Label htmlFor="name" className="text-sm font-semibold ">
                        Full Name
                      </Label>
                      <Field name="name">
                        {({ field }: FieldProps) => (
                          <Input
                            {...field}
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className={`w-full h-11 sm:h-12 text-sm sm:text-base ${errors.name && touched.name
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-gray-300 focus-visible:ring-orange-500"
                              }`}
                          />
                        )}
                      </Field>
                      {errors.name && touched.name && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2 w-full md:w-1/2">
                      <Label htmlFor="email" className="text-sm font-semibold ">
                        Email Address
                      </Label>
                      <Field name="email">
                        {({ field }: FieldProps) => (
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className={`w-full h-11 sm:h-12 text-sm sm:text-base ${errors.email && touched.email
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-gray-300 focus-visible:ring-orange-500"
                              }`}
                          />
                        )}
                      </Field>
                      {errors.email && touched.email && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 md:flex-row flex-col">
                    {/* Phone Field */}
                    <div className="space-y-2 w-full md:w-1/2">
                      <Label htmlFor="phone" className="text-sm font-semibold ">
                        Phone Number
                      </Label>
                      <Field name="phone">
                        {({ field }: FieldProps) => (
                          <Input
                            {...field}
                            id="phone"
                            type="tel"
                            placeholder="01787536655"
                            className={`w-full h-11 sm:h-12 text-sm sm:text-base ${errors.phone && touched.phone
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-gray-300 focus-visible:ring-orange-500"
                              }`}
                          />
                        )}
                      </Field>
                      {errors.phone && touched.phone && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2 w-full md:w-1/2">
                      <Label htmlFor="password" className="text-sm font-semibold ">
                        Password
                      </Label>
                      <Field name="password">
                        {({ field }: FieldProps) => (
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Create a strong password"
                            className={`w-full h-11 sm:h-12 text-sm 
                              sm:text-base ${errors.password && touched.password
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-gray-300 focus-visible:ring-orange-500"
                              }`}
                          />
                        )}
                      </Field>
                      {errors.password && touched.password && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          {errors.password}
                        </p>
                      )}

                    </div>
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-semibold ">
                      I want to join as
                    </Label>
                    <Field name="role">
                      {({ field }: FieldProps) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            setFieldValue("role", value);
                            // setSelectedRole(value);
                          }}
                        >
                          <SelectTrigger
                            className={`w-full h-16 p-4 sm:h-16 text-sm 
                              sm:text-base ${errors.role && touched.role
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-orange-500"
                              }`}
                          >
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent className="bg-amber-100">
                            <SelectItem value={UserRole.user}>
                              User
                            </SelectItem>
                            <SelectItem value={UserRole.provider}>
                              <div className="flex items-center gap-3 py-1">
                                Provider
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </Field>
                    {errors.role && touched.role && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        {errors.role}
                      </p>
                    )}
                  </div>
                </div>

                {/* Create Account Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white font-semibold h-12 sm:h-14 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>


               
              </Form>
            )}
          </Formik>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm sm:text-base ">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors underline underline-offset-4"
              >
                Sign in instead
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
