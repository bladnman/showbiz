import { CustomDataItem, ShowbizItem } from "@types";
import useShowTools from "./useShowTools";
import { useEffect, useState } from "react";

export default function useShowCustomData(show?: ShowbizItem | null) {
  const { customDataList } = useShowTools();
  const [customData, setCustomData] = useState<CustomDataItem>();

  useEffect(() => {
    if (!customDataList || !show) return;
    const foundCustomData = customDataList.find((item) => item.id === show.id);
    setCustomData(foundCustomData);
  }, [customDataList, show]);

  return customData;
}
