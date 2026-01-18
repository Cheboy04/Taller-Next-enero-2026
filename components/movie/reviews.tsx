import { createClient } from '@/lib/supabase/server';
import { getReviewsForMovie } from '@/services/reviews';
import { ReviewForm } from './review-form';

type ReviewsProps = {
  movieId: number;
};

export const Reviews = async ({ movieId }: ReviewsProps) => {
  const supabase = await createClient();

  const [
    {
      data: { user },
    },
    reviews,
  ] = await Promise.all([supabase.auth.getUser(), getReviewsForMovie(movieId)]);

  return (
    <section className="container mx-auto mt-2 space-y-4 px-4 pb-12 md:px-6 md:pb-20">
      <h2 className="mb-2 font-serif text-sm font-bold tracking-[0.18em] text-slate-500 uppercase">
        Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-slate-500">No reviews yet. Be the first to review this movie.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <article
              key={review.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">
                  {review.author ?? 'Anonymous user'}
                </span>
                <span>
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {review.rating != null && (
                <p className="mb-1 text-xs text-amber-600">
                  Rating: <span className="font-semibold">{review.rating} / 5</span>
                </p>
              )}

              <p className="text-sm leading-relaxed text-slate-700">{review.comment}</p>
            </article>
          ))}
        </div>
      )}

      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
        {!!user ? (
          <ReviewForm movieId={movieId} />
        ) : (
          <p className="text-sm text-slate-600">
            Log in to leave a review. Everyone can read reviews, but only logged-in users can write
            them.
          </p>
        )}
      </div>
    </section>
  );
};

export const ReviewsSkeleton = () => {
  return (
    <section className="container mx-auto mt-2 space-y-4 px-4 pb-12 md:px-6 md:pb-20">
      <h2 className="mb-2 font-serif text-sm font-bold tracking-[0.18em] text-slate-500 uppercase">
        Reviews
      </h2>
      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
        <div className="h-10 w-full animate-pulse rounded-md bg-slate-200" />
      </div>
    </section>
  );
};
