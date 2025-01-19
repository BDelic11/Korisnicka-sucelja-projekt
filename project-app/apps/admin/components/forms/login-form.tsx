'use client';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { loginSchema as formSchema } from '@repo/db/schemas/login';
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
import { login } from '@/actions/login';
import FormError from '../ui/form-error';

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleLogin(formData: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const response = await login(formData);

    if (response.success) {
      toast({
        title: `${response.success}`,
        description: `Welcome, ${formData.email}!`,
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
        onSubmit={form.handleSubmit(handleLogin)}
        className='space-y-4 flex flex-col md:w-1/3'
      >
        <h1 className='md:h-full text-left md:my-6 scroll-m-20 text-4xl font-extrabold tracking-tight  lg:text-5xl'>
          Login Form
        </h1>

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

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='••••••••'
                  {...field}
                  onChange={(e) => {
                    field.onChange(e); // Important to preserve hook form's state
                    setError(''); // Clear error on change
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter a strong password (at least 8 characters, including upper,
                lower, number, and special character).
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
          {isLoading ? (
            <>
              <Loader2 className='animate-spin' />
              <p>Logging in</p>
            </>
          ) : (
            'Log in'
          )}
        </Button>
        <Link href='/register'>
          <p className='flex justify-center my-4 leading-7 text-gray-600 cursor-pointer'>
            Don&rsquo;t have an account?
          </p>
        </Link>
      </form>
    </Form>
  );
}
