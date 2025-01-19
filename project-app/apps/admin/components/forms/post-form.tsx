'use client';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import { postSchema } from '@repo/db/schemas/post-data';

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
import { createPostData } from '@/actions/posts';
import FormError from '../ui/form-error';
import { Tag } from '@repo/db/types';
import { Checkbox } from '../ui/checkbox';
import { toast } from '@/hooks/use-toast';

export function AddPostForm({ allTags }: { allTags: Tag[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      tagIds: [],
      image: undefined,
      title: '',
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'The file size should not exceed 5MB.',
      });
      return;
    }
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Only PNG, JPEG, and JPG images are allowed.',
      });
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    form.setValue('image', file);
  };

  async function handlePost(values: z.infer<typeof postSchema>) {
    setIsLoading(true);

    const formData = new FormData();
    if (values.title) formData.append('title', values.title);
    if (values.tagIds?.length)
      formData.append('tagIds', JSON.stringify(values.tagIds));
    if (values.image) formData.append('image', values.image);

    const response = await createPostData(formData);
    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      toast({
        title: `${response.success}`,
        description: `Successfully added the post!`,
      });
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePost)}
        className='space-y-4 flex flex-col w-full px-4'
      >
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

        <FormField
          control={form.control}
          name='image'
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  {...fieldProps}
                  accept='image/png, image/jpeg, image/jpg'
                  onChange={handleImageChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {previewUrl && (
          <div className='mt-4'>
            <img
              src={previewUrl}
              alt='Image Preview'
              className='rounded-lg w-full h-auto object-cover'
            />
          </div>
        )}

        {error && <FormError message={error} />}

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
      </form>
    </Form>
  );
}
