export type SpotifyTrack = {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: {
    id: string;
    name: string;
    images: Array<{ url: string }>;
  };
  duration_ms: number;
  popularity: number;
  preview_url: string | null;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  genres: string[];
  followers: { total: number };
  images: Array<{ url: string }>;
  popularity: number;
};

export type SpotifyAlbum = {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  images: Array<{ url: string }>;
  release_date: string;
  total_tracks: number;
};

export type SpotifyFeaturedPlaylists = {
  playlists: {
    items: Array<{
      id: string;
      name: string;
      description: string;
      images: Array<{ url: string }>;
      tracks: { total: number };
      external_urls: { spotify: string };
    }>;
  };
};

export type SpotifyPlaylistTracks = {
  id: string;
  name: string;
  preview_url: null | string;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
};
export interface SpotifySearchResults {
  albums: {
    items: TracksItems[];
    total: number;
  };
  artists: {
    items: ArtistsItems[];
    total: number;
  };
}
export interface ArtistsItems {
  followers: {
    total: number;
  };
  genres: string[];
  id: string;
  images: Image[];
  name: string;
}
export interface TracksItems {
  album_type: string;
  artists: Artist[];
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Artist {
  href: string;
  id: string;
  name: string;
}

export interface Image {
  width: number;
  height: number;
  url: string;
}
