import { DialogContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { ShowPropOpt } from "../../@types";
import BoxAbsolute from "../../components/box/BoxAbsolute";
import BoxRelative from "../../components/box/BoxRelative";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ShowbizItem } from "../../services/TMDB/utils/convertToItem";
import DetailsBackdropImage from "./components/DetailsBackdropImage";
import DetailsDescriptionText from "./components/DetailsDescriptionText";
import DetailsDuration from "./components/DetailsDuration";
import DetailsGenreList from "./components/DetailsGenreList";
import DetailsPosterTile from "./components/DetailsPosterTile";
import DetailsRatingDisplay from "./components/DetailsRatingDisplay";
import DetailsSearchField from "./components/DetailsSearchField";
import DetailsShowTitle from "./components/DetailsShowTitle";
import DetailsYearTag from "./components/DetailsYearTag";
import DetailsSeasonEpisodeCount from "./components/DetailsSeasonEpisodeCount";

export default function DetailsView({ show }: ShowPropOpt) {
  const windowSize = useWindowSize();
  const backdropHeight = windowSize.height * 0.6 * 0.6;

  return (
    <Box sx={{ position: "relative" }} onClick={() => console.log(show)}>
      {/* HEADER IMAGE */}
      <BoxAbsolute
        sx={{
          height: `${backdropHeight}px`,
        }}
      >
        <DetailsBackdropImage show={show} />
      </BoxAbsolute>

      {/* SEARCH */}
      <BoxAbsolute sx={{ zIndex: 100 }}>
        <Box flexDirection={"row"} justifyContent="center" display="flex">
          <DetailsSearchField marginTop={1} maxWidth={350} width={350} />
        </Box>
      </BoxAbsolute>

      {/* contents */}
      <BoxRelative height={"100%"}>
        <DialogContent sx={{ paddingTop: 0 }}>
          <Stack
            display="flex"
            direction={"row"}
            className="details-data-table"
          >
            {/* left-side */}
            {/* POSTER TILE */}
            <Box paddingX={2} display="flex" flexDirection={"column"}>
              <Box
                paddingTop={`${(backdropHeight * 0.8) / 2}px`}
                paddingBottom={`${(backdropHeight * 0.0) / 2}px`}
              >
                <DetailsRatingDisplay show={show} />
              </Box>
              <DetailsPosterTile show={show} width={200} />
              <Button>Add</Button>
            </Box>

            {/* right-side */}
            {/* META DATA */}
            <Stack direction={"column"} flexGrow={1}>
              <Stack
                direction={"column"}
                justifyContent="space-between"
                flexShrink={0}
                flexGrow={1}
                paddingRight={10}
              >
                {/* right-top-area */}
                <Box
                  height={`${backdropHeight}px`}
                  display="flex"
                  flexDirection={"column"}
                  justifyContent="flex-end"
                  flexShrink={0}
                  sx={{
                    width: "100%",
                  }}
                >
                  {/* TOP META-DATA */}
                  <Stack direction={"column"} marginBottom={1}>
                    <Stack direction={"row"} spacing={5}>
                      <DetailsYearTag show={show} />
                      <DetailsSeasonEpisodeCount show={show} />
                    </Stack>
                    <DetailsShowTitle
                      show={show}
                      sx={{ marginTop: 1, marginBottom: 0 }}
                    />
                    <Stack
                      direction={"row"}
                      spacing={5}
                      height={"1.5em"}
                      flexShrink={0}
                    >
                      <DetailsGenreList show={show} />
                      <DetailsDuration show={show} />
                    </Stack>
                  </Stack>
                </Box>

                {/* right-bottom-area */}
                <Box height={"8em"} paddingTop={2.5}>
                  <DetailsDescriptionText show={show} />
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
      </BoxRelative>
    </Box>
  );
}
