import { ShowPropOpt, SxPropOpt } from "../../../@types";
import Tag from "../../../components/text/Tag";
import getYear from "../../../services/TMDB/utils/getYear";

export default function DetailsYearTag({ show, sx }: ShowPropOpt & SxPropOpt) {
  const year = getYear(show);
  if (!year) return null;
  return <Tag sx={sx}>{year}</Tag>;
}
