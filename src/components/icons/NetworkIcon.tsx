import React from "react";
import useMegaStore from "@store/MegaStore";
import { Box, Stack } from "@mui/material";
import { COLORS } from "@/features/app/app-theme/theme_const";

export default function NetworkIcon({
  logoPath,
  name,
  width = "50px",
}: {
  logoPath?: string;
  name?: string;
  width?: string;
}) {
  if (!logoPath) return null;
  if (logoPath.indexOf("http") < 0) {
    const tmdb = useMegaStore.getState().tmdb;
    logoPath = `${tmdb.baseImageUrl}${logoPath}`;
  }
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{
        backgroundColor: COLORS.bright,
        width: width,
        height: width,
        padding: 0.5,
      }}
      title={name}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `url('${logoPath}')`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
    </Box>
  );
}
