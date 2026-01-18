import Image from 'next/image';
import Link from 'next/link';

type MovieCardProps = {
  id: number;
  title: string;
  poster_url: string | null;
  release_date: string | null;
};

export const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster_url, release_date }) => {
  return (
    <Link
      href={`/movie/${id}`}
      className="group flex flex-col overflow-hidden rounded-sm transition hover:shadow-lg hover:shadow-black/50"
    >
      <div className="relative w-full overflow-hidden bg-slate-950">
        <div className="aspect-2/3 w-full">
          <Image
            src={'/poster.jpg'}
            alt={title}
            fill
            sizes="(min-width: 1024px) 220px, (min-width: 768px) 200px, 160px"
            className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 bg-slate-100 px-4 py-4 backdrop-blur-md">
        <div className="flex items-start justify-between gap-2">
          <h2 className="line-clamp-2 font-sans text-sm font-semibold tracking-tight text-slate-800 md:text-base">
            {title} {release_date && `(${release_date.slice(0, 4)})`}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-sm bg-slate-100 shadow-sm shadow-slate-200">
      <div className="relative w-full overflow-hidden">
        <div className="aspect-2/3 w-full">
          <div className="h-full w-full animate-pulse bg-linear-to-br from-slate-200 via-slate-100 to-slate-300" />
        </div>
      </div>

      <div className="space-y-2 bg-slate-100 px-4 py-3">
        <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-300" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-200" />
      </div>
    </div>
  );
};
