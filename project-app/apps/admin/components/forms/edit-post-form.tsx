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
}

export function EditPostForm({ post, allTags }: EditPostFormProps) {
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
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleChangePostData)}
        className='space-y-4 flex flex-col md:w-2/3'
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

        <FormItem>
          <div className='mb-4'>
            <FormLabel className='text-base'>Sidebar</FormLabel>
            <FormDescription>
              Select the items you want to display in the sidebar.
            </FormDescription>
          </div>
          {allTags.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name='tagIds'
              render={({ field }) => {
                const handleTagChange = (checked: boolean) => {
                  const updatedTagIds = checked
                    ? [...field.value, item.id] // Add the tag if checked
                    : field.value.filter((id) => id !== item.id); // Remove if unchecked

                  // Update the form field value with the new tag array
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
                    <FormLabel className='text-sm font-normal'>
                      {item.name}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>

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
