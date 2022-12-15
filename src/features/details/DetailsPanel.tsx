import React from "react";
import { ShowPropOpt } from "@types";
import useBreakSize from "@utils/useBreakSize";
import DetailsOnePanelLayout from "./layouts/DetailsOnePanelLayout";
import DetailsTwoPanelLayout from "./layouts/DetailsTwoPanelLayout";

export default function DetailsPanel({ show }: ShowPropOpt) {
  const { isXs } = useBreakSize();
  return (
    <>
      {isXs ? (
        <DetailsOnePanelLayout show={show} />
      ) : (
        <DetailsTwoPanelLayout show={show} />
      )}
    </>
  );
}
