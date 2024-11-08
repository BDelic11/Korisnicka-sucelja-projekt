"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// schema
import { registerSchema } from "@repo/db/schemas/register";

// api
// import { useCreateUser } from "@/api/users/useCreateUser";

// components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  //   const { isLoading } = useCreateUser();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Function to handle the first step validation and move to the second step
  async function handleNextStep() {
    // Validate only the first-step fields
    const isStepOneValid = await form.trigger(["name", "surname", "email"]);

    if (isStepOneValid) {
      setCurrentStep(2); // Proceed to the second step if the first step is valid
    }
  }
  //   const createUser = useCreateUser();

  // Function to handle form submission
  async function handleRegister(formData: z.infer<typeof registerSchema>) {
    const response = await register(formData);
    if (response.success) {
      toast({
        title: `${response}`,
        description: `Welcome, ${formData.name}!`,
      });

      router.push("/");
    } else
      toast({
        title: `${response.error}`,
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="space-y-4 md:w-1/3"
      >
        {currentStep === 1 && (
          <>
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Surname field */}
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Your surname" {...field} />
                  </FormControl>
                  <FormDescription>Enter your surname.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Continue button for first part */}
            <Button
              size="default"
              className="mt-10 w-full bg-stylist-blue"
              type="button"
              onClick={handleNextStep}
            >
              Continue
            </Button>
          </>
        )}

        {currentStep === 2 && (
          <>
            {/* Password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a strong password (at least 8 characters, including
                    upper, lower, number, and special character).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>Re-enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button for second part */}
            <Button size="default" className="mt-10 w-full " type="submit">
              Register
            </Button>
          </>
        )}

        {/* Link to login page */}
        {currentStep === 1 && (
          <Link href="/login" className="h-min">
            <p className="flex justify-center my-4 leading-7 text-gray-600 cursor-pointer">
              Already have an account?
            </p>
          </Link>
        )}
      </form>
    </Form>
  );
}
