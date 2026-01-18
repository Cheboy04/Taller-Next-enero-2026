import { getMovieActors } from '@/services/movies';
import { PersonCard } from './person-card';

interface ActorsProps {
  movieId: number;
}

export const Actors: React.FC<ActorsProps> = async ({ movieId }) => {
  // TODO: Remove this after testing
  await new Promise(resolve => setTimeout(resolve, 1000));

  const actors = await getMovieActors(movieId);

  return (
    <section className="container mx-auto mt-2 space-y-4 px-4 py-8 md:px-6 md:py-16">
      <h2 className="mb-2 font-serif text-sm font-bold tracking-[0.18em] text-slate-500 uppercase">
        Cast
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {actors.map(credit => (
          <PersonCard
            key={credit.personId}
            personId={credit.personId}
            name={credit.name}
            pictureUrl={credit.pictureUrl}
            characterName={credit.characterName}
          />
        ))}
      </div>
    </section>
  );
};

export const ActorsSkeleton = () => {
  return (
    <section className="container mx-auto mt-2 space-y-4 px-4 py-8 md:px-6 md:py-16">
      <h2 className="mb-2 font-serif text-sm font-bold tracking-[0.18em] text-slate-500 uppercase">
        Cast
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-sm shadow-sm"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-200 md:h-24 md:w-24">
              <div className="h-full w-full animate-pulse bg-linear-to-br from-slate-200 via-slate-100 to-slate-300" />
            </div>

            <div className="flex flex-1 flex-col items-start gap-2">
              <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-300" />
              <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
