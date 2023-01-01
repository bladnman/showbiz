import React, { useEffect } from "react";
import AppBody from "@features/app/app-body/AppBody";
import AppDialogs from "@features/app/app-dialogs/AppDialogs";
import AppDrawer from "@features/app/app-drawer/AppDrawer";
import AppSnackShop from "@features/app/app-snacks/AppSnackShop";
import AppToolbar from "@features/app/app-toolbar/AppToolbar";
import { Box } from "@mui/material";
import AppKeyboardHandler from "@features/app/app-keyboard/AppKeyboardHandler";
import checkForCustomDataDuplicates from "@custom-data-utils/checkForCustomDataDuplicates";
import useDrawerModeManager from "@hooks/useDrawerModeManager";

export default function MainUI() {
  useDrawerModeManager(); // manage drawer mode
  useEffect(() => {
    checkForCustomDataDuplicates();
    // removeAllDupes().then(() => {
    //   console.log("done");
    // });
  }, []);
  return (
    <Box width={"100%"} height={"100%"}>
      <AppSnackShop />
      <Box
        className={"MAIN-UI"}
        sx={{ display: "flex", width: "100%", height: "100%" }}
      >
        <AppToolbar />
        <AppDrawer />
        <AppBody />
      </Box>
      <AppDialogs />
      <AppKeyboardHandler />
    </Box>
  );
}
