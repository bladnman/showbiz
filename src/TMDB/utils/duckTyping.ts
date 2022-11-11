import { ObjectType } from "../types";

export function isPersonType(object: any): boolean {
  if (!object) return false;
  if (object["objectType"] === "person") return true;
  if ("profilePath" in object) return true;
  if ("birthday" in object) return true;
  if ("gender" in object) return true;
  if ("placeOfBirth" in object) return true;
  if ("knownFor" in object) return true;
  if ("biography" in object) return true;
  return false;
}
export function isTvType(object: any): boolean {
  if (!object) return false;
  if (object["objectType"] === "tv") return true;
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
  if (object["objectType"] === "movie") return true;
  if (object["mediaType"] === "movie") return true;
  if ("title" in object) return true;
  if ("budget" in object) return true;
  if ("releaseDate" in object) return true;
  if ("revenue" in object) return true;
  if ("runtime" in object) return true;
  return false;
}
export function getObjectType(object: any): ObjectType | null {
  if (!object) return null;
  if (isMovieType(object)) return "movie";
  if (isTvType(object)) return "tv";
  if (isPersonType(object)) return "person";

  return null;
}
export function populateType(object: any) {
  const objectType = getObjectType(object);
  if (!objectType) return;

  const iserName = `is${objectType[0].toUpperCase()}${objectType.slice(1)}`;

  object["objectType"] = objectType;
  object[iserName] = true;
}
