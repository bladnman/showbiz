import React from "react";
import { Box, Typography } from "@mui/material";
import NotFoundTile from "./NotFoundTile";
import { CustomDataItem, ShowbizItem } from "../@types";
import ShowGrid from "./ShowGrid";
import {
  getAllGenres,
  showsWithCollection,
  showsWithGenre,
} from "../utils/itemUtils";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { setBodyGroupBy } from "../utils/appUtils";
import { getAllCollections } from "../utils/collectionUtils";

export default function GroupByGrid({
  shows,
  customDataList,
  onClick,
  groupBy,
}: {
  shows?: ShowbizItem[];
  customDataList: CustomDataItem[];
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
  groupBy?: string;
}) {
  const [groups, setGroups] = useState<string[]>();
  const filterFn =
    useRef<(shows: ShowbizItem[], value: string) => ShowbizItem[]>();

  useEffect(() => {
    switch (groupBy?.toUpperCase()) {
      case "GENRE":
        filterFn.current = showsWithGenre;
        setGroups(getAllGenres(shows));
        break;
      case "COLLECTION":
        filterFn.current = showsWithCollection;
        setGroups(getAllCollections(customDataList));
        break;
      default:
        filterFn.current = undefined;
        setGroups(undefined);
        setBodyGroupBy(undefined);
        break;
    }
  }, [shows, groupBy]);

  if (!filterFn.current || !shows?.length || !groups?.length)
    return <NotFoundTile />;

  return (
    <Box>
      {groups.map((groupValue) => {
        return (
          <Box key={groupValue}>
            <Typography variant={"h5"} marginBottom={2}>
              {groupValue}
            </Typography>
            <ShowGrid
              shows={filterFn.current && filterFn.current(shows, groupValue)}
              onClick={onClick}
            />
            <Box paddingBottom={5} />
          </Box>
        );
      })}
    </Box>
  );
}
