"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

//schemas
import { loginSchema as formSchema } from "@repo/db/schemas/login";

//components
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
import { LoginButton } from "../ui/loginButton";

export async function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function login(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(login)}
        className="space-y-4 flex flex-col md:w-1/3"
      >
        <h1 className="md:h-full text-left md:my-6 scroll-m-20 text-4xl font-extrabold tracking-tight  lg:text-5xl">
          Login Form
        </h1>

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
                Enter a strong password (at least 8 characters, including upper,
                lower, number, and special character).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoginButton />
        <Link href="/register">
          <p className="flex justify-center my-4 leading-7 text-gray-600 cursor-pointer">
            Don&rsquo;t have an account?
          </p>
        </Link>
      </form>
    </Form>
  );
}
