import React from "react";
import { FilterDef, KidProps } from "@types";
import { bindContextMenu, usePopupState } from "material-ui-popup-state/hooks";
import { Box, Typography } from "@mui/material";
import CollapsableSection from "@components/collapsers/CollapsableSection";
import { COLORS } from "@features/app/app-theme/theme_const";
import SectionOptionsMenu from "./SectionOptionsMenu";

type DrawerSectionProps = {
  filter: FilterDef;
  sectionTitle: string | null;
} & KidProps;
export default function DrawerCollapsableSection(props: DrawerSectionProps) {
  const { onDeselectAll, selectedValues, defaultExpanded } = props.filter;
  const popupState = usePopupState({
    variant: "popover",
    popupId: "drawer-section-options",
  });
  const isRightClickMenuShowing = popupState.isOpen;
  const hasSelectedValues = selectedValues.size > 0;
  return (
    <Box
      sx={{
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.03)",
        },
      }}
    >
      <CollapsableSection
        defaultExpanded={Boolean(defaultExpanded)}
        arrowAlign={"right"}
        headerSx={{
          backgroundColor: isRightClickMenuShowing
            ? "rgba(0,0,0,0.4)"
            : "transparent",
        }}
        headerChildren={
          <Box flexGrow={1} {...bindContextMenu(popupState)}>
            <Typography
              color={hasSelectedValues ? COLORS.bright : COLORS.dim}
              sx={{ fontWeight: hasSelectedValues ? "bold" : "normal" }}
            >
              {props.sectionTitle}
            </Typography>
          </Box>
        }
        expandedChildren={props.children}
      />
      <SectionOptionsMenu
        popupState={popupState}
        onDeselectAll={onDeselectAll}
      />
    </Box>
  );
}
