import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import BoxAbsolute from "../../components/box/BoxAbsolute";
import BoxRelative from "../../components/box/BoxRelative";
import { useMovie } from "../../services/TMDB/hooks/useApi";
import DetailsBackdropImage from "./components/DetailsBackdropImage";
import DetailsPosterTile from "./components/DetailsPosterTile";
import DetailsSearchField from "./components/DetailsSearchField";

export default function DetailsView() {
  const [show] = useMovie(278927);

  return (
    <Box sx={{ position: "relative", height: "60vh" }}>
      {/* HEADER IMAGE */}
      <BoxAbsolute
        sx={{
          height: "60%",
        }}
      >
        <DetailsBackdropImage show={show} />
      </BoxAbsolute>

      <BoxRelative height={"100%"}>
        <Stack
          height={"100%"}
          direction={"column"}
          justifyContent="space-between"
        >
          {/* SEARCH */}
          <BoxRelative>
            <Box flexDirection={"row"} justifyContent="center" display="flex">
              <DetailsSearchField marginTop={1} maxWidth={350} width={350} />
            </Box>
          </BoxRelative>

          {/* BOTTOM DETAILS */}
          <Stack direction={"row"}>
            {/* POSTER TILE */}
            <Box
              paddingX={3}
              display="flex"
              flexDirection={"column"}
              alignItems="center"
            >
              <DetailsPosterTile show={show} />
              <Button>Add</Button>
            </Box>
            {/* META DATA */}
            <Stack
              height={"100%"}
              direction={"column"}
              justifyContent="space-between"
            ></Stack>
          </Stack>
        </Stack>
      </BoxRelative>
    </Box>
  );
}
