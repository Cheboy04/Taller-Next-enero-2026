import { createClient } from '@/lib/supabase/server';
import { formatCredits, type MovieCredit } from '@/lib/helpers';
import { Tables } from '@/types/database';

export async function getMovies({ page, itemsPerPage, keyphrase }: {keyphrase?: string,
    page: number;
    itemsPerPage: number;
} ): Promise<Tables<'movie'>[] > {
 const supabase = await createClient()
 let query = supabase.from('movie').select('*').range(
   (page - 1) * itemsPerPage,
   page * itemsPerPage - 1
 ).order('release_date', { ascending: false });
 if (keyphrase) {
   query = query.ilike('title', `%${keyphrase}%`);
 }
 const { data, error } = await query;
 if (error) throw error
 return data
}

export async function getMoviesCount({ keyphrase }: { keyphrase?: string }): Promise<number> {
 const supabase = await createClient()
 let query = supabase.from('movie').select('*', { count: 'exact', head: true });
 if (keyphrase) {
   query = query.ilike('title', `%${keyphrase}%`);
 }
 const { count, error } = await query;
 if (error) throw error
 return count || 0
}

// re interesante export async function getAllPromises(){Promise.allSettled([getMovies, getMoviesCount])}

export async function getMovieById(id: number): Promise<Tables<'movie'>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('movie').select('*').eq('id', id).single();

  if (error) {
    console.error('Error fetching movie by id', error);
  }

  return data;
}

export async function getMovieGenres(id: number): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('movie_genre')
    .select('genre:genre_id ( name )')
    .eq('movie_id', id);

  if (error) {
    console.error('Error fetching genres for movie', error);
    return [];
  }

  return (
    data
      // @ts-expect-error: nested select returns untyped payload from Supabase client
      ?.map(row => row.genre?.name as string | undefined)
      .filter((name): name is string => Boolean(name)) ?? []
  );
}

export async function getMovieCredits(id: number): Promise<MovieCredit[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('credit')
    .select('category, person:person_id ( id, primary_name, picture_url )')
    .notIn('category', ['actor', 'actress'])
    .eq('movie_id', id);

  if (error) {
    console.error('Error fetching credits for movie', error);
    return [];
  }

  return formatCredits(data);
}

export async function getMovieActors(id: number): Promise<MovieCredit[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('credit')
    .select('category, character_name, person:person_id ( id, primary_name, picture_url )')
    .eq('movie_id', id)
    .in('category', ['actor', 'actress']);

  if (error) {
    console.error('Error fetching credits for movie', error);
    return [];
  }

  return formatCredits(data);
}