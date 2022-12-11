import { useMemo } from "react";
import { CustomDataItem, ShowbizItem } from "../@types";
import { getAllCollections } from "../utils/collectionUtils";

export default function useCollections(customDataList: CustomDataItem[]) {
  return useMemo(() => {
    return getAllCollections(customDataList);
  }, [customDataList]);
}
