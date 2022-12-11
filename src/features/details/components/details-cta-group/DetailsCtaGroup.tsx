import { ShowPropOpt } from "../../../../@types";
import DetailsAddButton from "./DetailsAddButton";
import { isShowInList } from "../../../../utils/itemUtils";
import useShowTools from "../../../../hooks/useShowTools";

export default function DetailsCtaGroup({ show = null }: ShowPropOpt) {
  const { shows } = useShowTools();
  const isSaved = isShowInList(show, shows);
  return <DetailsAddButton show={show} />;
}
