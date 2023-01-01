import { CustomDataItem, ShowbizItem } from "@types";
import { useEffect, useState } from "react";
import getCustomDataListForShows from "@custom-data-utils/getCustomDataListForShows";
import useCollectionTools from "@hooks/useCollectionTools";

export default function useShowListCustomData(shows?: ShowbizItem[] | null) {
  const [customData, setCustomData] = useState<CustomDataItem[]>([]);
  const { collections } = useCollectionTools();

  useEffect(() => {
    setCustomData(shows ? getCustomDataListForShows(shows) : []);
  }, [shows, collections]);

  return customData;
}
