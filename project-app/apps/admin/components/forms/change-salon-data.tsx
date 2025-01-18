'use client';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

//schemas
import { updateSalonSchema as formSchema } from '@repo/db/schemas/change-salon-data';

//components
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
import FormError from '../ui/form-error';
import { UpdateSalonDto } from '@repo/db/types';
import { changeSalonProfileData } from '@/actions/salons';
import { Textarea } from '../ui/textarea';

export function ProfileForm({ salon }: { salon: UpdateSalonDto }) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: salon.name,
      description: salon.description,
      locationUrl: salon.locationUrl,
      phoneNumber: salon.phoneNumber,
    },
  });

  async function handleChangeUserData(formData: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError('');

    const response = await changeSalonProfileData(formData);
    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      toast({
        title: `${response.success}`,
        description: `Successfully changed data!`,
      });
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleChangeUserData)}
        className='space-y-4 flex flex-col md:w-2/3'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormDescription>
                Enter a user name you would like to switch to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input type='tel' {...field} />
              </FormControl>
              <FormDescription>Enter another phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='locationUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>LocationURL</FormLabel>
              <FormControl>
                <Input type='url' {...field} />
              </FormControl>
              <FormDescription>Enter another location URL.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>Enter another description.</FormDescription>
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
              <p>Changing</p>
            </>
          ) : (
            'Change user data'
          )}
        </Button>
      </form>
    </Form>
  );
}
