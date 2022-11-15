import useBreakSize from "../../utils/useBreakSize";
import BottomCardBGImage from "./BottomCardBGImage";
import { BottomCardProps } from "./types";

export default function BottomCard(props: BottomCardProps) {
  const { isXs, isSm } = useBreakSize();
  return <BottomCardBGImage {...props} />;
}
