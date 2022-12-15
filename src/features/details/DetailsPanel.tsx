import React from "react";
import { ShowPropOpt } from "@types";
import useBreakSize from "@utils/useBreakSize";
import DetailsTwoPanelLayout from "./layouts/DetailsTwoPanelLayout";
import DetailsOnePanelLayout from "./layouts/DetailsOnePanelLayout";
import DetailsOneLongPanelLayout from "./layouts/DetailsOneLongPanelLayout";

export default function DetailsPanel({ show }: ShowPropOpt) {
  const { isXs } = useBreakSize();
  return (
    <>
      {isXs ? (
        // <DetailsOnePanelLayout show={show} />
        <DetailsOneLongPanelLayout show={show} />
      ) : (
        <DetailsTwoPanelLayout show={show} />
      )}
    </>
  );
}
