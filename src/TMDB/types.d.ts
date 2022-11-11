export type ApiFn = Function;
export type ShowType = "movie" | "tv";
export type ObjectType =
  | "movie"
  | "episode"
  | "tv"
  | "season"
  | "person"
  | "company"
  | "network"
  | "video"
  | "image"
  | "cast"
  | null;
export type ObjectBase = {
  objectType?: ObjectType; // code

  // specific types to check
  isMovie?: boolean;
  isEpisode?: boolean;
  isTv?: boolean;
  isSeason?: boolean;
  isPerson?: boolean;
  isCompany?: boolean;
  isNetwork?: boolean;
  isVideo?: boolean;
  isImage?: boolean;
  isCast?: boolean;
};
export type Query = {
  [key: string]: string | number | null;
};
export type OptionsBag = {
  [key: string]: any;
};
export type ExternalSource =
  | "imdb_id"
  | "freebase_mid"
  | "freebase_id"
  | "tvdb_id"
  | "tvrage_id"
  | "facebook_id"
  | "twitter_id"
  | "instagram_id";

export type Genre = {
  id: number;
  name: string;
};
export type Company = ObjectBase & {
  id: number;
  name: string;
};
export type Country = {
  iso31661: string;
  name: string;
};
export type Language = {
  english_name: string;
  iso6391: string;
  name: string;
};
export type ImagePath = SoN;
export type ShowImage = ObjectBase & {
  aspectRatio?: number;
  filePath?: string;
  height?: number;
  iso6391?: SoN;
  voteAverage?: number;
  voteCount?: number;
  width?: number;
};
export type Credits = ObjectBase & {
  id?: number;
  cast?: CastCredit[];
  crew?: CrewCredit[];
};
export type CastCredit = ObjectBase & {
  castId?: number;
  character?: string;
  creditId?: string;
  gender?: NoN;
  id?: number;
  name?: string;
  order?: number;
  profilePath?: ImagePath;
};
export type CrewCredit = ObjectBase & {
  creditId?: string;
  department?: string;
  gender?: NoN;
  id?: number;
  job?: string;
  name?: string;
  profilePath?: ImagePath;
};
export type ShowImageCollection = ObjectBase & {
  id?: number;
  backdrops?: ShowImage[];
  posters?: ShowImage[];
  logos?: ShowImage[];
};
export type ShowImage = ObjectBase & {
  aspectRatio?: number;
  filePath?: string;
  height?: number;
  iso6391?: SoN;
  voteAverage?: number;
  voteCount?: number;
  width?: number;
};
export type MovieVideoCollection = ObjectBase & {
  id?: number;
  results?: MovieVideo[];
};
export type MovieVideo = ObjectBase & {
  id?: string;
  iso31661?: string;
  iso6391?: string;
  key?: string;
  name?: string;
  site?: string;
  size?: number;
  type?: string;
};
export type Person = ObjectBase & {
  adult?: boolean;
  alsoKnownAs?: string[];
  biography?: string;
  birthday?: SoN;
  deathday?: SoN;
  gender?: number;
  homepage?: SoN;
  id?: number;
  imdbId?: string;
  name?: string;
  placeOfBirth?: SoN;
  popularity?: number;
  profilePath?: ImagePath;
  knownFor: any;
};
export type Company = ObjectBase & {
  description?: string;
  headquarters?: string;
  homepage?: string;
  id?: number;
  logoPath?: string;
  name?: string;
  originCountry?: string;
  parentCompany?: null | Company;
};
export type Season = ObjectBase & {
  airDate?: string;
  episodeCount?: number;
  id?: number;
  name?: string;
  overview?: string;
  posterPath?: string;
  seasonNumber?: number;
};
export type Network = ObjectBase & {
  id?: number;
  name?: string;
  logoPath?: string;
  originCountry?: string;
};
export type Episode = ObjectBase & {
  airDate?: string;
  episodeNumber?: number;
  id?: number;
  name?: string;
  overview?: string;
  productionCode?: string;
  runtime?: number;
  seasonNumber?: number;
  showId?: number;
  stillPath?: string;
  voteAverage?: number;
  voteCount?: number;
};
export type ShowBase = ObjectBase & {
  adult?: boolean;
  backdropPath?: ImagePath;
  genreIds?: number[];
  genres?: Genre[];
  homepage?: SoN;
  id?: number;
  originalLanguage?: string;
  overview?: SoN;
  popularity?: number;
  posterPath?: ImagePath;
  productionCompanies?: Company[];
  productionCountries?: Country[];
  spokenLanguages?: Language[];
  status?: string;
  tagline?: SoN;
  voteAverage?: number;
  voteCount?: number;
};
export type Tv = ShowBase & {
  createdBy?: CrewCredit[];
  episodeRunTime?: number[];
  firstAirDate?: string;
  inProduction?: boolean;
  languages?: string[];
  lastAirDate?: string;
  lastEpisodeToAir?: Episode;
  name?: string;
  networks?: Network[];
  nextEpisodeToAir?: null;
  numberOfEpisodes?: number;
  numberOfSeasons?: number;
  originalName?: string;
  originCountry?: string[];
  seasons?: Season[];
  type?: string;
};
// https://developers.themoviedb.org/3/movies/get-movie-details
export type Movie = ShowBase & {
  belongsToCollection?: null | Object;
  budget?: number;
  imdbId?: SoN;
  originalTitle?: string;
  releaseDate?: string;
  revenue?: NoN;
  runtime?: NoN;
  title?: string;
  video?: boolean;
};
export type Show = Movie | Tv;
export type ShowBaseExtras = {
  /**
   * these are values that are returned
   * in search results that are generally only
   * found on one export type or the other.
   */
  firstAirDate?: string; // tv
  mediaType?: string; // to support search responses
  name?: string; // tv
  originalTitle?: string; // movie
  releaseDate?: string; // movie
  title?: string; // movie
  video?: boolean; // movie
};
export type SearchResultShow = ShowBase & ShowBaseExtras;

/**
 *  ___ ___ ___ ___ ___ ___ ___ ___ ___
 * |  _| -_|_ -| . | . |   |_ -| -_|_ -|
 * |_| |___|___|  _|___|_|_|___|___|___|
 *             |_|
 */
export type ErrorResponse = {
  statusCode: number;
  statusMessage: string;
};
export type FinditResults = {
  movieResults?: Movie[];
  personResults?: Person[];
  tvResults?: Movie[];
  tvEpisodeResults: any;
  tvSeasonResults: any;
};
export type APIResponse = {
  statusCode: string;
  headers: {
    [key: string]: any;
  };
  body: {
    status_message: string;
    status_code: number;
  };
};
export type FindResults = {
  movieResults: SearchResultShow[];
  personResults: Person[];
  tvResults: SearchResultShow[];
  tvEpisodeResults: Episode[];
  tvSeasonResults: Season[];
};
export type SearchMultiResults = {
  results: SearchResultShow[];
  totalPages: number;
  totalResults: number;
};
