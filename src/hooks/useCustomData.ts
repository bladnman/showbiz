import { CustomDataItem, ShowbizItem } from "@types";
import useShowTools from "./useShowTools";
import { useEffect, useState } from "react";

export default function useCustomData(show: ShowbizItem | null) {
  const { customDataList } = useShowTools();
  const [customData, setCustomData] = useState<CustomDataItem>();

  useEffect(() => {
    if (!customDataList || !show) return;
    setCustomData(customDataList.find((item) => item.id === show.id));
  }, [customDataList, show]);

  return customData;
}
