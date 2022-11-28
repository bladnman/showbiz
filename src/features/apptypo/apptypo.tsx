/**
 * Installable Font:
 * https://fontsource.org/
 */

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import "@fontsource/alegreya-sans-sc";
import "@fontsource/bowlby-one-sc";
import "@fontsource/titan-one";

export const TypoSmallCapsLight = styled(Typography)(({ theme }) => ({
  fontFamily: ["Alegreya Sans SC", "san-serif"].join(","),
  fontSize: "3.7em",
}));
export const TypoSmallCapsBlack = styled(Typography)(({ theme }) => ({
  fontFamily: ["Bowlby One SC", "san-serif"].join(","),
  fontSize: "3em",
}));
export const TypoScore = styled(Typography)(({ theme }) => ({
  fontFamily: ["Titan One", "san-serif"].join(","),
  fontSize: "5em",
}));
