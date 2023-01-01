import React from "react";
import { IconButton } from "@mui/material";
import toggleDrawer from "@app-utils/toggleDrawer";
import { SideBarIcon } from "@/images/AppIcons";

export default function SideBarButton() {
  return (
    <IconButton onClick={() => toggleDrawer()}>
      <SideBarIcon size={20} opacity={0.6} />
    </IconButton>
  );
}
