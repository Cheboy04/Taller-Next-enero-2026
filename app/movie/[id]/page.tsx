import Image from 'next/image';
import { notFound } from 'next/navigation';

import { BackButton } from '@/components/global/back-button';
import Link from '@/components/global/link';
import { CATEGORY_LABELS } from '@/lib/consts';
import { MovieCredit } from '@/lib/helpers';
import { createClient } from '@/lib/supabase/server';
import { getMovieById, getMovieCredits, getMovieGenres } from '@/services/movies';
import { Actors, ActorsSkeleton } from '@/components/movie/actors';
import { Suspense } from 'react';


type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const numericId = Number(id);

  const supabase = await createClient();

  const [movie, genres, credits] = await Promise.all([
    getMovieById(numericId),
    getMovieGenres(numericId),
    getMovieCredits(numericId),
  ]);

  if (!movie) {
    notFound();
  }

  const formattedReleaseDate =
    movie.release_date &&
    new Date(movie.release_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const creditsByCategory = credits.reduce<Record<string, MovieCredit[]>>((acc, credit) => {
    const normalizedCategory = credit.category === 'actress' ? 'actor' : credit.category;

    if (!acc[normalizedCategory]) {
      acc[normalizedCategory] = [];
    }

    acc[normalizedCategory].push(credit);
    return acc;
  }, {});

  const castCredits = creditsByCategory.actor ?? [];
  const crewEntries = Object.entries(creditsByCategory).filter(
    ([category]) => category !== 'actor'
  );

  return (
    <main>
      <section className="bg-linear-to-b from-slate-900 to-slate-700">
        <div className="container mx-auto flex flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
          <BackButton label="Back to movies" style="secondary" />
          <div className="flex flex-col gap-8 md:flex-row md:gap-10">
            <div className="relative w-full overflow-hidden rounded-xl bg-slate-50 shadow-sm md:max-w-xs">
              <div className="aspect-2/3 w-full">
                <Image
                  src={movie.poster_url || '/images/placeholder-movie.png'}
                  alt={movie.title}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 260px, 220px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-10 text-slate-100">
              <div className="space-y-2 font-sans">
                <h1 className="mb-10 font-serif text-5xl font-bold tracking-tight md:text-5xl">
                  {movie.title}
                </h1>

                {movie.runtime_minutes && (
                  <p className="text-sm">
                    <span className="font-bold">Duration:</span> {movie.runtime_minutes} min
                  </p>
                )}

                {formattedReleaseDate && (
                  <p className="text-sm">
                    <span className="font-bold">Release Date:</span> {formattedReleaseDate}
                  </p>
                )}

                {genres.length > 0 && (
                  <p className="text-sm">
                    <span className="font-bold">Genres:</span> {genres.join(' • ')}
                  </p>
                )}

                {crewEntries.map(([category, categoryCredits]) => (
                  <p key={category} className="text-sm">
                    <span className="font-bold">
                      {CATEGORY_LABELS[category] ?? category.replace(/_/g, ' ')}:
                    </span>{' '}
                    {categoryCredits.map((credit, index) => (
                      <span key={credit.personId}>
                        {index > 0 && ', '}
                        <Link
                          href={`/person/${credit.personId}`}
                          label={credit.name}
                          style="secondary"
                        />
                      </span>
                    ))}
                  </p>
                ))}
              </div>

              {movie.plot && (
                <section className="font-sans">
                  <h2 className="mb-2 font-serif text-sm font-bold tracking-[0.18em] uppercase">
                    Plot
                  </h2>
                  <p className="text-sm leading-relaxed md:text-base">{movie.plot}</p>
                </section>
              )}
            </div>
          </div>
        </div>
        <Suspense fallback={<ActorsSkeleton/>}>
            <Actors movieId={numericId} />
        </Suspense>
      </section>
    </main>
  );
}