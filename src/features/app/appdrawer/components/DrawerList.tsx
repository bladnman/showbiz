import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { mdiCircleSmall } from "@mdi/js";
import MdiIcon from "@mdi/react";
import { COLORS } from "../../apptheme/theme_const";
import { Filter } from "../../../../@types";

type DrawerListData = {
  filter: Filter;
};
export default function DrawerList({ filter }: { filter: Filter }) {
  const { items, onClick, filters, title } = filter;
  const isInFilter = (value: string) => {
    if (!value || !filters || !title) return false;
    return filters.has(value);
  };
  return (
    <Stack>
      <Box paddingTop={3} paddingBottom={1}>
        <Typography variant={"h6"}>{title}</Typography>
      </Box>
      {items.map((item, idx) => (
        <Button
          style={{ justifyContent: "flex-start" }}
          onClick={() => onClick && onClick(item)}
          key={`${item}_${idx}`}
          size={"small"}
          startIcon={
            isInFilter(item) ? (
              <MdiIcon path={mdiCircleSmall} size={1} color={COLORS.callout} />
            ) : null
            // isInFilter(item) ? <CircleIcon color={"secondary"} /> : null
          }
        >
          <Typography>{item}</Typography>
        </Button>
      ))}
    </Stack>
  );
}
