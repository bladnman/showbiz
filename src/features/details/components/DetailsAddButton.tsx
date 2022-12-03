import React from "react";
import Button from "@mui/material/Button";
import { ShowPropOpt } from "../../../@types";
import AddIcon from "@mui/icons-material/Add";
import { COLORS } from "../../apptheme/theme_const";

const DetailsAddButton = ({ show }: ShowPropOpt) => {
  if (!show) return null;
  return (
    <Button
      variant="contained"
      endIcon={<AddIcon />}
      sx={{ backgroundColor: COLORS.callout }}
    >
      Add
    </Button>
  );
};

export default DetailsAddButton;
