import React, { useState } from "react";
import { ShowPropOpt } from "@types";
import { Box, Stack, Typography } from "@mui/material";
import DetailsStreamers from "@features/details/parts/details-displayables/DetailsStreamers";
import { CloudStreamIcon } from "@/images/AppIcons";
import IconPod from "@/components/IconPod";

export default function DetailsOptionalStreamers({ show }: ShowPropOpt) {
  const [enableForId, setEnabledForId] = useState<number>();

  if (!show) return null;

  if (show.streamItems || enableForId === show.id) {
    return <DetailsStreamers show={show} />;
  }

  const size = 25;
  return (
    <IconPod>
      <Stack
        direction="row"
        component={"div"}
        alignItems={"center"}
        spacing={1}
        sx={{ cursor: "pointer" }}
        onClick={() => setEnabledForId(show.id)}
      >
        <Typography variant={"caption"} pt={0.3} sx={{ opacity: 0.5 }}>
          ◀
        </Typography>
        <CloudStreamIcon width={size} height={size} />
      </Stack>
    </IconPod>
  );
}
