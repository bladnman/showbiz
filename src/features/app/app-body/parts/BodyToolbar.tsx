import React from "react";
import { Box, Stack } from "@mui/material";
import { SxPropOpt } from "@types";
import GroupByTool from "./GroupByTool";
import { GLASS_BACKDROP_FILTER } from "@CONST";
import SelectionTools from "@features/app/app-body/parts/selection-tools/SelectionTools";

export default function BodyToolbar({ sx }: SxPropOpt) {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Box
      position="sticky"
      flexGrow={1}
      sx={{
        top: "55px",
        zIndex: 100,
        // either glass
        backgroundColor: "transparent",
        backdropFilter: GLASS_BACKDROP_FILTER,
        // or faux-glass
        // backgroundColor: "rgba(255,255,255,0.1)",
      }}
    >
      <Stack
        sx={{ ...sx }}
        direction={"row"}
        gap={3}
        alignItems={"center"}
        paddingX={3}
        paddingY={1.5}
        // justifyContent={"space-between"}
        justifyContent={"flex-end"}
      >
        {/*<GroupByTool />*/}
        <SelectionTools />
      </Stack>
    </Box>
  );
}
