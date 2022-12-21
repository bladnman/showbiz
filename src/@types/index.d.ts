import { SxProps } from "@mui/material";
import React from "react";
import { Genre, Language, Network, Season } from "../services/TMDB/types";
import { Timestamp } from "firebase/firestore";

type CustomDataItem = {
  id: number;
  name: string;

  //
  // DATES
  lastHydrationDate?: Timestamp;
  createdDate: Timestamp;
  editedDate: Timestamp;
  delayUntilDate?: Timestamp;

  //
  // VALUES
  watchStatus: string;
  interestLevel?: number;
  userRating?: number;
  collections: string[];
};
type ShowbizItem = {
  // common
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
  imdbId?: string;
  homepage?: string;
  originalLanguage?: string;

  // tv items
  seasons?: Season[];
  status?: "Returning Series" | "Canceled" | "Ended";
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
  streamItems?: StreamItem[];

  // synthesized
  isMovie: boolean;
  isTv: boolean;
  itemType: "tv" | "movie" | "person" | null;
  isPerson: boolean;
  personalRating?: number;
  lastHydrationDate?: Timestamp;
};
type SoN = string | null;
type NoN = number | null;
type Size = {
  width: number;
  height: number;
};
type ShowProp = { show: ShowbizItem };
type ShowPropOpt = { show?: ShowbizItem | null };
type SxPropOpt = { sx?: SxProps };
type ClickEvent = React.MouseEvent<HTMLElement>;
type KeyboardEvent = React.KeyboardEvent<
  HTMLElement & { target: { value: string | undefined | null } }
>;
type KidProps = {
  children?: React.ReactNode;
};
type FilterDef = {
  // all filter values available in this Filter
  allValues: string[];
  // shows that match the selected filters of this Filter
  // all active filters in this Filter
  selectedValues: Set<string>;
  filteredShowsSet: Set<ShowbizItem>;
  title: string | null;
  onClick: ({
    item,
    title,
    event,
  }: {
    item: string;
    title?: string;
    event?: ClickEvent;
  }) => void;
  onDeselectAll: () => void;
  defaultExpanded: boolean;
  isValueSelected: (item: string) => boolean;
  areValuesEditable: boolean;
};
type ShowGroup = {
  title: string;
  shows: ShowbizItem[];
};
type GroupByDef = {
  title: string;
  showGroups: ShowGroup[];
};
