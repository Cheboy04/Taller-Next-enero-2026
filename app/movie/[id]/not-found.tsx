import Button from '@/components/global/button';
import { ArrowLeftIcon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center font-sans">
      <div className="mb-6 inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
        404 · Movie not found
      </div>
      <h1 className="mb-2 font-serif text-3xl font-semibold text-slate-900 md:text-4xl">
        We couldn&apos;t find that movie
      </h1>
      <p className="max-w-md text-sm text-slate-500 md:text-base">
        It may have been removed or the link is incorrect. Try searching again or browsing other
        titles.
      </p>
      <Button
        label="Return Home"
        style="secondary"
        href="/"
        icon={<ArrowLeftIcon className="size-4" />}
        className="mt-4"
      />
    </div>
  );
};

export default NotFound;