import React from "react";
import { ShowPropOpt } from "@types";
import DetailsTwoPanelLayout from "./layouts/DetailsTwoPanelLayout";

export default function DetailsView({ show }: ShowPropOpt) {
  return <DetailsTwoPanelLayout show={show} />;
}
