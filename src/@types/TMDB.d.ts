interface TMDBApi {
  apiKey: string;
  language: string;
  /** @throws {NotFoundError, RemoteError} */
  get: <T>(resource: string, parameters: QueryType) => Promise<T>;
  /** @throws {NotFoundError, RemoteError} */
  getMovie: (id: number | string, options?: OptionsBag) => Promise<Movie>;
  /** @throws {NotFoundError, RemoteError} */
  getTvShow: (id: number | string, options?: OptionsBag) => Promise<TvShow>;

  /** @throws {NotFoundError, RemoteError} */
  getMovieCastCredits: (movieId: number) => Promise<CastCredit[]>;
  /** @throws {NotFoundError, RemoteError} */
  getMovieCrewCredits: (movieId: number) => Promise<CrewCredit[]>;

  /** @throws {NotFoundError, RemoteError} */
  getMoviePosters: (
    id: number,
    includeImageLanguage: string[]
  ) => Promise<ShowImage[]>;
  /** @throws {NotFoundError, RemoteError} */
  getMovieBackdrops: (
    id: number,
    includeImageLanguage: string[]
  ) => Promise<ShowImage[]>;
  /** @throws {NotFoundError, RemoteError} */
  getMovieLogos: (
    id: number,
    includeImageLanguage: string[]
  ) => Promise<ShowImage[]>;

  /** @throws {NotFoundError, RemoteError} */
  getMovieVideos: (movieId: number) => Promise<MovieVideo[]>;
  /** @throws {NotFoundError, RemoteError} */
  getPerson: (personId: number) => Promise<Person>;
  /** @throws {NotFoundError, RemoteError} */
  getCompany: (companyId: number) => Promise<Company>;
  /** @throws {NotFoundError, RemoteError} */
  findId: (
    resourceType: "movie" | "person",
    externalSource: "imdb",
    externalId: string
  ) => Promise<number>;
}
type ApiFn = Function;
type Query = {
  [key: string]: string | number | null;
};
type OptionsBag = {
  [key: string]: any;
};
// https://developers.themoviedb.org/3/movies/get-movie-details
type Movie = {
  adult?: boolean;
  backdropPath?: ImagePath;
  belongsToCollection?: null | Object;
  budget?: number;
  genres?: Genre[];
  homepage?: SoN;
  id?: number;
  imdbId?: SoN;
  originalLanguage?: string;
  originalTitle?: string;
  overview?: SoN;
  popularity?: number;
  posterPath?: ImagePath;
  productionCompanies?: Company[];
  productionCountries?: Country[];
  releaseDate?: string;
  revenue?: NoN;
  runtime?: NoN;
  spokenLanguages?: Language[];
  status?: string;
  tagline?: SoN;
  title?: string;
  video?: boolean;
  voteAverage?: number;
  voteCount?: number;
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
type TvShow = {
  adult?: boolean;
  backdropPath?: string;
  createdBy?: CrewCredit[];
  episodeRunTime?: number[];
  firstAirDate?: string;
  genres?: Genre[];
  genreIds?: number[];
  homepage?: string;
  id?: number;
  inProduction?: boolean;
  languages?: string[];
  lastAirDate?: string;
  lastEpisodeToAir?: Episode;
  name?: string;
  nextEpisodeToAir?: null;
  networks?: Network[];
  numberOfEpisodes?: number;
  numberOfSeasons?: number;
  originCountry?: string[];
  originalLanguage?: string;
  originalName?: string;
  overview?: string;
  popularity?: number;
  posterPath?: string;
  productionCompanies?: Company[];
  productionCountries?: Country[];
  seasons?: Season[];
  spokenLanguages?: Language[];
  status?: string;
  tagline?: string;
  type?: string;
  voteAverage?: number;
  voteCount?: number;
};
