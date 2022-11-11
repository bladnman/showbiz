import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

// DECLARE STYLES
// add extras to the `styles` module
declare module "@mui/material/styles" {
  interface PaletteOptions {
    select?: PaletteOptions["primary"];
  }
  interface TypographyVariants {
    lineNumber?: React.CSSProperties;
    fieldCaption?: React.CSSProperties;
    appHeading?: React.CSSProperties;
  }
}

// DECLARE ANY TYPOGRAPHY CHANGES
// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    lineNumber: true;
    fieldCaption: true;
    appHeading: true;
  }
}

const COLORS = {
  bugGreen: "#d5ff2b",
  bugGreenDark: "#9ec012",

  red: "#DB1F48",
  ivory: "#E9EAE0",
  ivoryDeep: "#4e4e4b",
  fuchsia: "#FF0078",

  toInvestigate: {
    coffee: "#836f47",
    darkTeal: "#31404f",
    darkForest: "#474440",
    deepPurple: "#3f304a",
    mutedPink: "#9e4b74",
  },
  hereAtHome: {
    blueGray: "#647C90",
    ivory: "#E2DED0",
    coolGray: "#4E4F50",
    gray: "#746C70",
  },
  bonfireGlow: {
    red: "#970C10",
    slate: "#BFCAD0",
    coolGray: "#474440", // +1
    gunmetalGray: "#738580",
    redOrange: "#B8390E",
  },
};

// BASIC THEME
let theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      // main: COLORS.ivoryDeep,
      main: "#ba723e",
    },
    secondary: {
      main: COLORS.bugGreenDark,
    },
    warning: {
      main: COLORS.fuchsia,
    },
    // background: {
    //   paper: COLORS.ivory,
    // },
    error: {
      main: COLORS.red,
    },
  },
});

//
// EXTENSIONS -- oddly must always be added after
// the default theme values
theme = createTheme(theme, {
  palette: {
    select: "#d5d6d5",
    // perfFast: "#8bc34a",
    perfFast: {
      main: "#388e3c",
    },
    perfMedium: {
      main: "#ff9100",
    },
    perfSlow: {
      main: "#ff1744",
    },
  },
  typography: {
    lineNumber: {
      fontSize: 10,
      opacity: 0.6,
    },
    fieldCaption: {
      fontSize: 11,
      opacity: 0.6,
    },
    appHeading: {
      fontSize: 32,
      fontFamily: ["Lobster", "serif"].join(","),
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

type ThemeProps = {
  children?: React.ReactNode;
};
export default function Theme(props: ThemeProps) {
  return <ThemeProvider theme={darkTheme}>{props.children}</ThemeProvider>;
}
