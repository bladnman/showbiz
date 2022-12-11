import React from "react";
import { DialogContent } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import { ShowPropOpt } from "../../@types";
import BoxAbsolute from "../../components/box/BoxAbsolute";
import BoxRelative from "../../components/box/BoxRelative";
import { useWindowSize } from "../../hooks/useWindowSize";
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
import DetailsBoxOffice from "./components/DetailsBoxOffice";
import DetailsCtaGroup from "./components/details-cta-group/DetailsCtaGroup";

export default function DetailsView({ show }: ShowPropOpt) {
  const windowSize = useWindowSize();
  const backdropHeight = windowSize.height * 0.9 * 0.6;

  return (
    <BoxRelative
      height={"100%"}
      className={"details-area"}
      onClick={() => console.log(show)}
    >
      {/* HEADER IMAGE
        ---------------------------- */}
      <BoxAbsolute className={"details-image-bg"} height={backdropHeight}>
        <DetailsBackdropImage show={show} />
      </BoxAbsolute>

      {/* contents
        ---------------------------- */}
      <BoxRelative className={"details-contents"}>
        <DialogContent sx={{ paddingTop: `${backdropHeight * 0.3}px` }}>
          <Stack
            display="flex"
            direction={"row"}
            className="details-data-table"
          >
            {/* left-side */}
            {/* POSTER TILE
              ---------------------------- */}
            <Box paddingX={2} display="flex" flexDirection={"column"}>
              <Box height={"6em"}>
                <DetailsRatingDisplay show={show} />
              </Box>
              <DetailsPosterTile show={show} width={200} />
              <Box height={"3em"} flexShrink={0} flexGrow={0} display="flex">
                <DetailsCtaGroup show={show} />
              </Box>
            </Box>

            {/* right-side */}
            {/* META DATA
              ---------------------------- */}
            <Stack direction={"column"} flexGrow={1}>
              <Stack
                direction={"column"}
                flexShrink={0}
                flexGrow={1}
                paddingRight={10}
              >
                {/* right-top-area
                  ---------------------------- */}
                <Box
                  // height={`${backdropHeight}px`}
                  display="flex"
                  flexDirection={"column"}
                  flexShrink={0}
                  sx={{
                    width: "100%",
                    paddingTop: `${backdropHeight * 0.35}px`,
                  }}
                >
                  {/* TOP META-DATA
                    ---------------------------- */}
                  <Stack
                    direction={"column"}
                    marginBottom={1}
                    padding={3}
                    sx={{
                      backdropFilter: "blur(2px) brightness(60%)",
                    }}
                  >
                    <Stack direction={"row"} spacing={5}>
                      <DetailsYearTag show={show} />
                      <DetailsSeasonEpisodeCount show={show} />
                    </Stack>
                    <DetailsShowTitle
                      show={show}
                      sx={{
                        marginTop: 1,
                        marginBottom: 0,
                        backdropFilter: "blur(10px) brightness(80%)",
                      }}
                    />
                    <Stack
                      direction={"row"}
                      spacing={5}
                      height={"1.5em"}
                      flexShrink={0}
                    >
                      <DetailsGenreList show={show} />
                      <DetailsDuration show={show} />
                      <DetailsBoxOffice show={show} />
                    </Stack>
                    <DetailsDescriptionText show={show} />
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
      </BoxRelative>
    </BoxRelative>
  );
}
