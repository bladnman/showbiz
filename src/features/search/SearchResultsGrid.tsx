import { Box, Grid } from "@mui/material";
import { useEffect, useMemo } from "react";
import { ShowbizItem } from "../../@types";
import LoadingTile from "../../components/LoadingTile";
import NotFoundTile from "../../components/NotFoundTile";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useApiSearch } from "../../services/TMDB/hooks/useApi";
import useMegaStore from "../../store/MegaStore";
import { setSearchSelectedItem } from "../../store/utils/itemUtils";
import useBreakSize from "../../utils/useBreakSize";
import PosterTile from "../tiles/postertile/PosterTile";

export default function SearchResultsGrid() {
  const searchQuery = useMegaStore((state) => state.searchQuery);
  const searchType = useMegaStore((state) => state.searchType);
  const windowSize = useWindowSize();
  const { isXs, isSm, isMd, isLg, isXl } = useBreakSize();

  const numberOfColumns = useMemo(() => {
    if (isXs) {
      return 3;
    }
    if (isSm) {
      return 4;
    }
    return 6;
  }, [isXs, isSm, isMd, isLg, isXl]);

  const tileWidth = useMemo(() => {
    const usableWidth = Math.min(1300, windowSize.width) * 0.8;

    return usableWidth / numberOfColumns;
  }, [windowSize, numberOfColumns]);

  const [shows, isLoading, error] = useApiSearch(searchQuery, {
    type: searchType,
  });

  useEffect(() => {
    if (!shows) return;
    setSearchSelectedItem(shows[0]);
  }, [shows]);

  const onClick = (show: ShowbizItem) => {
    setSearchSelectedItem(show);
  };

  if (isLoading) return <LoadingTile />;
  if (!shows || !shows.length || !searchQuery) return <NotFoundTile />;
  if (error) return <NotFoundTile />;
  return (
    <Box>
      <Grid container spacing={2}>
        {shows.map((show) => (
          <Grid
            item
            xs={12 / numberOfColumns}
            sm={12 / numberOfColumns}
            md={12 / numberOfColumns}
            key={show.id}
          >
            <PosterTile
              show={show}
              key={show.id}
              width={tileWidth}
              onClick={onClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
