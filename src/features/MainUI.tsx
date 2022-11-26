import { ConfirmProvider } from "material-ui-confirm";
import AppBody from "./appbody/AppBody";
import AppDialogs from "./appdialogs/AppDialogs";
import AppDrawer from "./appdrawer/AppDrawer";
import AppSnackShop from "./appsnacks/AppSnackShop";
import AppToolbar from "./apptoolbar/AppToolbar";
import AppTheme from "./apptheme/AppTheme";

export default function MainUI() {
  return (
    <AppTheme>
      <ConfirmProvider>
        <AppSnackShop />
        <AppToolbar />
        <AppDrawer />
        <AppBody />
        <AppDialogs />
      </ConfirmProvider>
    </AppTheme>
  );
}
