import { SpotifyArtistAlbumsResponse, SpotifyTokenResponse } from './types';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function getAccessToken(
  forceRefresh: boolean = false
): Promise<string> {
  if (!forceRefresh && accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify API credentials in environment variables');
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to get Spotify access token: ${response.statusText}`);
    }

    const data = await response.json() as SpotifyTokenResponse;

    accessToken = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000 - 60000;

    return accessToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
}


export async function getArtistAlbums(
  artistId: string = '',
  limit: number = 50,
  offset: number = 0
): Promise<SpotifyArtistAlbumsResponse> {
  try {
    const finalArtistId = artistId || process.env.NEXT_PUBLIC_SPOTIFY_ARTIST_ID;

    if (!finalArtistId) {
      throw new Error('Artist ID is required but not provided');
    }

    let token: string;
    try {
      token = await getAccessToken(false);
    } catch (tokenError) {
      console.warn('Error getting token, trying with forced refresh:', tokenError);
      token = await getAccessToken(true);
    }

    const url = new URL(`https://api.spotify.com/v1/artists/${finalArtistId}/albums`);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());
    url.searchParams.append('include_groups', 'album,single');
    url.searchParams.append('market', 'US');


    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spotify API error response:', errorText);
      throw new Error(`Failed to fetch artist albums: ${response.statusText}`);
    }

    return await response.json() as SpotifyArtistAlbumsResponse;
  } catch (error) {
    console.error('Error fetching artist albums:', error);
    return {
      href: '',
      limit: 0,
      next: null,
      offset: 0,
      previous: null,
      total: 0,
      items: [],
    };
  }
}
