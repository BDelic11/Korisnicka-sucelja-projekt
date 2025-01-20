'use client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { deletePostSchema } from '@repo/db/schemas/delete-post-data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormError from '../ui/form-error';
import { deletePost } from '@/actions/posts';

interface DeletePostFormProps {
  id: number;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function DeletePostForm({ id, setIsModalOpen }: DeletePostFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof deletePostSchema>>({
    resolver: zodResolver(deletePostSchema),
    defaultValues: {
      id: id,
    },
  });

  async function handleDeletePost(formData: z.infer<typeof deletePostSchema>) {
    setIsLoading(true);
    setError('');

    const response = await deletePost(formData);

    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      toast({
        title: `${response.success}`,
        description: `Successfully deleted data!`,
      });
      setIsModalOpen(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleDeletePost)}
        className='flex flex-col w-full justify-center'
      >
        <Button
          size='default'
          className='mt-4 w-full'
          type='submit'
          variant='destructive'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className='animate-spin' />
              <p>Deleting...</p>
            </>
          ) : (
            'Delete Post'
          )}
        </Button>

        {error && <FormError message={error} />}
      </form>
    </Form>
  );
}
