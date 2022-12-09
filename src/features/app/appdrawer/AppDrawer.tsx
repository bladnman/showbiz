import { Box, Divider, Drawer, IconButton } from "@mui/material";
import useMegaStore from "../../../store/MegaStore";
import { toggleDrawer } from "../../../store/utils/appUtils";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DrawerList from "./components/DrawerList";
import useCollectionTools from "../../../hooks/useCollectionTools";
import useGenres from "../../../hooks/useGenres";
import useDecades from "../../../hooks/useDecades";
import useShowTools from "../../../hooks/useShowTools";
import {
  setBodyShows,
  showContainsGenre,
} from "../../../store/utils/itemUtils";
import { getReleaseDecade } from "../../../services/TMDB/utils/yearUtils";
import { useCallback, useEffect, useState } from "react";
import { ShowbizItem } from "../../../@types";
import { useFilter } from "./hooks/useFilter";
import { useCollectionsFilter } from "./hooks/useCollectionsFilter";
import { useDecadeFilter } from "./hooks/useDecadeFilter";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AppDrawer() {
  const drawerWidth = useMegaStore((state) => state.drawerWidth);
  const isDrawerOpen = useMegaStore((state) => state.isDrawerOpen);

  const [filters, setFilters] = useState<Set<string>>(new Set());

  const { shows } = useShowTools();
  const { collections } = useCollectionTools();
  const genres = useGenres();
  const decades = useDecades();

  const collectionsFilter = useCollectionsFilter();
  const decadeFilter = useDecadeFilter();

  useEffect(() => {
    const filteredShowsSet = getFilterSet(
      [collectionsFilter.filteredShowsSet, decadeFilter.filteredShowsSet],
      shows
    );
    setBodyShows(Array.from(filteredShowsSet));
  }, [collectionsFilter.filteredShowsSet, decadeFilter.filteredShowsSet]);

  return (
    <Drawer
      variant="permanent"
      open={isDrawerOpen}
      onClose={() => toggleDrawer()}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          width: drawerWidth,
          borderWidth: 0,
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={() => toggleDrawer()}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box paddingTop={3} p={2} role={"presentation"}>
        {/*<DrawerList*/}
        {/*  items={["All Shows"]}*/}
        {/*  onClick={handleClick}*/}
        {/*  filters={filters}*/}
        {/*/>*/}
        <DrawerList filter={collectionsFilter} />
        <DrawerList filter={decadeFilter} />
        {/*<DrawerList*/}
        {/*  items={genres}*/}
        {/*  title="Genres"*/}
        {/*  onClick={handleClick}*/}
        {/*  filters={filters}*/}
        {/*/>*/}
        {/*<DrawerList*/}
        {/*  items={decades}*/}
        {/*  title="Decades"*/}
        {/*  onClick={handleClick}*/}
        {/*  filters={filters}*/}
        {/*/>*/}
      </Box>
    </Drawer>
  );
}

function getFilterSet(
  sets: Set<ShowbizItem>[],
  shows: ShowbizItem[]
): Set<ShowbizItem> {
  const anyIsFiltered = sets.some((set) => set.size < shows.length);
  if (!anyIsFiltered) return new Set(shows);

  let outSet = new Set<ShowbizItem>();
  sets.forEach((set) => {
    if (set.size < shows.length) {
      outSet = new Set([...outSet, ...set]);
    }
  });
  return outSet;
}

function getFilteredShows(filters: Set<string>, shows: ShowbizItem[]) {
  if (!shows || !filters) return shows;
  const filtersA = Array.from(filters);
  let matchingShows: ShowbizItem[] = [];

  for (let i = 0; i < shows.length; i++) {
    const show = shows[i];
    for (let j = 0; j < filtersA.length; j++) {
      const [title, value] = filtersA[j].split("_");
      if (title?.toUpperCase() === "COLLECTIONS") {
        if (show.collections?.includes(value)) {
          matchingShows.push(show);
          break;
        }
      }
      if (title?.toUpperCase() === "GENRES") {
        if (showContainsGenre(show, value)) {
          matchingShows.push(show);
          break;
        }
      }
      if (title?.toUpperCase() === "DECADES") {
        if (getReleaseDecade(show) === parseInt(value)) {
          matchingShows.push(show);
          break;
        }
      }
    }
  }
  return matchingShows;
}
