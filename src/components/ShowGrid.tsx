import React, { MouseEvent, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import { useWindowSize } from "@hooks/useWindowSize";
import NotFoundTile from "./NotFoundTile";
import useBreakSize from "../utils/useBreakSize";
import { ShowbizItem } from "@types";
import SelectablePosterTile from "@features/tiles/postertile/SelectablePosterTile";
import useShowTools from "@hooks/useShowTools";

export default function ShowGrid({
  shows,
  onClick,
}: {
  shows?: ShowbizItem[] | null;
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
}) {
  const windowSize = useWindowSize();
  const { isXs, isSm, isMd, isLg, isXl } = useBreakSize();

  const { isShowSelected } = useShowTools();

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
            <SelectablePosterTile
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
