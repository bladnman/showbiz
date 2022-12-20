import React, { useEffect } from "react";
import AppBody from "@features/app/app-body/AppBody";
import AppDialogs from "@features/app/app-dialogs/AppDialogs";
import AppDrawer from "@features/app/app-drawer/AppDrawer";
import AppSnackShop from "@features/app/app-snacks/AppSnackShop";
import AppToolbar from "@features/app/app-toolbar/AppToolbar";
import { Box } from "@mui/material";
import AppKeyboardHandler from "@features/app/app-keyboard/AppKeyboardHandler";
import { checkForCustomDataDuplicates } from "@utils/customDataUtils";

export default function MainUI() {
  useEffect(() => {
    checkForCustomDataDuplicates();
    // removeAllDupes
  }, []);
  return (
    <>
      <AppSnackShop />
      <Box sx={{ display: "flex" }}>
        <AppToolbar />
        <AppDrawer />
        <AppBody />
      </Box>
      <AppDialogs />
      <AppKeyboardHandler />
    </>
  );
}
