import darkTheme from "./darkTheme";
import {ThemeProvider} from "@mui/material";
import React from "react";

type ThemeProps = {
  children?: React.ReactNode;
};
export default function AppTheme(props: ThemeProps) {
  return <ThemeProvider theme={darkTheme}>{props.children}</ThemeProvider>;
}
