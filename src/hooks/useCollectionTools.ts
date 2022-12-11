import { useMemo } from "react";
import {
  addCollection,
  removeCollection,
  toggleCollection,
} from "../utils/collectionUtils";
import useCollections from "./useCollections";
import useActiveCustomDataList from "./useActiveCustomDataList";

export default function useCollectionTools() {
  const customDataList = useActiveCustomDataList();
  const collections = useCollections(customDataList);
  return useMemo(
    () => ({
      collections,
      addCollection,
      removeCollection,
      toggleCollection,
    }),
    [collections]
  );
}
