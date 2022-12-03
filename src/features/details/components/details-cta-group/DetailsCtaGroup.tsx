import { ShowPropOpt } from "../../../../@types";
import DetailsAddButton from "./DetailsAddButton";
import { isShowInList } from "../../../../store/utils/itemUtils";
import useMegaStore from "../../../../store/MegaStore";

export default function DetailsCtaGroup({ show = null }: ShowPropOpt) {
  const shows = useMegaStore((state) => state.shows);
  const isSaved = isShowInList(show, shows);
  return <DetailsAddButton show={show} />;
}
