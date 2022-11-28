import { Box, Typography } from "@mui/material";
import { ShowPropOpt, SxPropOpt } from "../../../@types";
import DetailsImageText from "./DetailsImageText";

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
        textShadow:
          "2px 2px 0px rgba(0,0,0,0.55), 7px 6px 0px rgba(0,0,0,0.15)",
      }}
      text={text}
    />
  );
}
