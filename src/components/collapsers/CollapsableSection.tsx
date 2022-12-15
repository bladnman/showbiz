import React, { useEffect } from "react";
import CollapseArea from "@components/collapsers/CollapseArea";
import { IconButton, IconButtonProps, Stack, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isNoU } from "@/utils/MU";

type CollapsableSectionProps = {
  headerChildren?: React.ReactNode;
  collapsedChildren?: React.ReactNode;
  expandedChildren?: React.ReactNode;
  defaultExpanded: boolean;
  forceExpandValue?: boolean;
  arrowAlign?: "left" | "right";
  headerSx?: object;
  enabled?: boolean; // can be toggled
};
export default function CollapsableSection(props: CollapsableSectionProps) {
  const arrowAlign = props.arrowAlign ?? "left";
  const isLeftAligned = arrowAlign === "left";
  const isBeingForced = !isNoU(props.forceExpandValue);

  const [expanded, setExpanded] = React.useState(
    isBeingForced
      ? Boolean(props.forceExpandValue)
      : Boolean(props.defaultExpanded)
  );
  const handleExpandClick = () => {
    if (isBeingForced || props.enabled === false) return;
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (isBeingForced) {
      setExpanded(Boolean(props.forceExpandValue));
    }
  }, [props.forceExpandValue]);
  return (
    <CollapseArea
      expanded={expanded}
      commonChildren={
        <Stack
          direction={isLeftAligned ? "row-reverse" : "row"}
          alignItems={"center"}
          sx={{ ...props.headerSx }}
          onClick={handleExpandClick}
        >
          {props.headerChildren}
          <ExpandMore expanded={expanded}>
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>
      }
      collapsedChildren={props.collapsedChildren}
      expandedChildren={props.expandedChildren}
    />
  );
}

interface ExpandMoreProps extends IconButtonProps {
  expanded: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expanded, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expanded }) => ({
  transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
