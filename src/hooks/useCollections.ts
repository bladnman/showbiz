import { useMemo } from "react";
import { CustomDataItem } from "../@types";
import { getAllCollections } from "../utils/collectionUtils";

export default function useCollections(customDataList: CustomDataItem[]) {
  return useMemo(() => {
    return getAllCollections(customDataList);
  }, [customDataList]);
}
