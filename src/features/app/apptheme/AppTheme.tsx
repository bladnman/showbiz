import darkTheme from "./darkTheme";
import { ThemeProvider } from "@mui/material";
import React from "react";
import { KidProps } from "../../../@types";

export default function AppTheme(props: KidProps) {
  return <ThemeProvider theme={darkTheme}>{props.children}</ThemeProvider>;
}
