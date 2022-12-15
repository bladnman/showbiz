import React from "react";
import { ShowPropOpt, SxPropOpt } from "@types";
import Tag from "@components/text/Tag";
import { getYearSpanDisplay } from "@services/TMDB/utils/yearUtils";
import { Stack } from "@mui/material";
import NetworkIcon from "@components/icons/NetworkIcon";

export default function DetailsNetworks({ show, sx }: ShowPropOpt & SxPropOpt) {
  if (!show?.networks) return null;
  return (
    <Stack
      direction={"row"}
      component={"div"}
      spacing={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {show.networks.map((networkData) => (
        <NetworkIcon
          key={networkData.id}
          logoPath={networkData.logoPath}
          name={networkData.name}
        />
      ))}
    </Stack>
  );
}
