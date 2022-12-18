import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { COLORS } from "@features/app/app-theme/theme_const";
import { FilterDef } from "@types";

type DrawerFilterRowProps = {
  value: string;
  filter: FilterDef;
};

export default function DrawerFilterRow({
  filter,
  value,
}: DrawerFilterRowProps) {
  const { onClick, isValueSelected } = filter;

  return (
    <Button
      style={{ justifyContent: "flex-start" }}
      onClick={() => onClick?.(value)}
      size={"small"}
    >
      <Stack
        direction={"row"}
        component={"div"}
        spacing={1.5}
        alignItems={"center"}
      >
        <CircleIcon
          sx={{
            color: COLORS.callout,
            opacity: isValueSelected(value) ? 1.0 : 0,
            fontSize: "10px",
          }}
        />
        <Typography>{value}</Typography>
      </Stack>
    </Button>
  );
}
