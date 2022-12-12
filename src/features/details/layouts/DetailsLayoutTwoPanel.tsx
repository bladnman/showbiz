import { useWindowSize } from "../../../hooks/useWindowSize";
import BoxRelative from "../../../components/box/BoxRelative";
import BoxAbsolute from "../../../components/box/BoxAbsolute";
import DetailsBackdropImage from "../components/DetailsBackdropImage";
import { Stack } from "@mui/system";
import Box from "@mui/material/Box";
import React from "react";
import { ShowPropOpt } from "../../../@types";
import DetailsLayoutMeta from "./DetailsLayoutMeta";
import DetailsLayoutPoster from "./DetailsLayoutPoster";

export default function DetailsLayoutTwoPanel({ show }: ShowPropOpt) {
  const windowSize = useWindowSize();
  const backdropHeight = windowSize.height * 0.6;

  return (
    <BoxRelative
      height={"100%"}
      className={"detail-templates-area"}
      onClick={() => console.log(show)}
    >
      {/* HEADER IMAGE
        ---------------------------- */}
      <BoxAbsolute
        className={"detail-templates-image-bg"}
        height={backdropHeight}
        sx={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <DetailsBackdropImage show={show} />
      </BoxAbsolute>

      {/* contents
        ---------------------------- */}
      <BoxRelative
        className={"detail-templates-meta"}
        height={backdropHeight}
        display="flex"
        direction={"row"}
        alignItems={"end"}
      >
        <Stack
          display="flex"
          direction={"row"}
          alignItems={"flex-end"}
          className="details-template-data-table"
        >
          {/* left-side
              ---------------------------- */}
          <Box
            paddingX={2}
            paddingBottom={3}
            display="flex"
            flexDirection={"column"}
          >
            <DetailsLayoutPoster show={show} />
          </Box>

          {/* right-side
              ---------------------------- */}
          <Stack
            className={"details-template-right-panel"}
            direction={"column"}
          >
            <Box
              className={"details-template-meta-area"}
              padding={3}
              sx={{
                backdropFilter: "blur(2px) brightness(60%)",
              }}
            >
              <DetailsLayoutMeta show={show} />
            </Box>
          </Stack>
        </Stack>
      </BoxRelative>
    </BoxRelative>
  );
}
