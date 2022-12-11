import React from "react";
import { ShowPropOpt } from "../../../@types";

export default function DetailsBackdropImage({ show }: ShowPropOpt) {
  if (!show) return null;

  return (
    <div
      style={{
        backgroundImage: `url('${show.backdropPath}')`,
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  );
}
