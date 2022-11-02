interface TMDBApi {
  apiKey: string;
  language: string;
  get: <T>(resource: string, parameters: QueryType) => Promise<T>;
  getMovie: (movieId: number) => Promise<Movie>;
  getMovieBackdropImages: (
    movieId: number,
    includeImageLanguage: string[]
  ) => Promise<MovieBackdropImage[]>;
  getMovieCastCredits: (movieId: number) => Promise<MovieCastCredit[]>;
  getMovieCrewCredits: (movieId: number) => Promise<MovieCrewCredit[]>;
  getMoviePosterImages: (
    movieId: number,
    includeImageLanguage: string[]
  ) => Promise<MoviePosterImage[]>;
  getMovieVideos: (movieId: number) => Promise<MovieVideo[]>;
  getPerson: (personId: number) => Promise<Person>;
  getCompany: (companyId: number) => Promise<Company>;
  findId: (
    resourceType: "movie" | "person",
    externalSource: "imdb",
    externalId: string
  ) => Promise<number>;
}
type Query = {
  [key: string]: string | number | null;
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
  iso6391: string;
  name: string;
};
type ImagePath = SoN;

export type MovieBackdropImage = {
  aspectRatio?: number;
  filePath?: string;
  height?: number;
  iso6391?: SoN;
  voteAverage?: number;
  voteCount?: number;
  width?: number;
};
type MovieCredits = {
  id?: number;
  cast?: MovieCastCredit[];
  crew?: MovieCrewCredit[];
};
type MovieCastCredit = {
  castId?: number;
  character?: string;
  creditId?: string;
  gender?: NoN;
  id?: number;
  name?: string;
  order?: number;
  profilePath?: ImagePath;
};

type MovieCrewCredit = {
  creditId?: string;
  department?: string;
  gender?: NoN;
  id?: number;
  job?: string;
  name?: string;
  profilePath?: ImagePath;
};

type MoviePosterImageCollection = {
  id?: number;
  backdrops?: MovieBackdropImage[];
  posters?: MoviePosterImage[];
};
type MoviePosterImage = {
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
