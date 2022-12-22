import { ShowPropOpt } from "@types";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { COLORS } from "@features/app/app-theme/theme_const";
import WATCH_STATUS_VALUES from "@watch-status-utils/const";

export default function DetailsWatchStateMultiButton({
  show = null,
}: ShowPropOpt) {
  const [currentState, setCurrentState] = useState("no status");
  return (
    <ButtonGroup sx={{ flexGrow: 1 }}>
      {WATCH_STATUS_VALUES.map((state) => {
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
