import { ShowPropOpt } from "../../../../@types";
import DetailsAddButton from "./DetailsAddButton";
import { isShowInList } from "../../../../store/utils/itemUtils";
import useShows from "../../../../hooks/useShows";

export default function DetailsCtaGroup({ show = null }: ShowPropOpt) {
  const shows = useShows();
  const isSaved = isShowInList(show, shows);
  return <DetailsAddButton show={show} />;
}
