'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// schema
import { registerSchema } from '@repo/db/schemas/register';

// api
// import { useCreateUser } from "@/api/users/useCreateUser";

// components
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '@/actions/register';
import FormError from '../ui/form-error';
import { Textarea } from '../ui/textarea';

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      salonDescription: '',
      salonLocationUrl: '',
      salonName: '',
      salonPhoneNumber: '',
    },
  });

  async function handleFirstNextStep() {
    const isStepOneValid = await form.trigger(['name', 'surname', 'email']);

    if (isStepOneValid) setCurrentStep(2);
  }

  async function handleSecondNextStep() {
    const isStepTwoValid = await form.trigger(['password', 'confirmPassword']);

    if (isStepTwoValid) setCurrentStep(3);
  }

  async function handleRegister(formData: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    const response = await register(formData);

    if (response.success) {
      toast({
        title: `${response.success}`,
        description: `Welcome, ${formData.name}!`,
      });

      router.push('/');
    } else if (response.error) {
      setError(response.error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className='space-y-4 md:w-1/3'
      >
        {currentStep === 1 && (
          <>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Your name' {...field} />
                  </FormControl>
                  <FormDescription>Enter your name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='surname'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder='Your surname' {...field} />
                  </FormControl>
                  <FormDescription>Enter your surname.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='you@example.com' {...field} />
                  </FormControl>
                  <FormDescription>Enter your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size='default'
              className='mt-10 w-full bg-stylist-blue'
              type='button'
              onClick={handleFirstNextStep}
            >
              Continue
            </Button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='••••••••' {...field} />
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
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='••••••••' {...field} />
                  </FormControl>
                  <FormDescription>Re-enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size='default'
              className='mt-10 w-full bg-stylist-blue'
              type='button'
              onClick={handleSecondNextStep}
            >
              Continue to salon info
            </Button>
          </>
        )}

        {currentStep === 3 && (
          <>
            <FormField
              control={form.control}
              name='salonName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salon name</FormLabel>
                  <FormControl>
                    <Input placeholder='Salon name' {...field} />
                  </FormControl>
                  <FormDescription>Enter your salon name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='salonPhoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salon phone number</FormLabel>
                  <FormControl>
                    <Input
                      type='tel'
                      placeholder='Salon phone number'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your salon phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='salonLocationUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salon location URL</FormLabel>
                  <FormControl>
                    <Input placeholder='Salon location URL' {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your salon location URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='salonDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salon description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Salon description' {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your salon description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <FormError message={error} />}

            <Button
              size='default'
              className='mt-10 w-full '
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Register'}
            </Button>
          </>
        )}

        {currentStep === 1 && (
          <Link href='/login' className='h-min'>
            <p className='flex justify-center my-4 leading-7 text-gray-600 cursor-pointer'>
              Already have an account?
            </p>
          </Link>
        )}
      </form>
    </Form>
  );
}
