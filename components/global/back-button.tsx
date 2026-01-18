'use client';

import { cn } from '@/lib/tailwind';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  label: string;
  style?: 'primary' | 'secondary';
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label,
  style = 'primary',
  className,
}: BackButtonProps) => {
  const router = useRouter();

  const classes = cn(
    'inline-flex cursor-pointer items-center gap-1 text-sm font-semibold transition-colors',
    {
      'text-slate-800 hover:text-slate-900 hover:underline': style === 'primary',
      'text-slate-100 hover:text-slate-200 hover:underline': style === 'secondary',
    },
    className
  );

  return (
    <button type="button" onClick={() => router.back()} className={classes}>
      <ArrowLeftIcon className="size-4" />
      {label}
    </button>
  );
};
