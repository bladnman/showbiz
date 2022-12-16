import { Box, Stack } from "@mui/material";
import React from "react";
import { KidProps } from "@types";

export default function IconPod(
  props: KidProps & { spacing?: number | string }
) {
  return (
    <Stack
      direction={"row"}
      component={"div"}
      spacing={props.spacing ?? 1}
      flexShrink={1}
      alignItems={"center"}
      sx={{
        padding: "5px 10px",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: "7px",
        backgroundColor: "rgba(0,0,0,0.3)",
        width: "fit-content",
        height: "fit-content",
      }}
    >
      {props.children}
    </Stack>
  );
}
