import useBreakSize from "../../utils/useBreakSize";
import BottomCardSm from "./BottomCardSm";
import BottomCardXs from "./BottomCardXs";

export type BottomCardProps = {
  imagePosterUrl: string;
  imageBackdropUrl?: string;
  title: string;
  description?: SoN;
  rating?: number | null;
  metaDescription?: SoN;
};
export default function BottomCard(props: BottomCardProps) {
  const { isXs, isSm } = useBreakSize();
  if (isXs) return <BottomCardXs {...props} />;
  if (isSm) return <BottomCardSm {...props} />;
  return <BottomCardSm {...props} />;
}
