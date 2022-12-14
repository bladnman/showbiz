import React from "react";
import { Box } from "@mui/material";
import { ShowPropOpt, SxPropOpt } from "@types";
import { useMemo } from "react";
import { returnDecimalPlaces } from "@utils/MU";
import { TypoRevenue } from "../../../app/app-typo/apptypo";
import { styled } from "@mui/material/styles";

const StyledText = styled(TypoRevenue)(({ value = 0 }: { value?: number }) => {
  const color = value > 1.8 ? "#a6ffa6" : value > 0.5 ? "#f7eb5c" : "#ffa6a6";
  return {
    textShadow: "2px 2px 0px rgba(0,0,0,0.65)",
    fontSize: "1.2em",
    fontWeight: "bold",
    color: color,
  };
});
export default function DetailsBoxOffice({
  show,
  sx,
}: ShowPropOpt & SxPropOpt) {
  const revToBudget = useMemo(() => {
    if (!show || !show.revenue || !show.budget) return null;

    const ratio = returnDecimalPlaces(show.revenue / show.budget, 2);
    return ratio;
  }, [show]);

  if (!revToBudget) return null;
  return (
    <Box sx={{ ...sx }}>
      <StyledText value={revToBudget}>{revToBudget}</StyledText>
    </Box>
  );
}
