import { Box, Typography } from "@mui/material";
import NotFoundTile from "./NotFoundTile";
import { ShowbizItem } from "../@types";
import ShowGrid from "./ShowGrid";
import {
  getAllCollections,
  getAllGenres,
  showsWithCollection,
  showsWithGenre,
} from "../store/utils/itemUtils";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { setBodyGroupBy } from "../store/utils/appUtils";

export default function GroupByGrid({
  shows,
  onClick,
  groupBy,
}: {
  shows?: ShowbizItem[];
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
        setGroups(getAllCollections(shows));
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
