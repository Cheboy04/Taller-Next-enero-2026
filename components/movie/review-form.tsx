'use client';

import Button from '@/components/global/button';
import { useState } from 'react';

interface ReviewFormProps {
  movieId: number;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ movieId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
  }

  return (
    <form action={handleSubmit} className="space-y-3">
      <input type="hidden" name="movieId" value={movieId} />

      <div>
        <label
          htmlFor="rating"
          className="mb-1 block text-xs font-medium tracking-[0.16em] text-slate-500 uppercase"
        >
          Rating (optional)
        </label>
        <select
          id="rating"
          name="rating"
          className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none"
          defaultValue=""
        >
          <option value="">No rating</option>
          {[1, 2, 3, 4, 5].map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="author"
          className="mb-1 block text-xs font-medium tracking-[0.16em] text-slate-500 uppercase"
        >
          Your name (optional)
        </label>
        <input
          id="author"
          name="author"
          type="text"
          className="w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none"
          placeholder="Add your name"
        />
      </div>

      <div>
        <label
          htmlFor="comment"
          className="mb-1 block text-xs font-medium tracking-[0.16em] text-slate-500 uppercase"
        >
          Your review
        </label>
        <textarea
          id="comment"
          name="comment"
          className="min-h-[80px] w-full resize-y rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none"
          placeholder="What did you think about this movie?"
          required
        />
      </div>

      <div className="flex items-center justify-end">
        <Button
          type="submit"
          label={isSubmitting ? 'Submitting...' : 'Submit review'}
          style="primary"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};
