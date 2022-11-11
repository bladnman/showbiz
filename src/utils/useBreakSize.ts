import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function useBreakSize() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const isGtXs = isSm || isMd || isLg || isXl;
  const isGtSm = isMd || isLg || isXl;
  const isGtMd = isLg || isXl;
  const isGtLg = isLg || isXl;

  const isLtXl = isXs || isSm || isMd || isLg;
  const isLtLg = isXs || isSm || isMd;
  const isLtMd = isXs || isSm;
  const isLtSm = isXs;

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,

    isGtXs,
    isGtSm,
    isGtMd,
    isGtLg,
    isLtXl,
    isLtLg,
    isLtMd,
    isLtSm,
  };
}
