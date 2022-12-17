import { useMemo } from "react";
import useCollectionTools from "@hooks/useCollectionTools";
import useShowCustomData from "./useShowCustomData";
import { ShowbizItem } from "@/@types";

export default function useShowCollections(show?: ShowbizItem | null) {
  const { getCollectionsForShow } = useCollectionTools();
  const customData = useShowCustomData(show);

  return useMemo(() => {
    if (!show) return [];
    return getCollectionsForShow(show);
  }, [show, customData?.collections]);
}
