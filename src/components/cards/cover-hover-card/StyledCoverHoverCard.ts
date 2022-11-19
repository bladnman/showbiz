import Card from "@mui/material/Card";
import { styled } from "@mui/system";

const panelShowAniMs = 200;
const panelHideAniMs = 100;
const StyledCard = styled(Card)(() => {
  return {
    borderRadius: "15px",
    ".meta-panel": {
      backgroundColor: "#00000000",
      transition: `background ${panelHideAniMs}ms ease-in-out`,
    },
    ".meta-text": {
      height: 0,
      overflow: "hidden",
      transition: `height ${panelHideAniMs}ms ease-in-out`,
    },
    ".year": {
      color: "#c0c0c0",
    },
    ".rating-box": {
      opacity: 0.7,
    },
    ":hover": {
      ".meta-panel": {
        transition: `background ${panelShowAniMs}ms ease-in-out`,
        backgroundColor: "#000000aa",
      },
      ".meta-text": {
        height: "12.6em",
        transition: `height ${panelShowAniMs}ms ease-in-out`,
      },
      ".year": {
        color: "#ffffff",
      },
      ".rating-box": {
        opacity: 1.0,
      },
    },
  };
});

export default StyledCard;
