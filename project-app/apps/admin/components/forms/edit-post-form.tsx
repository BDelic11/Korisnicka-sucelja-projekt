'use client';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

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
import { PostForEditDto, Tag } from '@repo/db/types';
import { editPostSchema } from '@repo/db/schemas/post-data';
import { editPostData } from '@/actions/posts';

interface EditPostFormProps {
  post: PostForEditDto;
  allTags: Tag[];
  setIsModalOpen: (isOpen: boolean) => void;
}

export function EditPostForm({
  post,
  allTags,
  setIsModalOpen,
}: EditPostFormProps) {
  if (!post || !allTags) {
    return;
  }
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof editPostSchema>>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      id: post.id,
      title: post.title,
      tagIds: post.tagIds,
    },
  });

  async function handleChangePostData(
    formData: z.infer<typeof editPostSchema>
  ) {
    setIsLoading(true);
    setError('');

    const response = await editPostData(formData);
    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      toast({
        title: `${response.success}`,
        description: `Successfully changed data!`,
      });
      setIsModalOpen(false);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleChangePostData)}
        className='space-y-4 flex flex-col w-full'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type='text' {...field} />
              </FormControl>
              <FormDescription>
                Enter a title you would like to switch to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel
          className={`${
            form.formState.errors.tagIds ? 'text-red-500' : 'text-black'
          }`}
        >
          Tags
        </FormLabel>
        {allTags.map((item) => (
          <FormField
            key={item.id}
            control={form.control}
            name='tagIds'
            render={({ field }) => {
              const handleTagChange = (checked: boolean) => {
                const updatedTagIds = checked
                  ? [...field.value, item.id]
                  : field.value.filter((id) => id !== item.id);

                field.onChange(updatedTagIds);
              };

              return (
                <FormItem
                  key={item.id}
                  className='flex flex-row items-start space-x-3 space-y-0'
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={handleTagChange} // Pass the controlled function
                    />
                  </FormControl>
                  <FormLabel className='text-sm font-normal text-black'>
                    {item.name}
                  </FormLabel>
                </FormItem>
              );
            }}
          />
        ))}

        {form.formState.errors.tagIds && (
          <p className='text-red-500 text-[0.8rem] font-medium text-destructive'>
            {form.formState.errors.tagIds.message}
          </p>
        )}

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
            'Change post data'
          )}
        </Button>
      </form>
    </Form>
  );
}
