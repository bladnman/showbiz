import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { SelectablePosterTileProps } from "../poster-tile-types";
import useShowCustomData from "@hooks/useShowCustomData";
import getShowHoldUntilDateDesc from "@watch-status-utils/getShowHoldUntilDateDesc";
import useShowTools from "@hooks/useShowTools";

export default function HoldPosterTileFg(props: SelectablePosterTileProps) {
  const { show } = props;
  // const { customDataList } = useShowTools();
  const customData = useShowCustomData(show);
  const holdLabel = useMemo(() => {
    if (customData?.watchStatus.toLowerCase() !== "hold") return null;
    const holdUntilLabel = getShowHoldUntilDateDesc(customData);
    return holdUntilLabel ? `${holdUntilLabel}` : "Hold";
  }, [customData]);

  if (!holdLabel) return null;
  return (
    <Box
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        sx={{
          backgroundColor: "rgba(79,106,38,0.8)",
          padding: 2,
          marginTop: 8,
        }}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {holdLabel}
      </Box>
    </Box>
  );
}
