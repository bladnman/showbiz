import React from "react";
import { ShowPropOpt, SxPropOpt } from "@types";
import Tag from "@components/text/Tag";
import { getYearSpanDisplay } from "@services/TMDB/utils/yearUtils";

export default function DetailsYearTag({ show, sx }: ShowPropOpt & SxPropOpt) {
  const year = getYearSpanDisplay(show);
  if (!year) return null;
  return <Tag sx={sx}>{year}</Tag>;
}
