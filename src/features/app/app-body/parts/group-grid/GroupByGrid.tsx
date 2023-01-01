import React, { MouseEvent } from "react";
import { Box, Typography } from "@mui/material";
import NotFoundTile from "@components/tiles/NotFoundTile";
import { ShowbizItem, ShowGroup } from "@types";
import ShowGrid from "@components/show-collections/ShowGrid";
import useBodyGroupByDef from "@features/app/app-body/parts/group-grid/hooks/useBodyGroupByDef";
import AppCountLabel from "@components/text/AppCountLabel";
import { Stack } from "@mui/system";
import { COLORS } from "@/features/app/app-theme/theme_const";
import useShowListCustomData from "@hooks/useShowListCustomData";

export default function GroupByGrid({
  shows,
  onClick,
  groupBy,
}: {
  shows: ShowbizItem[];
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
  groupBy?: string;
}) {
  const customDataList = useShowListCustomData(shows);
  const groupByRef = useBodyGroupByDef({ groupBy, customDataList, shows });

  if (groupByRef.showGroups.length < 1) return <NotFoundTile />;

  return (
    <Box>
      {groupByRef.showGroups.map(({ title, shows }: ShowGroup) => {
        return (
          <Box key={title}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={3}
              marginBottom={2}
            >
              <Typography variant={"h5"} sx={{ color: COLORS.bright }}>
                {title}
              </Typography>
              <AppCountLabel
                value={shows.length}
                sx={{ backgroundColor: COLORS.bg_front, color: COLORS.dim }}
              />
            </Stack>
            <ShowGrid shows={shows} onClick={onClick} />
            <Box paddingBottom={5} />
          </Box>
        );
      })}
    </Box>
  );
}
