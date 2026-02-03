/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginLeft from '@public/login.jpg'
import Image from "next/image";
import { MdOutlineFoodBank } from "react-icons/md";
import Link from "next/link";
import { IoLogoGoogle } from "react-icons/io";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getLocalUserData, setLocalUserData } from "@/libs/localStorage";
import { UserRole } from "@/libs/constants";
import { useRouter } from "next/navigation";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {

  const router = useRouter();
  const user = getLocalUserData();
  useEffect(() => {
    if (user) {
      const userRole = user.role;

      if (userRole === UserRole.user) {
        router.push("/menu");
      } else if (userRole === UserRole.provider) {
        router.push("/provider/dashboard");
      } else if (userRole === UserRole.admin) {
        router.push("/admin/dashboard");
      }
    }
  }, [user, router]);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {

    const { data, error } = await authClient.signIn.email(values);

    if (data) {
      toast.success("Login Successful!");
      setLocalUserData({
        ...data.user,
        createdAt: data.user.createdAt instanceof Date ? data.user.createdAt.toISOString() : data.user.createdAt,

      });
      const userRole = (data.user as any).role;
      if (userRole === UserRole.user) {
        router.push("/menu");
      } else if (userRole === UserRole.provider) {
        router.push("/provider/dashboard");
      } else if (userRole === UserRole.admin) {
        router.push("/admin/dashboard");
      }
    } else {
      toast.error(error?.message || "Login failed!");
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

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-primary2 text-white">
        <div className="w-full max-w-md space-y-7">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-secondary">
              Welcome back to FoodHub
            </h2>
            <p className="text-gray-300">
              Access your dashboard and manage your orders with ease.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(loginSchema)}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium ">
                      Email address
                    </Label>
                    <Field name="email">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className={`w-full ${errors.email && touched.email
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                            }`}
                        />
                      )}
                    </Field>
                    {errors.email && touched.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium ">
                        Password
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Field name="password">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className={`w-full ${errors.password && touched.password
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                            }`}
                        />
                      )}
                    </Field>
                    {errors.password && touched.password && (
                      <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>

              </Form>
            )}
          </Formik>

          {/* Sign Up Link */}
          <p className="text-center text-sm ">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
            >
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
