import React from "react";
import { Box } from "@mui/material";
import { ShowPropOpt, SxPropOpt } from "@types";
import { useMemo } from "react";
import DetailsImageText from "./DetailsImageText";

export default function DetailsDuration({ show, sx }: ShowPropOpt & SxPropOpt) {
  const duration = useMemo(() => {
    if (!show || !show.runtime) return null;
    const h = ~~(show.runtime / 60);
    const m = show.runtime - h * 60;
    if (h == 0) {
      return `${m}m`;
    }
    return `${h}h ${m}m`;
  }, [show]);

  if (!duration) return null;
  return (
    <Box sx={{ ...sx }}>
      <DetailsImageText text={duration} />
    </Box>
  );
}
