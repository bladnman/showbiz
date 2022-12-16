import React from "react";
import { ShowPropOpt } from "@types";
import { Stack } from "@mui/system";
import DetailsNetworks from "./parts/details-displayables/DetailsNetworks";
import DetailsLanguages from "@features/details/parts/details-displayables/DetailsLanguages";
import DetailsStreamers from "./parts/details-displayables/DetailsStreamers";

export default function DetailsExtras({ show }: ShowPropOpt) {
  return (
    <Stack direction={"column"} component={"div"} className={"detailsExtras"}>
      <Stack
        direction={"row"}
        spacing={5}
        component={"div"}
        alignItems={"center"}
      >
        <DetailsNetworks show={show} />
      </Stack>
    </Stack>
  );
}
