import { ShowPropOpt } from "@types";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { COLORS } from "@features/app/app-theme/theme_const";

export default function DetailsWatchStateMultiButton({
  show = null,
}: ShowPropOpt) {
  const [currentState, setCurrentState] = useState("new");
  const states = ["new", "active", "done"];
  return (
    <ButtonGroup sx={{ flexGrow: 1 }}>
      {states.map((state) => {
        return (
          <Button
            variant={"text"}
            key={state}
            sx={{
              color: state === currentState ? COLORS.callout : "primary",
            }}
            onClick={() => setCurrentState(state)}
          >
            {state}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
