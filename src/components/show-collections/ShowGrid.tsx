import React, { MouseEvent, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import { useWindowSize } from "@hooks/useWindowSize";
import NotFoundTile from "../tiles/NotFoundTile";
import useBreakSize from "@utils/useBreakSize";
import { ShowbizItem } from "@types";
import useShowTools from "@hooks/useShowTools";
import CompositePosterTile from "@features/tiles/poster-tile/CompositePosterTile";
import useDrawerTools from "@hooks/useDrawerTools";

export default function ShowGrid({
  shows,
  onClick,
  columns,
  gridWidth,
  maxPosterWidth,
}: {
  shows?: ShowbizItem[] | null;
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
  columns?: number;
  gridWidth?: number;
  maxPosterWidth?: number;
}) {
  const windowSize = useWindowSize();
  const { isXs, isSm, isMd, isLg, isXl, isXxl } = useBreakSize();
  const { drawerWidth, isDrawerPermanentOpen } = useDrawerTools();
  const { isShowSelected } = useShowTools();

  const calcdGridWidth = useMemo(() => {
    if (gridWidth) return Math.min(gridWidth, windowSize.width);

    return isDrawerPermanentOpen
      ? windowSize.width - drawerWidth
      : windowSize.width;
  }, [drawerWidth, gridWidth, isDrawerPermanentOpen, windowSize.width]);
  const numberOfColumns = useMemo(() => {
    if (columns) return columns;

    if (isXs) {
      return 3;
    }
    if (isSm) {
      return 4;
    }
    if (isMd || (isDrawerPermanentOpen && isSm)) {
      return 5;
    }
    if (isLg || (isDrawerPermanentOpen && isMd)) {
      return 6;
    }
    if (isXl || (isDrawerPermanentOpen && isLg)) {
      return 8;
    }
    if (isXxl || (isDrawerPermanentOpen && isXl)) {
      return 10;
    }
    return 12;
  }, [isXs, isSm, isMd, isDrawerPermanentOpen, isLg, isXl, isXxl, columns]);

  const tileWidth = useMemo(() => {
    const usableWidth = Math.min(maxPosterWidth ?? 5000, calcdGridWidth) * 0.9;
    return usableWidth / numberOfColumns;
  }, [calcdGridWidth, maxPosterWidth, numberOfColumns]);

  if (!shows || !shows.length) return <NotFoundTile />;
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
            <CompositePosterTile
              selected={isShowSelected(show)}
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
