import Card from "@mui/material/Card";
import { styled } from "@mui/system";

const panelShowAniMs = 200;
const panelHideAniMs = 100;
const StyledCard = styled(Card)(() => {
  return {
    ".meta-panel": {
      backgroundColor: "#00000044",
      transition: `background ${panelHideAniMs}ms ease-in-out`,
    },
    ".description": {
      height: 0,
      overflow: "hidden",
      transition: `height ${panelHideAniMs}ms ease-in-out`,
    },
    ":hover": {
      ".meta-panel": {
        transition: `background ${panelShowAniMs}ms ease-in-out`,
        backgroundColor: "#000000aa",
      },
      ".description": {
        height: "4.6em",
        transition: `height ${panelShowAniMs}ms ease-in-out`,
      },
    },
  };
});

export default StyledCard;
