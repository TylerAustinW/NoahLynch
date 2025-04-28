import { getArtistAlbums } from '@/lib/spotify/api';

export async function SpotifyAlbumsData() {
  try {
    // Get environment variables directly here
    const artistId = process.env.NEXT_PUBLIC_SPOTIFY_ARTIST_ID;
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

    // Debug log
    console.log('Environment check:', {
      hasArtistId: !!artistId,
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
    });

    // Check if environment variables are available
    if (!artistId || !clientId || !clientSecret) {
      console.error('Missing required Spotify API credentials in environment variables');
      return JSON.stringify({
        items: [],
        total: 0,
        error: 'API credentials not found',
      });
    }

    // Pass credentials explicitly to the function
    const albumsData = await getArtistAlbums(artistId);

    return JSON.stringify({
      items: albumsData.items,
      total: albumsData.total,
    });
  } catch (error) {
    console.error('Error in SpotifyAlbumsData:', error);
    return JSON.stringify({
      items: [],
      total: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
