import React from "react";
import { ShowPropOpt, SxPropOpt } from "@types";
import Tag from "@components/text/Tag";
import { getYearSpanDisplay } from "@services/TMDB/utils/yearUtils";
import { Button, Stack, Typography } from "@mui/material";
import NetworkIcon from "@components/icons/NetworkIcon";
import showSimilarShows from "@show-utils/showSimilarShows";

export default function DetailsLanguages({
  show,
  sx,
}: ShowPropOpt & SxPropOpt) {
  if (!show?.spokenLanguages) return null;
  const spoken = show.spokenLanguages.map((lang) => lang.englishName);

  return (
    <Stack direction={"row"} component={"div"}>
      <Typography>{spoken.join(", ")}</Typography>
    </Stack>
  );
}
