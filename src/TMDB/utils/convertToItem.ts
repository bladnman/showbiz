import {
  Movie,
  Tv,
  Person,
  ObjectBase,
  Genre,
  Language,
  Network,
  Season,
} from "../types";

type commonSearchFields = {
  // backdropPath; //
  // id; //
  // name; //
  // popularity; //
  // voteAverage; //
  // voteCount; //
};
type uncommonSearchFields = {
  // tv & movie
  // adult;
  // firstAirDate;
  // genreIds; //
  // mediaType; //
  // overview; //
  // posterPath; //
  // releaseDate;
  // video;
  // // person
  // gender;
  // known_for;
  // known_for_department;
  // media_type;
  // profile_path;
};

export type ShowbizItem = {
  // common
  isMovie: boolean;
  isTv: boolean;
  isPerson: boolean;
  id: number;
  name: string;

  // optional
  description?: string;
  posterPath?: string;
  backdropPath?: string;
  voteAverage?: number;
  voteCount?: number;
  spokenLanguages?: Language[];
  genreIds?: number[];
  genres?: Genre[];

  // tv items
  seasons?: Season[];
  networks?: Network[];
  lastAirDate?: string;
  firstAirDate?: string;
  numberOfEpisodes?: number;
  numberOfSeasons?: number;

  // movie items
  budget?: number;
  releaseDate?: string;
  revenue?: number;
  runtime?: number;

  // person items
  gender?: string;
  knownFor?: ShowbizItem[];
  knownForDepartment?: string[];
  profilePath?: string;
};

export default function convertToItem(
  tmdbObject: Movie | Tv | Person | null | undefined
): ShowbizItem | any {
  if (!tmdbObject) return null;
  if (!tmdbObject.isMovie && !tmdbObject.isTv && !tmdbObject.isPerson)
    return tmdbObject;

  const item = tmdbObject as any;
  return {
    ...item,

    // HARD - MAP DESIRED ITEMS
    isMovie: Boolean(item.isMovie),
    isTv: Boolean(item.isTv),
    isPerson: Boolean(item.isPerson),
    id: item.id,
    name: item.name ?? item.title,
    description: item.overview,

    // posterPath: item.posterPath,
    // backdropPath: item.backdropPath,
    // voteAverage: item.voteAverage,
    // voteCount: item.voteCount,
    // spokenLanguages: item.spokenLanguages,
    // genreIds: item.genreIds,
    // genres: item.genres,
    // seasons: item.seasons,
    // networks: item.networks,
    // lastAirDate: item.lastAirDate,
    // firstAirDate: item.firstAirDate,
    // numberOfEpisodes: item.numberOfEpisodes,
    // numberOfSeasons: item.numberOfSeasons,
    // budget: item.budget,
    // releaseDate: item.releaseDate,
    // revenue: item.revenue,
    // runtime: item.runtime,
    // gender: item.gender,
    // knownFor: item.knownFor,
    // knownForDepartment: item.knownForDepartment,
    // profilePath: item.profilePath,
  };
}
