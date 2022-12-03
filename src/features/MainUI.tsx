import AppBody from "./app/appbody/AppBody";
import AppDialogs from "./app/appdialogs/AppDialogs";
import AppDrawer from "./app/appdrawer/AppDrawer";
import AppSnackShop from "./app/appsnacks/AppSnackShop";
import AppToolbar from "./app/apptoolbar/AppToolbar";
import { Box } from "@mui/material";

export default function MainUI() {
  return (
    <>
      <AppSnackShop />
      <Box sx={{ display: "flex" }}>
        <AppToolbar />
        <AppDrawer />
        <AppBody />
      </Box>
      <AppDialogs />
    </>
  );
}
