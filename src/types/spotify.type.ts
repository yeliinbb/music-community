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

export type SpotifyFeaturedPlaylist = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  trackLink: string;
  tracksCount: number;
};

export type SpotifyPlaylist = {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
};

export type SpotifyTrack = {
  id: string;
  name: string;
  preview_url: string | null;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    images: { url: string }[];
  };
};

export type SpotifyPlaylistTracks = {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
  tracks: SpotifyTrack[];
};

export type SpotifyAlbums = {
  items: TracksItems[];
  total: number;
}[];

export interface SpotifySearchResults {
  albums: SpotifyAlbums;
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
  album: Album;
  artists: Artist[];
  external_urls: {
    spotify: string;
  };
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
  duration_ms: number;
  popularity: number;
  preview_url: string;
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

export interface Album {
  images: Image[];
}

export interface RelatedArtist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string;
  total: number;
}
