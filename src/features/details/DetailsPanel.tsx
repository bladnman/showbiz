import React from "react";
import { ShowPropOpt } from "@types";
import DetailsTwoPanelLayout from "./layouts/DetailsTwoPanelLayout";

export default function DetailsPanel({ show }: ShowPropOpt) {
  return <DetailsTwoPanelLayout show={show} />;
}
