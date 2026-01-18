import { createClient } from '@/lib/supabase/server';

export type MovieReview = {
  id: number;
  movieId: number;
  userId: string;
  author: string | null;
  rating: number | null;
  comment: string;
  createdAt: string;
};

export async function getReviewsForMovie(movieId: number): Promise<MovieReview[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('review')
    .select('id, movie_id, user_id, comment, rating, created_at, author')
    .eq('movie_id', movieId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews for movie', error);
    return [];
  }

  if (!data) return [];
  
  return (data as any[]).map(row => ({
    id: Number(row.id),
    movieId: Number(row.movie_id),
    userId: String(row.user_id),
    author: (row.author as string | null) ?? null,
    rating: row.rating != null ? Number(row.rating) : null,
    comment: String(row.comment ?? ''),
    createdAt: String(row.created_at),
  }));
}

