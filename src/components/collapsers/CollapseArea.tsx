import React from "react";
import { Box, Collapse } from "@mui/material";

type CollapseAreaProps = {
  commonChildren?: React.ReactNode;
  collapsedChildren?: React.ReactNode;
  expandedChildren?: React.ReactNode;
  expanded: boolean;
};
export default function CollapseArea(props: CollapseAreaProps) {
  return (
    <Box>
      {props.commonChildren}
      {!props.expanded && <Box>{props.collapsedChildren}</Box>}
      <Collapse in={props.expanded} timeout="auto" unmountOnExit>
        {props.expandedChildren}
      </Collapse>
    </Box>
  );
}
