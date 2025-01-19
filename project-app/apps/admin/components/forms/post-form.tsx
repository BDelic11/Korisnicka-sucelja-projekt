'use client';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Controller } from 'react-hook-form';

// schemas
import { postSchema } from '@repo/db/schemas/post-data';

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
import { FileInput } from '@/components/ui/file-input'; // A custom component to handle file input (if needed)
import Link from 'next/link';
import { createPostData } from '@/actions/posts';
import FormError from '../ui/form-error';
import { MultiSelect } from '../ui/multi-select';
import { Tag } from '@repo/db/types';
import { Checkbox } from '../ui/checkbox';

export function AddPostForm({ allTags }: { allTags: Tag[] }) {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      tagIds: [],
      image: undefined,
      title: '',
    },
  });

  async function handlePost(values: z.infer<typeof postSchema>) {
    setIsLoading(true);
    setError('');

    const formData = new FormData();
    values.title && formData.append('title', values.title);
    if (values.tagIds && values.tagIds.length > 0) {
      formData.append('tagIds', JSON.stringify(values.tagIds)); // Serialize the tagIds array
    }
    // values.tagIds && formData.append('tagIds', values.tagIds);
    values.image && formData.append('image', values.image);

    await createPostData(formData);

    // const response = await createPostData(formData);
    // if (response.error) {
    //   setError(response.error);
    // } else if (response.success) {
    //   toast({
    //     title: `${response.success}`,
    //     description: `Successfully added the post!`,
    //   });
    //   // Redirect or reset form here if necessary
    // }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePost)}
        className='space-y-4 flex flex-col md:w-1/3'
      >
        {/* Title Input */}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Post title' {...field} />
              </FormControl>
              <FormDescription>Enter a title for your post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name='image'
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Profile picture</FormLabel>
              <FormControl>
                <Input
                  className='bg-neutral-900'
                  type='file'
                  {...fieldProps}
                  accept='image/png, image/jpeg, image/jpg'
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Image Input */}
        {/* <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileInput
                  {...field}
                  accept='image/*'
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    field.onChange(file); // Update form state
                  }}
                />
              </FormControl>
              <FormDescription>Upload an image for your post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Tag IDs Input */}
        {/* <FormField
          control={form.control}
          name='tagIds'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter comma-separated tag IDs'
                  onChange={(e) => {
                    const value = e.target.value
                      .split(',')
                      .map((tag) => parseInt(tag.trim(), 10))
                      .filter((tagId) => !isNaN(tagId)); // Filter out invalid tag IDs
                    field.onChange(value); // Update form state with array of tagIds
                  }}
                  value={field.value.join(', ')} // Format tag IDs as comma-separated string
                />
              </FormControl>
              <FormDescription>Enter comma-separated tag IDs.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {error && <FormError message={error} />}

        {/* Submit Button */}
        <Button
          size='default'
          className='mt-10 w-full'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className='animate-spin' />
              <p>Adding Post...</p>
            </>
          ) : (
            'Add Post'
          )}
        </Button>

        <Link href='/posts'>
          <p className='flex justify-center my-4 leading-7 text-gray-600 cursor-pointer'>
            Go back to posts list
          </p>
        </Link>
      </form>
    </Form>
  );
}
