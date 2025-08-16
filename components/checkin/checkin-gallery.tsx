/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { CheckInGalleryItem } from '@/lib/types/checkin';

export default function CheckInGallery() {
  const [checkins, setCheckins] = useState<CheckInGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCheckins() {
      try {
        const { data, error } = await supabase
          .from('checkin_gallery')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(12);

        if (error) {
          setError('Failed to load check-ins');
          console.error('Error fetching checkins:', error);
          return;
        }

        setCheckins(data || []);
      } catch (err) {
        setError('Failed to load check-ins');
        console.error('Error fetching checkins:', err);
      } finally {
        setLoading(false);
      }
    }

    void fetchCheckins();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-zinc-800 rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-square bg-zinc-700"></div>
            <div className="p-4">
              <div className="h-4 bg-zinc-700 rounded mb-2"></div>
              <div className="h-3 bg-zinc-700 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">{error}</p>
      </div>
    );
  }

  if (checkins.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400 text-lg">No check-ins yet.</p>
        <p className="text-zinc-500 text-sm mt-2">Be the first to share your show experience!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {checkins.map((checkin) => (
        <div
          key={checkin.checkin_id}
          className="bg-zinc-800/50 rounded-lg overflow-hidden backdrop-blur-sm hover:bg-zinc-800 transition-all duration-300 transform hover:scale-105"
        >
          <div className="aspect-square relative overflow-hidden">
            <img
              src={checkin.file_url}
              alt={`${checkin.name} at ${checkin.venue}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-white mb-1">{checkin.name}</h3>
            <p className="text-sm text-zinc-400 mb-2">
              {checkin.venue}, {checkin.city}, {checkin.state}
            </p>
            <p className="text-xs text-zinc-500">
              {new Date(checkin.show_date + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            {checkin.feedback && (
              <p className="text-sm text-zinc-300 mt-3 line-clamp-2">"{checkin.feedback}"</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
