import { ShowbizItem } from "../../../@types";
import { fLeft } from "../../../utils/MU";

export function getYearSpanDisplay(show?: ShowbizItem | null): string | null {
  if (!show) return null;

  if (show.isMovie) {
    return stripYear(show.releaseDate);
  }
  if (show.isTv) {
    const firstYear = stripYear(show.firstAirDate);
    const isCompleted = show.status === "Ended" || show.status === "Canceled";
    const lastYear = isCompleted ? stripYear(show.lastAirDate) : "";

    return [firstYear, lastYear].join(" - ");
  }

  return null;
}

export function getReleaseYear(show?: ShowbizItem | null): string | null {
  if (!show) return null;

  if (show.isMovie) {
    return stripYear(show.releaseDate);
  }
  if (show.isTv) {
    return stripYear(show.firstAirDate);
  }

  return null;
}

export function getReleaseDecade(show?: ShowbizItem | null): number | null {
  const year = getReleaseYear(show);
  if (!year) return null;

  const numYear = parseInt(year);
  return ~~(numYear / 10) * 10;
}

function stripYear(ymd: string | null | undefined) {
  return fLeft(ymd, "-");
}
