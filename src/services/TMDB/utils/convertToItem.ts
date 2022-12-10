import useMegaStore from "../../../store/MegaStore";
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
import { ShowbizItem } from "../../../@types";

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
    itemType: item.isMovie ? "movie" : item.isTv ? "tv" : null,
    isPerson: Boolean(item.isPerson),
    id: item.id,
    name: item.name ?? item.title,
    description: item.overview,
    collections: item.items ?? [],

    posterPath: hydrateUrl(item.posterPath),
    backdropPath: hydrateUrl(item.backdropPath),
    profilePath: hydrateUrl(item.profilePath),

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
  };
}

export function hydrateUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  return `${getBaseImgUrl()}${path}`;
}

let baseImgUrl: string | null = null;

function getBaseImgUrl() {
  if (!baseImgUrl) {
    const tmdb = useMegaStore.getState().tmdb;
    baseImgUrl = tmdb.baseImageUrl;
  }
  return baseImgUrl;
}
