import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";

export default function useBreakSize() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));
  const isXxl = useMediaQuery(theme.breakpoints.only("xxl"));
  const isMega = useMediaQuery(theme.breakpoints.only("mega"));

  const isGtXs = isSm || isMd || isLg || isXl || isXxl || isMega;
  const isGtSm = isMd || isLg || isXl || isXxl || isMega;
  const isGtMd = isLg || isXl || isXxl || isMega;
  const isGtLg = isLg || isXl || isXxl || isMega;
  const isGtXl = isXxl || isMega;

  const isLtMega = isXs || isSm || isMd || isLg || isXl || isXxl;
  const isLtXxl = isXs || isSm || isMd || isLg || isXl;
  const isLtXl = isXs || isSm || isMd || isLg;
  const isLtLg = isXs || isSm || isMd;
  const isLtMd = isXs || isSm;
  const isLtSm = isXs;

  return useMemo(() => {
    return {
      isXs,
      isSm,
      isMd,
      isLg,
      isXl,
      isXxl,
      isMega,

      isGtXs,
      isGtSm,
      isGtMd,
      isGtLg,
      isGtXl,

      isLtMega,
      isLtXxl,
      isLtXl,
      isLtLg,
      isLtMd,
      isLtSm,
    };
  }, [
    isGtLg,
    isGtMd,
    isGtSm,
    isGtXl,
    isGtXs,
    isLg,
    isLtLg,
    isLtMd,
    isLtMega,
    isLtSm,
    isLtXl,
    isLtXxl,
    isMd,
    isMega,
    isSm,
    isXl,
    isXs,
    isXxl,
  ]);
}
