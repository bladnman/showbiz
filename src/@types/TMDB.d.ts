type ApiFn = Function;
type ShowType = "movie" | "tv";
type Query = {
  [key: string]: string | number | null;
};
type OptionsBag = {
  [key: string]: any;
};
type Genre = {
  id: number;
  name: string;
};
type Company = {
  id: number;
  name: string;
};
type Country = {
  iso31661: string;
  name: string;
};
type Language = {
  english_name: string;
  iso6391: string;
  name: string;
};
type ImagePath = SoN;
export type ShowImage = {
  aspectRatio?: number;
  filePath?: string;
  height?: number;
  iso6391?: SoN;
  voteAverage?: number;
  voteCount?: number;
  width?: number;
};
type Credits = {
  id?: number;
  cast?: CastCredit[];
  crew?: CrewCredit[];
};
type CastCredit = {
  castId?: number;
  character?: string;
  creditId?: string;
  gender?: NoN;
  id?: number;
  name?: string;
  order?: number;
  profilePath?: ImagePath;
};
type CrewCredit = {
  creditId?: string;
  department?: string;
  gender?: NoN;
  id?: number;
  job?: string;
  name?: string;
  profilePath?: ImagePath;
};
type ShowImageCollection = {
  id?: number;
  backdrops?: ShowImage[];
  posters?: ShowImage[];
  logos?: ShowImage[];
};
type ShowImage = {
  aspectRatio?: number;
  filePath?: string;
  height?: number;
  iso6391?: SoN;
  voteAverage?: number;
  voteCount?: number;
  width?: number;
};
type MovieVideoCollection = {
  id?: number;
  results?: MovieVideo[];
};
type MovieVideo = {
  id?: string;
  iso31661?: string;
  iso6391?: string;
  key?: string;
  name?: string;
  site?: string;
  size?: number;
  type?: string;
};
type Person = {
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
type Company = {
  description?: string;
  headquarters?: string;
  homepage?: string;
  id?: number;
  logoPath?: string;
  name?: string;
  originCountry?: string;
  parentCompany?: null | Company;
};
type Season = {
  airDate?: string;
  episodeCount?: number;
  id?: number;
  name?: string;
  overview?: string;
  posterPath?: string;
  seasonNumber?: number;
};
type Network = {
  id?: number;
  name?: string;
  logoPath?: string;
  originCountry?: string;
};
type Episode = {
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
type ShowBase = {
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
type TvShow = ShowBase & {
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
type Movie = ShowBase & {
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
type ShowBaseExtras = {
  /**
   * these are values that are returned
   * in search results that are generally only
   * found on one type or the other.
   */
  firstAirDate?: string; // tv
  mediaType?: string; // to support search responses
  name?: string; // tv
  originalTitle?: string; // movie
  releaseDate?: string; // movie
  title?: string; // movie
  video?: boolean; // movie
};
type SearchResultShow = ShowBase & ShowBaseExtras;

/**
 *  ___ ___ ___ ___ ___ ___ ___ ___ ___
 * |  _| -_|_ -| . | . |   |_ -| -_|_ -|
 * |_| |___|___|  _|___|_|_|___|___|___|
 *             |_|
 */
type ErrorResponse = {
  statusCode: number;
  statusMessage: string;
};
type FinditResults = {
  movieResults?: Movie[];
  personResults?: Person[];
  tvResults?: Movie[];
  tvEpisodeResults: any;
  tvSeasonResults: any;
};
type APIResponse = {
  statusCode: string;
  headers: {
    [key: string]: any;
  };
  body: {
    status_message: string;
    status_code: number;
  };
};
type FindResults = {
  movieResults: SearchResultShow[];
  personResults: Person[];
  tvResults: SearchResultShow[];
  tvEpisodeResults: Episode[];
  tvSeasonResults: Season[];
};
type SearchMultiResults = {
  results: SearchResultShow[];
  totalPages: number;
  totalResults: number;
};
