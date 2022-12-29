import React, { MouseEvent } from "react";
import { Badge, Box, Typography } from "@mui/material";
import NotFoundTile from "@components/NotFoundTile";
import { CustomDataItem, ShowbizItem, ShowGroup } from "@types";
import ShowGrid from "@components/ShowGrid";
import useBodyGroupByDef from "@features/app/app-body/parts/group-grid/hooks/useBodyGroupByDef";
import AppCountLabel from "@components/AppCountLabel";
import Shim from "@components/Shim";
import { Stack } from "@mui/system";
import { COLORS } from "@/features/app/app-theme/theme_const";

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
