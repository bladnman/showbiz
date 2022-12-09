import { Box, Button, Stack, Typography } from "@mui/material";
import useCollectionTools from "../../../../hooks/useCollectionTools";
import CircleIcon from "@mui/icons-material/Circle";
import { mdiCircleSmall, mdiTagMultiple as TagIcon } from "@mdi/js";
import MdiIcon from "@mdi/react";
import React from "react";
import { COLORS } from "../../apptheme/theme_const";

type Props = {
  items: string[];
  title?: string;
  onClick?: (item: string, title?: string) => void;
  filters?: Set<string>;
};
export default function DrawerList({ items, title, onClick, filters }: Props) {
  const isInFilter = (value: string) => {
    return false;
    // if (!value || !filters || !title) return false;
    // return filters.has(`${title}_${value}`);
  };
  return (
    <Stack>
      <Box paddingTop={3} paddingBottom={1}>
        <Typography variant={"h6"}>{title}</Typography>
      </Box>
      {items.map((item, idx) => (
        <Button
          style={{ justifyContent: "flex-start" }}
          onClick={() => onClick && onClick(item, title)}
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
