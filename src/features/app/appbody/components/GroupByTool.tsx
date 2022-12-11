import React from "react";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { SxPropOpt } from "../../../../@types";
import { setBodyGroupBy } from "../../../../utils/appUtils";
import useMegaStore from "../../../../store/MegaStore";
import CircleIcon from "@mui/icons-material/Circle";
import { COLORS } from "../../apptheme/theme_const";

export default function GroupByTool({ sx }: SxPropOpt) {
  const bodyGroupBy = useMegaStore((state) => state.bodyGroupBy);

  const groups = ["Collection", "Genre", "Clear"];

  return (
    <Stack sx={{ ...sx }} direction={"row"} gap={1} alignItems={"center"}>
      <Typography>Group by</Typography>

      <ButtonGroup variant="text">
        {groups.map((group) => (
          <Button
            key={group}
            onClick={() => setBodyGroupBy(group)}
            startIcon={
              group === bodyGroupBy ? (
                <CircleIcon sx={{ color: COLORS.callout }} />
              ) : null
            }
          >
            {group}
          </Button>
        ))}
      </ButtonGroup>
    </Stack>
  );
}
