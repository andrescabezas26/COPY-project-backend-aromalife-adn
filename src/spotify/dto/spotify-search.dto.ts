export class SpotifySearchDto {
  query: string;
}

export class SpotifyTrackDto {
  id: string;
  name: string;
  artists: string[];
  preview_url: string | null;
  image: string | null;
  external_url: string;
}

export class SpotifySearchResponseDto {
  tracks: SpotifyTrackDto[];
}
