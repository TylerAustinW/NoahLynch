'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { SUPABASE_TABLES } from '@/lib/config/constants';
import type { Show } from '@/lib/types/checkin';

interface ShowSelectorProps {
  selectedShowId?: string;
  onShowSelect: (showId: string) => void;
  className?: string;
}

export default ({ selectedShowId, onShowSelect, className = '' }: ShowSelectorProps) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShows() {
      try {
        const { data, error } = await supabase.from(SUPABASE_TABLES.SHOWS).select('*');

        if (error) {
          setError('Failed to load shows');
          console.error('Error fetching shows:', error);
          return;
        }

        const sortedShows = (data || []).sort((a, b) => {
          const dateA = new Date(a.date + 'T00:00:00'); // Force local timezone
          const dateB = new Date(b.date + 'T00:00:00');
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const isUpcomingA = dateA >= today;
          const isUpcomingB = dateB >= today;

          if (isUpcomingA === isUpcomingB) {
            return isUpcomingA
              ? dateA.getTime() - dateB.getTime()
              : dateB.getTime() - dateA.getTime();
          }

          return isUpcomingA ? -1 : 1;
        });

        setShows(sortedShows);
      } catch (err) {
        setError('Failed to load shows');
        console.error('Error fetching shows:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchShows().then(() => false);
  }, []);

  const formatShowOption = (show: Show) => {
    const date = new Date(show.date + 'T00:00:00');
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return `${formattedDate} - ${show.venue}, ${show.city}, ${show.state}`;
  };

  if (loading) {
    return (
      <div className={`space-y-2 ${className}`}>
        <label htmlFor="show-selector" className="block text-sm font-medium text-white mb-2">
          Select Show *
        </label>
        <div className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white">
          Loading shows...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-2 ${className}`}>
        <label htmlFor="show-selector" className="block text-sm font-medium text-white mb-2">
          Select Show *
        </label>
        <div className="w-full px-4 py-3 bg-red-900/50 border border-red-600 rounded-lg text-red-300">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor="show-selector" className="block text-sm font-medium text-white mb-2">
        Select Show
      </label>
      <select
        id="show-selector"
        value={selectedShowId || ''}
        onChange={(e) => onShowSelect(e.target.value)}
        className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 [&>option]:bg-zinc-700 [&>option]:text-white"
        required
      >
        <option value="">Choose a show...</option>
        {shows.map((show) => (
          <option key={show.id} value={show.id}>
            {formatShowOption(show)}
          </option>
        ))}
      </select>
    </div>
  );
};
