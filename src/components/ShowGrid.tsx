import { Box, Grid } from "@mui/material";
import { useMemo } from "react";
import { ShowbizItem } from "../services/TMDB/utils/convertToItem";
import { useWindowSize } from "../hooks/useWindowSize";
import PosterTile from "../features/tiles/postertile/PosterTile";
import NotFoundTile from "./NotFoundTile";
import useBreakSize from "../utils/useBreakSize";

export default function ShowGrid({ shows }: { shows: ShowbizItem[] }) {
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

  const onClick = (show: ShowbizItem) => {
    console.log(`[🐽](ShowGrid) show`, show);
  };

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
