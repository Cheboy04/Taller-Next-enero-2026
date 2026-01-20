import { MovieCard } from '@/components/dashboard/movie-card';
import { Pagination } from '@/components/dashboard/pagination';
import { Search } from '@/components/dashboard/search';
import { getMovies, getMoviesCount } from '@/services/movies';
export default async function Home(props: {
 searchParams?: Promise<{ page?: string; q?: string }>;
}) {
 const searchParams = await props.searchParams;
 const page = Number(searchParams?.page) || 1;
 const keyphrase = searchParams?.q || '';
 const itemsPerPage = 12;
 
const [movies, totalMoviesCount] = await Promise.all([
   getMovies({ page, itemsPerPage, keyphrase }),
   getMoviesCount({ keyphrase }),
 ]);


  return (
 <main className="bg-linear-to-b from-slate-900 to-slate-600">
 <div className="container mx-auto px-4 py-6 font-sans md:px-6 md:py-8">
 <Search placeholder="Search for a movie" className="mb-6" />
 <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
 {movies.map(movie => (
 <MovieCard key={movie.id} {...movie} />
 ))}
 </div>
 <Pagination currentPage={page} totalPages={Math.ceil(totalMoviesCount /
itemsPerPage)} />
 </div>
 </main>
 );
}