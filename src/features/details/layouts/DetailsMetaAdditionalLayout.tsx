import React from "react";
import { Stack } from "@mui/system";
import DetailsLinkToSites from "@features/details/parts/details-displayables/DetailsLinkToSites";
import DetailsLanguages from "@features/details/parts/details-displayables/DetailsLanguages";
import DetailsOptionalStreamers from "@features/details/parts/details-interactables/DetailsOptionalStreamers";
import { ShowPropOpt } from "@types";

export default function DetailsMetaAdditionalLayout({ show }: ShowPropOpt) {
  if (!show) return null;
  return (
    <Stack direction={"row"} component={"div"} justifyContent={"space-between"}>
      <DetailsLinkToSites show={show} />
      {show.originalLanguage !== "en" && <DetailsLanguages show={show} />}
      <DetailsOptionalStreamers show={show} />
    </Stack>
  );
}
