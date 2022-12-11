import React from "react";
import { ShowPropOpt } from "../../../../@types";
import DetailsAddButton from "./DetailsAddButton";

export default function DetailsCtaGroup({ show = null }: ShowPropOpt) {
  return <DetailsAddButton show={show} />;
}
