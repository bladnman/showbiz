import { Box } from "@mui/material";
import React from "react";

export type AppSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
  link?: string;
  target?: string;
};
export default function AppSvgIcon(
  props: {
    // eslint-disable-line
    Icon: any;
  } & AppSvgIconProps
) {
  const { Icon, ...otherProps } = props;
  return (
    <Box
      onClick={() => openLink(props.link, props.target)}
      sx={{
        cursor: props.link ? "pointer" : "default",
      }}
      display="flex"
      alignItems={"center"}
    >
      <Icon {...otherProps} />
    </Box>
  );
}

function openLink(url?: string, target?: string) {
  if (!url) return;

  const link = document.createElement("a");
  link.href = url;
  link.target = target ?? "_blank";
  link.click();
}
