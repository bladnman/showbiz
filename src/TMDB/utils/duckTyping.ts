export function isPersonType(object: any): boolean {
  if (!object) return false;
  if ("profilePath" in object) return true;
  if ("birthday" in object) return true;
  if ("gender" in object) return true;
  if ("placeOfBirth" in object) return true;
  if ("knownFor" in object) return true;
  if ("biography" in object) return true;
  return false;
}
export function isTvShowType(object: any): boolean {
  if (!object) return false;
  if (object["mediaType"] === "tv") return true;
  if ("firstAirDate" in object) return true;
  if ("seasons" in object) return true;
  if ("numberOfSeasons" in object) return true;
  if ("numberOfEpisodes" in object) return true;
  if ("nextEpisodeToAir" in object) return true;
  if ("lastAirDate" in object) return true;
  return false;
}
export function isMovieType(object: any): boolean {
  if (!object) return false;
  if (object["mediaType"] === "movie") return true;
  if ("title" in object) return true;
  if ("budget" in object) return true;
  if ("releaseDate" in object) return true;
  if ("revenue" in object) return true;
  if ("runtime" in object) return true;
  return false;
}
