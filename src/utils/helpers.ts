import { Timestamp } from "firebase/firestore";
import { ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";
import dayjs from "dayjs";
import { replaceFor } from "@utils/MU";

export function rnd(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function isHeads() {
  return Math.round(Math.random()) === 1;
}

export function roll(sides: number) {
  return rnd(1, sides);
}

export function rollIsOf(min: number, sides: number) {
  return rnd(1, sides) >= min;
}

/**
 * a _"portion of 1"_ or `decimal fraction`
 * value between 0 and 1.
 * @param minPercFloat 0.0 - 1.0
 * @returns boolean
 */
export function isPercFloat(minPercFloat: number) {
  return Math.random() >= minPercFloat;
}

export function sortAlphaNumeric(a: string, b: string) {
  //js sort compare function for only alpha numeric characters
  return a
    .replace(/[^a-zA-Z0-9]/g, "")
    .localeCompare(b.replace(/[^a-zA-Z0-9]/g, ""));
}

export function showHoldDateComparator(a: ShowbizItem, b: ShowbizItem) {
  const customDataA = getCustomDataForShow(a);
  const customDataB = getCustomDataForShow(b);

  if (!customDataA) return 0;
  if (!customDataB) return 0;
  if (!customDataA.holdUntilDate) return 1;
  if (!customDataB.holdUntilDate) return -1;

  const ymdA = ~~replaceFor(
    ymdFromTimestamp(customDataA.holdUntilDate),
    "-",
    ""
  );
  const ymdB = ~~replaceFor(
    ymdFromTimestamp(customDataB.holdUntilDate),
    "-",
    ""
  );
  console.log(`[🐽](helpers) ymdA, ymdB`, ymdA, ymdB);
  return ymdA - ymdB;
}

export function showRatingComparator(a: ShowbizItem, b: ShowbizItem) {
  if (!a.voteAverage) return 1;
  if (!b.voteAverage) return -1;

  return b.voteAverage - a.voteAverage;
}

export function dateFromTimestamp(timestamp: Timestamp) {
  return new Date(timestamp.seconds * 1000);
}

export function timestampFromDate(date: Date) {
  return Timestamp.fromDate(date);
}

export function ymdFromTimestamp(timestamp: Timestamp) {
  return dayjs(dateFromTimestamp(timestamp)).format("YYYY-MM-DD");
}
