import { MovieCard } from '@/components/dashboard/movie-card';

export default async function Home(props: {
  searchParams?: Promise<{ page?: string; q?: string }>;
}) {
  const movies = [
    {
      id: 1,
      title: 'Zootopia 2',
      release_date: '2025-11-27',
      runtime_minutes: 108,
      poster_url: '/poster.jpg',
    },
  ];

  return (
    <div className="bg-linear-to-b from-slate-900 to-slate-600">
      <div className="container mx-auto px-4 py-6 font-sans md:px-6 md:py-8">
        {/* <Search placeholder="Search for a movie" className="mb-6" /> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {movies.map(movie => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
        {/* <Pagination /> */}
      </div>
    </div>
  );
}
