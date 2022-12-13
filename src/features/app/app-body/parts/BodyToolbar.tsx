import React from "react";
import { Stack } from "@mui/material";
import { SxPropOpt } from "@types";
import GroupByTool from "./GroupByTool";

export default function BodyToolbar({ sx }: SxPropOpt) {
  return (
    <Stack sx={{ ...sx }} direction={"row"} gap={3} alignItems={"center"}>
      <GroupByTool sx={{ marginBottom: "1em" }} />
    </Stack>
  );
}
