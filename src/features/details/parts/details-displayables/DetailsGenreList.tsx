import React from "react";
import { Box } from "@mui/material";
import { ShowPropOpt, SxPropOpt } from "@types";
import DetailsImageText from "../DetailsImageText";
import { IMAGE_TEXT_SHADOW } from "@CONST";

export default function DetailsGenreList({
  show,
  sx,
}: ShowPropOpt & SxPropOpt) {
  if (!show || !show?.genres || show?.genres?.length < 1) return null;
  return (
    <Box sx={{ ...sx }}>
      {show.genres.map((genre) => (
        <GenreItem text={genre.name} key={genre.name} />
      ))}
    </Box>
  );
}

function GenreItem({ text }: { text: string }) {
  return (
    <DetailsImageText
      sx={{
        paddingRight: 3,
        textShadow: IMAGE_TEXT_SHADOW,
      }}
      text={text}
    />
  );
}
