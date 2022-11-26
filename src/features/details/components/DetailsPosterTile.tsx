import { Box } from "@mui/material";
import { ShowPropOpt } from "../../../@types";
import PosterTile from "../../tiles/postertile/PosterTile";

export default function DetailsPosterTile({ show }: ShowPropOpt) {
  return (
    <Box>
      <PosterTile show={show} />
    </Box>
  );
}
