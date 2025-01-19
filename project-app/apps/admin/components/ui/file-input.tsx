'use client';
import * as React from 'react';

import { cn } from '@/lib/utils'; // Assuming you're using a utility function like classnames
import { Input } from './input';

const FileInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { onChange: (file: File | null) => void }
>(({ className, onChange, ...props }, ref) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onChange(file);
  };

  return (
    <div>
      <Input
        type='file'
        accept='image/*'
        {...props}
        className={cn('border p-2 rounded', className)}
        onChange={handleFileChange}
        ref={ref}
      />
    </div>
  );
});

FileInput.displayName = 'FileInput';

export { FileInput };
