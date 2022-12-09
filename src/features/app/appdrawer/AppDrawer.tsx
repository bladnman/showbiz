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

  const handleClick = useCallback(
    (value: string, title?: string) => {
      if (value.toUpperCase() === "ALL SHOWS") {
        setFilters(new Set());
      } else {
        const filter = `${title}_${value}`;
        if (filters.has(filter)) {
          filters.delete(filter);
        } else {
          filters.add(filter);
        }
        setFilters(new Set(filters));
      }
    },

    [shows, filters]
  );

  useEffect(() => {
    console.log(`[🐽](AppDrawer) filters`, filters);
    if (filters.size < 1) {
      setBodyShows(shows);
    } else {
      setBodyShows(getFilteredShows(filters, shows));
    }
  }, [filters, shows]);

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
        <DrawerList
          items={["All Shows"]}
          onClick={handleClick}
          filters={filters}
        />
        <DrawerList
          items={collections}
          title="Collections"
          onClick={handleClick}
          filters={filters}
        />
        <DrawerList
          items={genres}
          title="Genres"
          onClick={handleClick}
          filters={filters}
        />
        <DrawerList
          items={decades}
          title="Decades"
          onClick={handleClick}
          filters={filters}
        />
      </Box>
    </Drawer>
  );
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
