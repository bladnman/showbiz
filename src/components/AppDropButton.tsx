import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { COLORS } from "@features/app/app-theme/theme_const";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type AppDropButtonProps = ButtonProps & {
  isOpen?: boolean;
};
export default function AppDropButton(props: AppDropButtonProps) {
  const { isOpen = false, children, ...otherProps } = props;
  const backgroundColor = isOpen ? COLORS.primary : "rgba(0,0,0,1)";
  const color = isOpen ? COLORS.bright : "rgba(255,255,255,0.6)";
  return (
    <Button
      size="small"
      variant="contained"
      sx={{
        color: color,
        backgroundColor: backgroundColor,
      }}
      endIcon={isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      {...otherProps}
    >
      {children}
    </Button>
  );
}
