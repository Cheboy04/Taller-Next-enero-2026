import { MovieCardSkeleton } from '@/components/dashboard/movie-card';

export default function Loading() {
  return (
    <main className="bg-linear-to-b from-slate-900 to-slate-600">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 block h-10 w-full animate-pulse rounded-full bg-linear-to-br from-slate-200 via-slate-100 to-slate-300" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 16 }, (_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
