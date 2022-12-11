import React from "react";
import { KidProps } from "../../../@types";
import AppTheme from "../apptheme/AppTheme";
import { ConfirmProvider } from "material-ui-confirm";

export default function AppProvider({ children }: KidProps) {
  return (
    <AppTheme>
      <ConfirmProvider>{children}</ConfirmProvider>
    </AppTheme>
  );
}
