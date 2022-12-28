import { useEffect, useState } from "react";
import useCollectionTools from "@hooks/useCollectionTools";
import useShowCustomData from "./useShowCustomData";
import { ShowbizItem } from "@/@types";

export default function useShowCollections(show?: ShowbizItem | null) {
  const [showCollections, setShowCollections] = useState<string[]>([]);

  const { getCollectionsForShow } = useCollectionTools();
  const customData = useShowCustomData(show);

  useEffect(() => {
    if (!show) return;
    setShowCollections(getCollectionsForShow(show));
  }, [show, getCollectionsForShow, customData?.collections]);

  return showCollections;
}
