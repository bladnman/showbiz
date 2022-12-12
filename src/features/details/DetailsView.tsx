import React from "react";
import { ShowPropOpt } from "../../@types";
import DetailsLayoutTwoPanel from "./layouts/DetailsLayoutTwoPanel";

export default function DetailsView({ show }: ShowPropOpt) {
  return <DetailsLayoutTwoPanel show={show} />;
}
