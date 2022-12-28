import React, { MouseEvent, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import { useWindowSize } from "@hooks/useWindowSize";
import NotFoundTile from "./NotFoundTile";
import useBreakSize from "../utils/useBreakSize";
import { ShowbizItem } from "@types";
import useShowTools from "@hooks/useShowTools";
import CompositePosterTile from "@features/tiles/poster-tile/CompositePosterTile";
import useDrawerTools from "@hooks/useDrawerTools";

export default function ShowGrid({
  shows,
  onClick,
}: {
  shows?: ShowbizItem[] | null;
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
}) {
  const windowSize = useWindowSize();
  const { isXs, isSm, isMd, isLg, isXl, isXxl } = useBreakSize();

  const { drawerWidth, isDrawerPermanentOpen } = useDrawerTools();

  const gridWidth = isDrawerPermanentOpen
    ? windowSize.width - drawerWidth
    : windowSize.width;

  const { isShowSelected } = useShowTools();

  const numberOfColumns = useMemo(() => {
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
  }, [isXs, isSm, isMd, isDrawerPermanentOpen, isLg, isXl, isXxl]);

  const tileWidth = useMemo(() => {
    const usableWidth = Math.min(5000, gridWidth) * 0.9;
    return usableWidth / numberOfColumns;
  }, [gridWidth, numberOfColumns]);

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
