import {createTheme} from "@mui/material/styles";
import React from "react";
import {BREAKPOINTS, COLORS_DARK} from "./theme_const";

// DECLARE STYLES
// add extras to the `styles` module
declare module "@mui/material/styles" {
  interface PaletteOptions {
    select?: PaletteOptions["primary"];
  }
  interface TypographyVariants {
    red: React.CSSProperties;
  }
}

// DECLARE ANY TYPOGRAPHY CHANGES
// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    red: true;
  }
}

let theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: COLORS_DARK.bg_back,
    }
  },
  breakpoints: {
    values: BREAKPOINTS
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: COLORS_DARK.bg_front,
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: COLORS_DARK.bg_front,
        },
        root: {
          backgroundColor: COLORS_DARK.bg_front,
        }
      }
    }
  },
});
//
// TYPOGRAPHY LATER
theme = createTheme(theme, {
  typography: {
    red: {
      color: "red", // held as an example until a real one is added
    },
  },
});

export default theme;