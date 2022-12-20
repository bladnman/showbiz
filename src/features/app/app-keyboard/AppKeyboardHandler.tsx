import useMegaStore from "@/store/MegaStore";
import React from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { selectShows } from "@utils/itemUtils";
import useBodyShows from "@hooks/useBodyShows";

export default function AppKeyboardHandler() {
  const isSelectMode = useMegaStore((state) => state.isSelectMode);
  const shows = useBodyShows();
  return (
    // BODY SELECT ALL
    <KeyboardEventHandler
      handleKeys={["control+a"]}
      onKeyEvent={() => {
        if (isSelectMode) {
          selectShows(shows);
        }
      }}
    />
  );
}
